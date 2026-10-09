# Run from the repository root: bundle exec ruby test/check_microformats_feeds.rb
# Set MICROFORMATS_FEED_OUTPUT to retain pages for external parser validation.
require "jekyll"
require "jekyll-include-cache"
require "jekyll-paginate"
require "nokogiri"
require "tmpdir"
require "fileutils"

root = File.expand_path("..", __dir__)
layouts = %w[archive indexcategory cloudtag cloudcategory cloudtag2 cloudcategory2 derived-feed]
Dir.mktmpdir("chulapa-feeds-") do |source|
  %w[_layouts _includes].each { |dir| FileUtils.cp_r(File.join(root, dir), source) }
  File.write(File.join(source, "_layouts/derived-feed.html"), "---\nlayout: archive\n---\n{{ content }}")
  FileUtils.mkdir_p(File.join(source, "_posts"))
  FileUtils.mkdir_p(File.join(source, "blog"))
  FileUtils.cp(File.join(root, "docs/blog/index.html"), File.join(source, "blog/index.html"))
  File.write(File.join(source, "_posts/2024-01-01-first.md"), {"permalink" => "/2024/01/01/first.html", "title" => "First entry", "subtitle" => "Short subtitle", "tags" => ["alpha", "beta"], "categories" => ["alpha", "beta"]}.to_yaml + "---\nEntry summary.")
  File.write(File.join(source, "_posts/2024-02-01-second.md"), {"permalink" => "/2024/02/01/second.html", "title" => "Second entry", "tags" => ["beta"], "categories" => ["beta"]}.to_yaml + "---\nSecond summary.")
  layouts.each do |layout|
    File.write(File.join(source, "#{layout}.html"), {"layout" => layout, "title" => "Feed title", "header_type" => "base", "show_author" => true, "include_collection" => "posts"}.to_yaml + "---\nIntro text.")
  end
  File.write(File.join(source, "standalone.html"), "---\nlayout: minimal\n---\n{% include_cached components/simplelist.html cacheddocs=site.posts cachedlimit=1 %}")
  File.write(File.join(source, "empty.html"), "---\nlayout: indexcategory\ntitle: Empty feed\ninclude_collection: absent\n---\n")
  File.write(File.join(source, "note.html"), "---\ntitle: Undated note\n---\nNote content.")
  File.write(File.join(source, "undated.html"), "---\nlayout: minimal\n---\n{% assign notes = site.pages | where: 'name', 'note.html' %}{% include_cached components/simplelist.html cacheddocs=notes cachedlimit=1 %}")
  ["", "/subdir"].each do |baseurl|
    config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"), "url" => "https://example.com", "baseurl" => baseurl, "title" => "Site", "quiet" => true, "defaults" => [{"scope" => {"path" => ""}, "values" => {"header_type" => "base"}}], "paginate" => 1, "paginate_path" => "/blog/page:num/", "author" => {"name" => "Alice", "url" => "/about/"})
    Jekyll::Site.new(config).process
    layouts.each do |layout|
      doc = Nokogiri::HTML(File.read(File.join(config["destination"], "#{layout}.html")))
      feeds = doc.css(".h-feed")
      raise "Feed count: #{layout}" unless feeds.size == 1
      feed = feeds.first
      entries = feed.css(".h-entry")
      expected_count = layout.start_with?("cloud") ? 3 : 2
      raise "Entry count: #{layout}" unless entries.size == expected_count && doc.css(".h-entry").size == expected_count
      raise "Feed title: #{layout}" unless feed.at_css("header .p-name").text.strip == "Feed title"
      raise "Feed URL: #{layout}" unless feed.at_xpath("./a[contains(@class, 'u-url')]")["href"] == "https://example.com#{baseurl}/#{layout}.html"
      raise "Chrome in feed: #{layout}" unless feed.css("footer, nav[aria-label='primary-navigation']").empty?
      raise "Feed author: #{layout}" unless feed.at_css(".h-card.p-author .p-name").text.strip == "Alice"
      entries.each do |entry|
        name = entry.at_css(".p-name").text.strip
        raise "Entry title contamination: #{layout}" unless ["First entry", "Second entry"].include?(name)
        raise "Entry URL: #{layout}: #{entry.at_css(".u-url")["href"]}" unless entry.at_css(".u-url")["href"].start_with?("https://example.com#{baseurl}/2024/")
        raise "Entry date: #{layout}" unless entry.at_css(".dt-published")["datetime"].start_with?("2024-")
        if layout == "indexcategory"
          raise "Missing card summary" unless entry.at_css(".p-summary").text.include?("summary.")
          raise "Card dates outside entry" unless entry.at_css(".card-footer .dt-published")
        end
      end
    end
    standalone = Nokogiri::HTML(File.read(File.join(config["destination"], "standalone.html")))
    raise "Standalone component creates feed" unless standalone.css(".h-feed").empty?
    raise "Standalone limit" unless standalone.css(".h-entry").size == 1
    undated = Nokogiri::HTML(File.read(File.join(config["destination"], "undated.html")))
    raise "Undated entry" unless undated.css(".h-entry").size == 1 && undated.at_css(".p-name").text.strip == "Undated note"
    raise "Invented date" unless undated.css(".dt-published").empty?
    empty = Nokogiri::HTML(File.read(File.join(config["destination"], "empty.html")))
    raise "Empty feed" unless empty.css(".h-feed").size == 1 && empty.css(".h-entry").empty?
    %w[blog/index.html blog/page2/index.html].each_with_index do |path, index|
      doc = Nokogiri::HTML(File.read(File.join(config["destination"], path)))
      feed = doc.at_css(".h-feed")
      raise "Pagination feed" unless doc.css(".h-feed").size == 1 && feed.css(".h-entry").size == 1
      raise "Pagination title" unless feed.at_css("header .p-name").text.strip == "Chulapa blog"
      expected_path = index.zero? ? "/blog/" : "/blog/page2/"
      raise "Pagination URL" unless feed.at_css(".u-url")["href"] == "https://example.com#{baseurl}#{expected_path}"
      expected_entry = index.zero? ? "Second entry" : "First entry"
      raise "Pagination item" unless feed.at_css(".h-entry .p-name").text.strip == expected_entry
    end
    if ENV["MICROFORMATS_FEED_OUTPUT"]
      target = File.join(ENV["MICROFORMATS_FEED_OUTPUT"], baseurl.empty? ? "root" : "subdir")
      FileUtils.mkdir_p(target)
      FileUtils.cp(Dir.glob(File.join(config["destination"], "*.html")), target)
      FileUtils.cp(File.join(config["destination"], "blog/index.html"), File.join(target, "pagination.html"))
      FileUtils.cp(File.join(config["destination"], "blog/page2/index.html"), File.join(target, "pagination2.html"))
    end
  end
end
puts "Microformats feed checks passed (12 fixtures, root and subdirectory URLs)."
