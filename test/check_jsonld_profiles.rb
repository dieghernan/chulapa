# Run from test/: bundle exec ruby check_jsonld_profiles.rb (Jekyll 3 or 4).
require "jekyll"
require "jekyll-include-cache"
require "nokogiri"
require "json"
require "tmpdir"
require "fileutils"

root = File.expand_path("..", __dir__)
Dir.mktmpdir("chulapa-jsonld-profiles-") do |source|
  %w[_includes _layouts].each { |dir| FileUtils.cp_r(File.join(root, dir), source) }
  FileUtils.mkdir_p(File.join(source, "_posts"))
  links = [{ "url" => "https://z.example/guest" }, { "url" => "https://a.example/guest" }]
  fixtures = {
    "index.html" => {},
    "page.html" => { "og_image" => "/page.jpg", "canonical_url" => "/canonical/" },
    "_posts/2024-01-01-one.md" => { "author" => { "name" => "Guest", "url" => "/guest/", "links" => links } },
    "_posts/2024-01-02-two.md" => { "author" => { "name" => "Guest", "url" => "/guest/", "links" => links.reverse } },
    "_posts/2024-01-03-three.md" => { "author" => { "name" => "Social guest", "links" => links } },
    "_posts/2024-01-04-four.md" => { "author" => { "name" => "Social guest", "links" => links.reverse } },
    "_posts/2024-01-05-five.md" => { "author" => { "name" => "Local guest" } }
  }
  fixtures.each do |path, values|
    File.write(File.join(source, path), { "layout" => "minimal", "title" => "Example", "description" => 'R & "maps"' }.merge(values).to_yaml + "---\nContent")
  end
  %w[06_guestauthor.md 07_guestauthor_no_avatar.md].each do |name|
    FileUtils.cp(File.join(root, "docs/collections/_demo", name), File.join(source, name))
  end
  ["", "/preview"].each do |baseurl|
    %w[Person Organization].each do |publisher_type|
      home = "https://example.com#{baseurl}/"
      config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"), "url" => "https://example.com", "baseurl" => baseurl, "quiet" => true, "title" => "Site", "og_image" => "/banner.jpg", "author" => { "name" => "Site author", "url" => "/about/", "avatar" => "/author.jpg", "location" => "Madrid", "links" => links }, "publisher" => { "type" => publisher_type, "name" => "Independent editor", "url" => "/editor/", "image" => "/editor.jpg" }, "defaults" => [{ "scope" => { "path" => "" }, "values" => { "layout" => "default" } }])
      Jekyll::Site.new(config).process
      guest_ids = {}
      Dir.glob(File.join(config["destination"], "**/*.html")).each do |path|
        doc = Nokogiri::HTML(File.read(path))
        blocks = doc.css('script[type="application/ld+json"]').map { |node| JSON.parse(node.text) }
        primary = blocks.first
        author = blocks.find { |block| block["@id"] == primary.dig("author", "@id") }
        raise "Unresolved author" unless author
        raise "Embedded author differs from profile" unless primary["author"] == { "@id" => author["@id"] }
        raise "Duplicate author definition" unless blocks.count { |block| block["@id"] == author["@id"] } == 1
        publisher = primary.fetch("publisher")
        raise "Editor merged with author" unless publisher["@id"] != author["@id"] && publisher["name"] == "Independent editor" && publisher["@type"] == publisher_type && publisher["url"] == home + "editor/"
        page = blocks.find { |block| block["@type"] == "WebPage" }
        raise "Page language missing" unless page["inLanguage"] == doc.at_css("html")["lang"]
        name = File.basename(path)
        if name == "page.html"
          raise "Canonical identity lost" unless page["@id"] == home + "canonical/"
          raise "Page image missing" unless page.dig("primaryImageOfPage", "url") == home + "page.jpg"
        else
          raise "Site banner became page image" if page.key?("primaryImageOfPage")
        end
        if primary["@type"] == "BlogPosting"
          raise "Article description differs from page: #{primary["description"].inspect}" unless primary["description"] == page["description"] && primary["description"].start_with?("R & ")
          guest_ids[name] = author["@id"]
          raise "Guest inherited site avatar/location" if author.key?("image") || author.key?("homeLocation")
          if name == "five.html"
            raise "Guest inherited profile links" if author.key?("url") || author.key?("sameAs")
          else
            raise "Social links dropped" unless author.fetch("sameAs").sort == links.map { |link| link["url"] }.sort
          end
        elsif name.start_with?("06_", "07_")
          raise "Demo guest lost" unless author["name"] == "Octocat"
          raise "Avatar-free demo inherited an avatar" if name.start_with?("07_") && author.key?("image")
        else
          raise "Site author URL ignored" unless author["url"] == home + "about/"
        end
      end
      raise "Explicit guest URL unstable" unless guest_ids.values_at("one.html", "two.html") == [home + "guest/#author"] * 2
      raise "Social reorder changed identity" unless guest_ids.values_at("three.html", "four.html") == ["https://a.example/guest#author"] * 2
    end
  end
  # A minimal site must not turn absent image metadata into the home URL.
  config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"), "url" => "https://example.com", "quiet" => true)
  Jekyll::Site.new(config).process
  doc = Nokogiri::HTML(File.read(File.join(config["destination"], "index.html")))
  blocks = doc.css('script[type="application/ld+json"]').map { |node| JSON.parse(node.text) }
  primary = blocks.first
  raise "Invented site image" if primary.key?("image")
  raise "Invented publisher logo/name" if primary["publisher"].key?("logo") || primary["publisher"].key?("name")
end
puts "JSON-LD profile, independent publisher, guest demo and optional metadata checks passed."
