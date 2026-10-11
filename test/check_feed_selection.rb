# Issue #39 was resolved as configuration: feeds require include_on_feed and date.
require "jekyll"
require "nokogiri"
require "tmpdir"
require "fileutils"
require "jekyll-include-cache"

root = File.expand_path("..", __dir__)
Dir.mktmpdir("chulapa-feed-selection-") do |source|
  FileUtils.cp_r(File.join(root, "_includes"), source)
  %w[atom.xml rss.xml].each { |file| FileUtils.cp(File.join(root, "assets", file), source) }
  FileUtils.mkdir_p(File.join(source, "_posts"))
  FileUtils.mkdir_p(File.join(source, "_entries"))
  {
    "_posts/2024-01-01-default.md" => "title: Default post",
    "_posts/2024-01-03-disabled.md" => "title: Disabled post\ninclude_on_feed: false",
    "_entries/enabled.md" => "title: Enabled entry\ninclude_on_feed: true\ndate: 2024-01-02",
    "_entries/disabled.md" => "title: Disabled entry\ndate: 2024-01-04"
  }.each { |path, data| File.write(File.join(source, path), "---\n#{data}\n---\nFeed content.") }
  ["", "/preview"].each do |baseurl|
    [false, true].each do |enabled|
      config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"), "quiet" => true, "plugins" => [], "theme" => nil, "url" => "https://example.com", "baseurl" => baseurl, "title" => "Feed site", "author" => {"name" => "Author"}, "collections" => {"entries" => {"output" => true}}, "defaults" => [{"scope" => {"path" => "", "type" => "posts"}, "values" => {"include_on_feed" => enabled}}])
      site = Jekyll::Site.new(config)
      site.process
      expected = enabled ? ["Enabled entry", "Default post"] : ["Enabled entry"]
      %w[atom rss].each do |feed|
        xml = Nokogiri::XML(File.read(File.join(config["destination"], "#{feed}.xml"))) { |options| options.strict }
        xml.remove_namespaces!
        items = xml.css(feed == "atom" ? "entry" : "item")
        actual = items.map { |item| item.at_css("title").text }
        raise "#{feed}: opt-in, date requirement or date order changed: #{actual.inspect}" unless actual == expected
        items.each do |item|
          link = feed == "atom" ? item.at_css("link")["href"] : item.at_css("link").text
          raise "#{feed}: missing baseurl" unless link.start_with?("https://example.com#{baseurl}/")
          raise "#{feed}: missing content" unless item.text.include?("Feed content.")
        end
        # Jekyll can derive collection dates from file metadata. Exercise a
        # genuinely absent Liquid date separately instead of equating an
        # omitted YAML date with a nil document date.
        template = File.read(File.join(root, "assets/#{feed}.xml")).sub(/\A---.*?---\s*/m, "")
        html = Liquid::Template.parse(template).render!(
          {"site" => {"title" => "Feed site", "author" => {"name" => "Author"}, "documents" => [{"title" => "No date", "include_on_feed" => true, "date" => nil}]}, "page" => {"url" => "/#{feed}.xml"}},
          filters: [Jekyll::Filters], registers: {site: site}
        )
        empty = Nokogiri::XML(html).remove_namespaces!
        raise "#{feed}: document without a date entered the feed" unless empty.css(feed == "atom" ? "entry" : "item").empty?
      end
    end
  end
end
puts "Atom/RSS opt-in, front matter defaults, explicit opt-out, required dates and date order passed (#39)."
