# Build real pages to verify cache reuse and isolation between pages and builds.
require "jekyll"
require "jekyll-include-cache"
require "nokogiri"
require "tmpdir"
require "fileutils"
require "yaml"

module TrackCachedRendering
  def number_of_words(input, *args)
    Thread.current[:cloud_word_calls] += 1
    super
  end

  def absolute_url(input)
    Thread.current[:footer_link_calls] += 1 if input == "/footer-marker"
    super
  end
end
Jekyll::Filters.prepend(TrackCachedRendering)

root = File.expand_path("..", __dir__)
Dir.mktmpdir("chulapa-cache-") do |source|
  %w[_includes _layouts].each { |dir| FileUtils.cp_r(File.join(root, dir), source) }
  File.write(File.join(source, "_layouts/default.html"), "{{ content }}")
  File.write(File.join(source, "_layouts/footer-test.html"), '{% include_cached footer.html show_comments=page.show_comments pageurl=page.url pageid=page.id pagetitle=page.title %}')
  File.write(File.join(source, "_includes/custom/giscus.html"), '<p class="comments">{{ page.title }}:{{ page.url }}</p>')
  FileUtils.mkdir_p(File.join(source, "_entries"))
  File.write(File.join(source, "_entries/entry.md"), "---\ntitle: Entry **one**\nsubtitle: Subtitle *one*\ndate: 2024-01-01\ntags: [alpha, beta]\ncategories: [guide, reference]\n---\n" + "word " * 401)
  %w[first second hidden].each do |name|
    data = {"layout" => "footer-test", "title" => name, "show_comments" => name != "hidden"}
    File.write(File.join(source, "#{name}.html"), "#{data.to_yaml}---\n")
  end
  %w[cloudtag cloudcategory].each do |layout|
    [nil, "entries"].each_with_index do |collection, index|
      data = {"layout" => layout, "include_collection" => collection}
      File.write(File.join(source, "#{layout}-#{index}.html"), "#{data.to_yaml}---\n")
    end
  end
  config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"), "theme" => nil, "remote_theme" => nil, "plugins" => ["jekyll-include-cache"], "collections" => {"entries" => {"output" => false}}, "url" => "https://example.com", "locale" => "es", "words_per_minute" => 200, "comments" => {"provider" => "giscus"}, "footer" => {"links" => [{"url" => "/footer-marker", "label" => "Marker", "icon" => "fa fa-link"}]}, "author" => {"name" => "Author"}, "chulapa-skin" => {"skin" => "preptor"}, "quiet" => true)
  ["", "/subdir"].each do |baseurl|
    config["baseurl"] = baseurl
    config["chulapa-skin"]["skin"] = baseurl.empty? ? "preptor" : "navi"
    config["footer"]["copyright"] = baseurl.empty? ? nil : "Custom copyright"
    config["locale"] = baseurl.empty? ? "es" : "en"
    config["words_per_minute"] = baseurl.empty? ? 200 : 100
    site = Jekyll::Site.new(config)
    Thread.current[:cloud_word_calls] = 0
    Thread.current[:footer_link_calls] = 0
    site.process
    raise "Footer must render once per build" unless Thread.current[:footer_link_calls] == 1
    raise "Each cloud badge variant must count once, across both fields" unless Thread.current[:cloud_word_calls] == 2
    output = ->(name) { Nokogiri::HTML(File.read(File.join(config["destination"], "#{name}.html"))) }
    %w[first second hidden].each do |name|
      footer = output.call(name)
      comments = footer.at_css(".comments")
      raise "Disabled comments leaked from another page" if name == "hidden" && comments
      raise "Cached comments belong to another page" if name != "hidden" && comments&.text != "#{name}:/#{name}.html"
      actual_url = footer.at_css(".chulapa-footer-sociallink")["href"]
      raise "Footer URL did not refresh between builds: #{actual_url} (#{baseurl})" unless actual_url == "https://example.com#{baseurl}/footer-marker"
      skin = baseurl.empty? ? "Preptor" : "Navi"
      raise "Skin attribution did not refresh" unless footer.at_css(".chulapa-footer-brand b").text == skin
      copyright = baseurl.empty? ? "Author" : "Custom copyright"
      raise "Copyright did not refresh" unless footer.at_css(".mt-2.mb-3").text.include?(copyright)
    end
    %w[cloudtag cloudcategory].each do |layout|
      [0, 1].each do |index|
        cloud = output.call("#{layout}-#{index}")
        raise "Entries disappeared on cache hits" unless cloud.css(".h-entry").size == 2
        raise "Collection badge variant leaked" unless cloud.css(".p-category").size == (index == 0 ? 2 : 0)
        raise "Markdown title changed" unless cloud.css(".h6 strong").map(&:text) == %w[one one]
        expected_date = baseurl.empty? ? "enero 01, 2024" : "january 01, 2024"
        expected_readtime = baseurl.empty? ? "2’" : "4’"
        raise "Translated date changed" unless cloud.css("time").all? { |time| time.text == expected_date }
        raise "Reading time changed" unless cloud.css(".small").all? { |small| small.text.include?(expected_readtime) }
        raise "Cloud URL did not refresh" unless cloud.css(".u-url").all? { |link| link["href"] == "https://example.com#{baseurl}/entries/entry.html" }
      end
    end
    # Rebuild the same site after content edits; configuration stays unchanged.
    entry_path = File.join(source, "_entries/entry.md")
    original = File.read(entry_path)
    File.write(entry_path, original.sub("Entry **one**", "Entry **updated**").sub("Subtitle *one*", "Subtitle *updated*") + " word" * 400)
    Thread.current[:cloud_word_calls] = 0
    Thread.current[:footer_link_calls] = 0
    site.process
    raise "Footer cache survived a rebuild" unless Thread.current[:footer_link_calls] == 1
    raise "Cloud cache survived a rebuild" unless Thread.current[:cloud_word_calls] == 2
    updated = output.call("cloudtag-0")
    raise "Edited document title stayed cached" unless updated.css(".h6 strong").map(&:text) == %w[updated updated]
    raise "Edited document subtitle stayed cached" unless updated.css(".p-summary em").map(&:text) == %w[updated updated]
    updated_readtime = baseurl.empty? ? "4’" : "8’"
    raise "Edited document reading time stayed cached" unless updated.css(".small").all? { |small| small.text.include?(updated_readtime) }
    # The same document can be reused with a different speed without a rebuild.
    JekyllIncludeCache.reset
    variants = Liquid::Template.parse('{% include_cached components/cloud-entry.html document=document showcol=false words_per_minute=200 %}{% include_cached components/cloud-entry.html document=document showcol=false words_per_minute=100 %}')
    entry = site.collections["entries"].docs.first.to_liquid
    html = variants.render!({"site" => site.site_payload["site"], "document" => entry}, filters: [Jekyll::Filters], registers: {site: site})
    small = Nokogiri::HTML.fragment(html).css(".h-entry .small")
    raise "Reading-speed cache key omitted the setting" unless small.size == 2 && small[0].text.include?("4’") && small[1].text.include?("8’")
    File.write(entry_path, original)
  end
end
puts "Include cache passed: shared footer, per-page comments, cloud variants and rebuild invalidation."
