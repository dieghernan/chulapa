require "jekyll"
require "jekyll-include-cache"
require "jekyll-paginate"
require "nokogiri"
require "tmpdir"
require "fileutils"
require "json"

root = File.expand_path("..", __dir__)
Dir.mktmpdir("chulapa-authorship-") do |source|
  %w[_layouts _includes].each { |dir| FileUtils.cp_r(File.join(root, dir), source) }
  %w[atom.xml rss.xml].each { |file| FileUtils.cp(File.join(root, "assets", file), source) }
  FileUtils.mkdir_p(File.join(source, "_posts"))
  authors = {
    "site" => nil,
    "guest" => {"name" => "Guest & friend", "url" => "/guest/", "avatar" => "/guest.png", "links" => [{"url" => "https://social.example/guest"}]},
    "fallback" => {"name" => "Fallback", "links" => [{"url" => "guest@example.com"}, {"url" => "https://guest.example/?a=1&b=2"}]},
    "missing" => {"name" => "Name only"}
  }
  authors.each_with_index do |(name, author), index|
    data = {"title" => name, "layout" => "default", "date" => "2024-01-0#{index + 1}", "include_on_feed" => true, "show_author" => false, "tags" => ["alpha", "beta"], "categories" => ["alpha", "beta"]}
    data["author"] = author if author
    File.write(File.join(source, "_posts/2024-01-0#{index + 1}-#{name}.md"), data.to_yaml + "---\nContent.")
    %w[default landingpage].each do |layout|
      File.write(File.join(source, "#{layout}-#{name}.html"), data.merge("layout" => layout).to_yaml + "---\nContent.")
    end
  end
  FileUtils.mkdir_p(File.join(source, "_projects"))
  project = {"title" => "project", "date" => "2024-01-05", "include_on_feed" => true, "author" => {"name" => "Project guest"}, "tags" => ["alpha"], "categories" => ["alpha"]}
  File.write(File.join(source, "_projects/example.md"), project.to_yaml + "---\nProject content.")
  %w[archive indexcategory cloudtag cloudcategory].each do |layout|
    File.write(File.join(source, "#{layout}.html"), {"layout" => layout, "title" => layout, "show_author" => false, "include_collection" => "posts,projects"}.to_yaml + "---\n")
  end
  File.write(File.join(source, "cached.html"), "---\nlayout: minimal\n---\n{% include_cached components/simplelist.html cacheddocs=site.posts %}{% include_cached components/simplelist.html cacheddocs=site.posts %}")
  ["", "/subdir"].each do |baseurl|
    [true, false].each do |profile|
      author = {"name" => "Alice & Bob", "avatar" => "/alice.png", "links" => [{"url" => "mailto:alice@example.com"}, {"url" => "https://social.example/alice"}]}
      author["url"] = "/about/" if profile
      config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"), "url" => "https://example.com", "baseurl" => baseurl, "title" => "Site", "quiet" => true, "collections" => {"projects" => {"output" => true}}, "author" => author, "defaults" => [{"scope" => {"path" => ""}, "values" => {"header_type" => "base"}}])
      Jekyll::Site.new(config).process
      expected = {
        "site" => ["Alice & Bob", profile ? "https://example.com#{baseurl}/about/" : "https://social.example/alice"],
        "guest" => ["Guest & friend", "https://example.com#{baseurl}/guest/"],
        "fallback" => ["Fallback", "https://guest.example/?a=1&b=2"],
        "missing" => ["Name only", nil],
        "project" => ["Project guest", nil]
      }
      Dir.glob(File.join(config["destination"], "*.html")).each do |path|
        doc = Nokogiri::HTML(File.read(path))
        entries = doc.css(".h-entry")
        raise "Missing entries: #{path}" if entries.empty?
        entries.each do |entry|
          title = entry.at_css(".p-name").text.strip
          title = File.basename(path, ".html").split("-").last if %w[default landingpage].any? { |layout| File.basename(path).start_with?(layout + "-") }
          card = entry.at_css(".p-author.h-card")
          raise "Missing or duplicate author: #{path}" unless card && entry.css(".p-author").size == 1
          raise "Visible author: #{path}" unless card.key?("hidden") && card["class"].split.include?("d-none")
          actual = [card.at_css(".p-name").text, card.at_css(".u-url")&.[]("href")]
          raise "Wrong author: #{path}: #{actual}" unless actual == expected.fetch(title)
          raise "Guest inherits avatar" if title == "missing" && card.at_css("img")
        end
      end
      atom = Nokogiri::XML(File.read(File.join(config["destination"], "atom.xml"))) { |options| options.strict }
      atom.remove_namespaces!
      raise "Feed author" unless [atom.at_css("feed > author > name").text, atom.at_css("feed > author > uri").text] == expected["site"]
      atom.css("entry").each do |entry|
        actual = [entry.at_css("author > name").text, entry.at_css("author > uri")&.text]
        raise "Atom entry author: #{actual}" unless actual == expected.fetch(entry.at_css("title").text)
      end
      rss = Nokogiri::XML(File.read(File.join(config["destination"], "rss.xml"))) { |options| options.strict }
      rss.xpath("//item").each do |item|
        raise "RSS creator" unless item.at_xpath("dc:creator", "dc" => "http://purl.org/dc/elements/1.1/").text == expected.fetch(item.at_xpath("title").text).first
      end
      if ENV["AUTHORSHIP_OUTPUT"]
        target = File.join(ENV["AUTHORSHIP_OUTPUT"], "#{baseurl.empty? ? 'root' : 'subdir'}-#{profile}")
        FileUtils.mkdir_p(target)
        FileUtils.cp(Dir.glob(File.join(config["destination"], "*.html")), target)
        File.write(File.join(target, "expected.json"), JSON.generate(expected))
      end
    end
  end
end
puts "Authorship passed: hidden pages, populated listings, cached cards, Atom/RSS, URL fallbacks and root/subdirectory builds."
