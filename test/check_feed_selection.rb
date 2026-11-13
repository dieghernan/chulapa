# Issue #39 was resolved as configuration: feeds require include_on_feed and date.
require "jekyll"
require "json"
require "nokogiri"
require "tmpdir"
require "fileutils"
require "jekyll-include-cache"

root = File.expand_path("..", __dir__)
Dir.mktmpdir("chulapa-feed-selection-") do |source|
  FileUtils.cp_r(File.join(root, "_includes"), source)
  %w[atom.xml rss.xml feed.json].each { |file| FileUtils.cp(File.join(root, "assets", file), source) }
  FileUtils.mkdir_p(File.join(source, "_posts"))
  FileUtils.mkdir_p(File.join(source, "_entries"))
  {
    "_posts/2024-01-01-default.md" => "title: Default post\nexcerpt: '   '\nauthor: {}",
    "_posts/2024-01-03-disabled.md" => "title: Disabled post\ninclude_on_feed: false",
    "_entries/enabled.md" => "title: 'Enabled & **formatted** entry &lt;main&gt; &quot;quoted&quot;'\nog_image: '/image.png?width=800&height=400'\nsubtitle: 'An *editorial* subtitle'\ncanonical_url: '/article/?a=1&b=2'\nexcerpt: 'Use &lt;main&gt; with &quot;quotes&quot;.'\ninclude_on_feed: true\ndate: 2024-01-02\nlast_modified_at: 2024-01-05\nauthor: {url: 'https://guest.example/'}\ntags: ['R & maps', 'data, maps']",
    "_entries/disabled.md" => "title: Disabled entry\ndate: 2024-01-04"
  }.each do |path, data|
    content = path == "_entries/enabled.md" ? "Feed content. " * 40 : "Feed content."
    File.write(File.join(source, path), "---\n#{data}\n---\n#{content}")
  end
  ["", "/preview"].each do |baseurl|
    [false, true].each do |enabled|
      config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"), "quiet" => true, "plugins" => [], "theme" => nil, "url" => "https://example.com", "baseurl" => baseurl, "title" => "Feed & site", "subtitle" => (enabled ? "Updates & notes" : " "), "og_image" => "/logo.png", "words_per_minute" => 60, "author" => {"name" => "Author"}, "collections" => {"entries" => {"output" => true}}, "defaults" => [{"scope" => {"path" => "", "type" => "posts"}, "values" => {"include_on_feed" => enabled}}])
      site = Jekyll::Site.new(config)
      site.process
      expected = enabled ? ['Enabled & formatted entry <main> "quoted"', "Default post"] : ['Enabled & formatted entry <main> "quoted"']
      json = JSON.parse(File.read(File.join(config["destination"], "feed.json")))
      raise "JSON Feed: incorrect version" unless json["version"] == "https://jsonfeed.org/version/1.1"
      raise "JSON Feed: incorrect feed URL" unless json["feed_url"] == "https://example.com#{baseurl}/feed.json"
      raise "JSON Feed: entry selection or title changed" unless json["items"].map { |item| item.fetch("title") } == expected
      raise "JSON Feed: missing HTML content" unless json["items"].all? { |item| item.fetch("content_html").include?("Feed content.") }
      raise "JSON Feed: summary leaked HTML entities" unless json["items"].first.fetch("summary") == 'Use <main> with "quotes".'
      raise "JSON Feed: tags changed" unless json["items"].first.fetch("tags") == ["R & maps", "data, maps"]
      raise "JSON Feed: URL-only guest lost its identity" unless json["items"].first.fetch("authors") == [{"url" => "https://guest.example/"}]
      if enabled
        raise "JSON Feed: empty guest inherited feed author" unless json["items"].last.fetch("authors") == []
      end
      raise "JSON Feed: duplicate IDs" unless json["items"].map { |item| item.fetch("id") }.uniq.size == expected.size
      %w[atom rss].each do |feed|
        xml = Nokogiri::XML(File.read(File.join(config["destination"], "#{feed}.xml"))) { |options| options.strict }
        image_url = "https://example.com#{baseurl}/image.png?width=800&height=400"
        if feed == "rss"
          media = {"media" => "http://search.yahoo.com/mrss/"}
          raise "RSS: incorrect media title" unless xml.at_xpath("//media:title", media).text == expected.first
          raise "RSS: incorrect media URL" unless xml.at_xpath("//media:content", media)["url"] == image_url
        else
          content = xml.at_xpath("//atom:entry/atom:content", "atom" => "http://www.w3.org/2005/Atom")
          raise "Atom: incorrect embedded image URL" unless Nokogiri::HTML.fragment(content.text).at_css("img")["src"] == image_url
        end
        xml.remove_namespaces!
        body = xml.at_css(feed == "atom" ? "entry > content" : "item > encoded")
        subtitle = Nokogiri::HTML.fragment(body.text).element_children.first
        raise "#{feed}: subtitle must be a paragraph" unless subtitle.name == "p"
        raise "#{feed}: subtitle lost its emphasis" unless subtitle.at_css("em")&.text == "editorial"
        items = xml.css(feed == "atom" ? "entry" : "item")
        actual = items.map do |item|
          title = item.at_css("title")
          title["type"] == "html" ? Nokogiri::HTML.fragment(title.text).text : title.text
        end
        if feed == "atom"
          first = items.first
          raise "Atom: formatted title lost its markup" unless Nokogiri::HTML.fragment(first.at_css("title").text).at_css("strong")&.text == "formatted"
          raise "Atom: alternate link title must be plain text" unless first.at_css("link")["title"] == expected.first
        end
        raise "#{feed}: opt-in, date requirement or date order changed: #{actual.inspect}" unless actual == expected
        channel = feed == "atom" ? xml.root : xml.at_css("channel")
        raise "#{feed}: feed title lost its ampersand" unless channel.at_css("title").text.include?("Feed & site")
        if feed == "atom"
          guest = items.first.at_css("author")
          raise "Atom: unnamed guest must have a distinct label" unless guest.at_css("name").text == "Guest author"
          raise "Atom: unnamed guest lost their profile" unless guest.at_css("uri").text == "https://guest.example/"
          if enabled
            guest = items.last.at_css("author")
            raise "Atom: empty guest inherited the site identity" unless guest.at_css("name").text == "Guest author" && guest.at_css("uri").nil?
          end
          raise "Atom: feed date must reflect entry edits" unless channel.at_css("updated").text.start_with?("2024-01-05")
        end
        if feed == "rss"
          channel_title = enabled ? "Feed & site | Updates & notes" : "Feed & site"
          raise "RSS: incorrect channel title" unless channel.at_xpath("./title").text == channel_title
          raise "RSS: incorrect image title" unless channel.at_xpath("./image/title").text == channel_title
          raise "RSS: unnamed guest inherited the site identity" if items.first.at_css("creator")
          if enabled
            item = items.last
            raise "RSS: full article missing without excerpt" unless item.at_css("description").text.include?("Feed content.")
            raise "RSS: full article duplicated without excerpt" if item.at_css("encoded")
          end
          raise "RSS: missing full content extension" unless items.first.at_css("encoded").text.include?("Feed content.")
        end
        first_link = items.first.at_css("link")
        first_url = feed == "atom" ? first_link["href"] : first_link.text
        raise "#{feed}: canonical URL query changed" unless first_url == "https://example.com#{baseurl}/article/?a=1&b=2"
        raise "#{feed}: configured reading speed or rounding ignored" unless items.first.text.include?("<p>2 min.</p>")
        categories = items.first.css("category").map { |category| feed == "atom" ? category["term"] : category.text }
        raise "#{feed}: tags were split or lost" unless ["R & maps", "data, maps"].all? { |tag| categories.include?(tag) }
        items.each do |item|
          link = feed == "atom" ? item.at_css("link")["href"] : item.at_css("link").text
          raise "#{feed}: missing baseurl" unless link.start_with?("https://example.com#{baseurl}/")
          raise "#{feed}: missing content" unless item.text.include?("Feed content.")
          raise "#{feed}: missing reading time" unless item.text.match?(/<p>\d+ min\.<\/p>/)
        end
        # Jekyll can derive collection dates from file metadata. Exercise a
        # genuinely absent Liquid date separately instead of equating an
        # omitted YAML date with a nil document date.
        template = File.read(File.join(root, "assets/#{feed}.xml")).sub(/\A---.*?---\s*/m, "")
        html = Liquid::Template.parse(template).render!(
          {"site" => {"title" => "Feed site", "author" => {"name" => "Author"}, "documents" => [{"title" => "No date", "include_on_feed" => true, "date" => nil}]}, "page" => {"url" => "/#{feed}.xml"}},
          filters: [Jekyll::Filters], registers: {site: site}
        )
        empty = Nokogiri::XML(html) { |options| options.strict }.remove_namespaces!
        raise "#{feed}: missing feed root" unless empty.root.name == (feed == "atom" ? "feed" : "rss")
        raise "#{feed}: document without a date entered the feed" unless empty.css(feed == "atom" ? "entry" : "item").empty?
      end
    end
  end
end
puts "Atom/RSS/JSON Feed opt-in, front matter defaults, explicit opt-out, required dates and date order passed (#39)."
