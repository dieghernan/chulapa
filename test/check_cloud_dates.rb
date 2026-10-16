# Build real cloud layouts, aliases and cache hits with mixed date visibility.
require "jekyll"
require "jekyll-include-cache"
require "nokogiri"
require "tmpdir"
require "fileutils"
require "yaml"

root = File.expand_path("..", __dir__)
layouts = %w[cloudtag cloudcategory cloudtag2 cloudcategory2]
Dir.mktmpdir("chulapa-cloud-dates-") do |source|
  %w[_includes _layouts].each { |dir| FileUtils.cp_r(File.join(root, dir), source) }
  File.write(File.join(source, "_layouts/default.html"), '<link rel="stylesheet" href="/assets/css/main.css"><main class="container">{{ content }}</main>')
  FileUtils.mkdir_p(File.join(source, "_entries"))
  fixtures = {
    "visible" => {"date" => "2024-01-02", "show_date" => true},
    "implicit" => {"date" => "2024-01-02"},
    "hidden" => {"date" => "2024-01-02", "show_date" => false, "last_modified_at" => "2024-02-02"},
    "undated" => {"show_date" => false},
    "default-hidden" => {}
  }
  fixtures.each do |name, values|
    data = {"title" => name, "subtitle" => "Summary *text*", "tags" => ["demo topic", "beta"], "categories" => ["demo topic", "beta"], "header_img" => "/photo.png"}.merge(values)
    File.write(File.join(source, "_entries/#{name}.md"), "#{data.to_yaml}---\n" + "word " * 401)
  end
  layouts.each do |layout|
    File.write(File.join(source, "#{layout}.html"), {"layout" => layout, "include_collection" => "entries"}.to_yaml + "---\n")
  end
  ["", "/subdir"].each do |baseurl|
    config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"), "theme" => nil, "remote_theme" => nil, "plugins" => ["jekyll-include-cache"], "collections" => {"entries" => {"output" => true}}, "defaults" => [{"scope" => {"path" => "_entries/default-hidden.md"}, "values" => {"show_date" => false}}], "url" => "https://example.com", "baseurl" => baseurl, "quiet" => true)
    site = Jekyll::Site.new(config)
    [false, true].each do |reveal|
      hidden = File.join(source, "_entries/hidden.md")
      File.write(hidden, File.read(hidden).sub("show_date: false", "show_date: true")) if reveal
      site.process
      layouts.each do |layout|
        html = Nokogiri::HTML(File.read(File.join(source, "_site/#{layout}.html")))
        raise "Cloud entries lost: #{layout}" unless html.css(".h-entry").size == 10
        raise "Group fragment changed" unless html.at_css('section[id="demo-topic"]')
        html.css(".h-entry").each do |entry|
          name = entry.at_css(".p-name").text.strip
          visible = %w[visible implicit].include?(name) || (name == "hidden" && reveal)
          times = entry.css(".dt-published")
          raise "Wrong date visibility: #{layout}/#{name}" unless times.size == (visible ? 1 : 0)
          raise "Fabricated date" if visible && !times.first["datetime"].start_with?("2024-01-02")
          raise "Calendar/separator artifact" unless entry.css(".fa-calendar").size == (visible ? 1 : 0) && entry.at_css(".small").text.include?("|") == visible
          raise "Hidden update marker" if !visible && entry.at_css(".fa-redo")
          raise "Reading time lost" unless entry.at_css(".fa-clock") && entry.at_css(".small").text.include?("2’")
          raise "Summary changed" unless entry.at_css(".p-summary em").text == "text"
          raise "URL changed" unless entry.at_css(".u-url")["href"] == "https://example.com#{baseurl}/entries/#{name}.html"
          raise "Image changed" unless entry.at_css(".chulapa-overlay-img")["style"].include?("https://example.com#{baseurl}/photo.png")
        end
      end
      if ENV["CLOUD_DATE_OUTPUT"] && !reveal
        target = File.join(ENV["CLOUD_DATE_OUTPUT"], baseurl.empty? ? "root" : "subdir")
        FileUtils.mkdir_p(target)
        layouts.each { |layout| FileUtils.cp(File.join(source, "_site/#{layout}.html"), target) }
      end
    end
    hidden = File.join(source, "_entries/hidden.md")
    File.write(hidden, File.read(hidden).sub("show_date: true", "show_date: false"))
  end
end
puts "Cloud dates passed: tags/categories, aliases, cache hits/rebuilds, defaults and root/subdir URLs."
