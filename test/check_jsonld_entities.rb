# Run from test/: bundle exec ruby check_jsonld_entities.rb (Jekyll 3 or 4).
require "jekyll"
require "jekyll-include-cache"
require "nokogiri"
require "json"
require "tmpdir"
require "fileutils"

Dir.mktmpdir("chulapa-jsonld-") do |source|
  root = File.expand_path("..", __dir__)
  %w[_includes _layouts].each { |dir| FileUtils.cp_r(File.join(root, dir), source) }
  fixtures = {
    "index.html" => { "layout" => "minimal" },
    "page.html" => { "layout" => "minimal" },
    "archive.html" => { "layout" => "archive", "include_collection" => "posts" },
    "cards.html" => { "layout" => "indexcategory", "include_collection" => "posts", "index_items" => 1 },
    "tags.html" => { "layout" => "cloudtag2", "include_collection" => "posts" },
    "categories.html" => { "layout" => "cloudcategory", "include_collection" => "posts" },
    "_posts/2024-01-01-one.md" => { "layout" => "minimal", "locale" => "es_ES", "tags" => ['R & "data"', "", "  ", '</script>test'], "categories" => ["News", "Maps"] },
    "_posts/2024-01-02-two.md" => { "layout" => "minimal", "author" => { "name" => "Guest", "links" => [{ "url" => "https://guest.example/profile" }] } },
    "_posts/2024-01-03-three.md" => { "layout" => "minimal", "author" => { "name" => "Guest", "links" => [{ "url" => "https://guest.example/profile" }] } },
    "_posts/2024-01-04-four.md" => { "layout" => "minimal", "author" => { "name" => "Local guest" } }
  }
  fixtures.each do |path, data|
    FileUtils.mkdir_p(File.dirname(File.join(source, path)))
    File.write(File.join(source, path), { "title" => 'Example "&" </script>', "excerpt" => "Description" }.merge(data).to_yaml + "---\nContent")
  end
  ["", "/preview"].each do |baseurl|
    config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"), "url" => "https://example.com", "baseurl" => baseurl, "quiet" => true, "compress_html" => { "blanklines" => true }, "title" => "Site", "author" => { "name" => "Alice", "links" => [{ "url" => "https://alice.example/" }] })
    site = Jekyll::Site.new(config)
    site.process
    home = "https://example.com#{baseurl}/"
    guests = []
    Dir.glob(File.join(config["destination"], "**/*.html")).each do |path|
      doc = Nokogiri::HTML(File.read(path))
      blocks = doc.css('script[type="application/ld+json"]').map { |node| JSON.parse(node.text) }
      raise "Missing canonical: #{path}: #{File.read(path)[0, 500]}" unless doc.at_css('link[rel="canonical"]')
      canonical = doc.at_css('link[rel="canonical"]')["href"]
      website = blocks.find { |block| block["@type"] == "WebSite" }
      raise "Missing website definition" unless website && website["@id"] == home + "#website"
      raise "Publisher not connected" unless website.dig("publisher", "@id") == home + "#publisher"
      primary = blocks.first
      person = blocks.find { |block| block["@type"] == "Person" && block["@id"] == primary.dig("author", "@id") }
      raise "Author reference unresolved" unless person
      raise "Publisher ID changed" unless primary.dig("publisher", "@id") == home + "#publisher"
      page = blocks.find { |block| %w[WebPage CollectionPage].include?(block["@type"]) }
      raise "Missing page/website link" unless page["@id"] == canonical && page.dig("isPartOf", "@id") == website["@id"]
      unless canonical == home
        raise "Breadcrumb not connected: #{path}: #{page.inspect}" unless page.dig("breadcrumb", "@id") == blocks.find { |block| block["@type"] == "BreadcrumbList" }["@id"]
      end
      if primary["@type"] == "BlogPosting"
        raise "Article is not the page's main entity" unless page.dig("mainEntity", "@id") == primary["@id"]
        raise "Image invented for imageless article" if page.key?("primaryImageOfPage")
        raise "Language differs from HTML" unless primary["inLanguage"] == doc.at_css("html")["lang"]
        if File.basename(path) == "one.html"
          raise "Tags not cleaned and escaped" unless primary["keywords"] == ['R & "data"', 'test']
          raise "Categories missing" unless primary["articleSection"] == %w[News Maps]
        else
          raise "Empty taxonomy emitted" if primary.key?("keywords") || primary.key?("articleSection")
        end
        if %w[two.html three.html].include?(File.basename(path))
          guests << person["@id"]
          raise "Wrong guest identity" unless person["name"] == "Guest"
        elsif File.basename(path) == "four.html"
          raise "Local guest inherited site profile" if primary["author"].key?("url")
        end
      end
      if %w[archive.html cards.html tags.html categories.html].include?(File.basename(path))
        raise "Native collection layout not detected" unless primary["@type"] == "CollectionPage"
        list = blocks.find { |block| block["mainEntity"] }.fetch("mainEntity").fetch("itemListElement")
        expected_size = { "archive.html" => 4, "cards.html" => 1, "tags.html" => 1, "categories.html" => 1 }.fetch(File.basename(path))
        raise "Wrong collection selection" unless list.size == expected_size
      end
    end
    raise "Guest identity not stable across posts" unless guests == ["https://guest.example/profile#author"] * 2
  end
end
puts "JSON-LD entity, article and native collection checks passed."
