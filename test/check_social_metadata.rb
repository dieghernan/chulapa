# Run from the repository root: bundle exec ruby test/check_social_metadata.rb
require "jekyll"
require "jekyll-include-cache"
require "nokogiri"
require "json"
require "tmpdir"
require "fileutils"

def check(condition, message)
  raise message unless condition
end

Dir.mktmpdir("chulapa-social-") do |source|
  FileUtils.cp_r(File.expand_path("../_includes", __dir__), source)
  FileUtils.mkdir_p(File.join(source, "_layouts"))
  File.write(File.join(source, "_layouts/head.html"), "{% include head.html %}{{ content }}")
  cases = [
    ["home without subtitle", {}, {}, "Example", "Example"],
    ["normal page", { "title" => "Page" }, {}, "Page | Example", "Page | Example"],
    ["home subtitle", {}, { "subtitle" => "Subtitle" }, "Example | Subtitle", "Example | Subtitle"],
    ["empty page title", { "title" => "   " }, {}, "Example", "Example"],
    ["empty site title", { "title" => "Page" }, { "title" => "   " }, "Page", "Page"],
    ["both empty", { "title" => "   " }, { "title" => "   " }, "", ""],
    ["overrides", { "title" => "Visible", "seo_title" => 'SEO & "quotes"', "og_title" => "Social & café" }, {}, "SEO & “quotes”", "Social & café"],
    ["custom separator", { "title" => "Page" }, { "title_separator" => "·" }, "Page · Example", "Page · Example"],
    ["SEO fallback for social", { "title" => "Visible", "seo_title" => "Search title" }, {}, "Search title", "Search title"],
    ["whitespace overrides", { "title" => "Page", "seo_title" => "  ", "og_title" => "  " }, {}, "Page | Example", "Page | Example"]
  ]
  image_cases = [
    [{}, {}, "/site.jpg", { "alt" => "Site image" }],
    [{ "og_image" => "/page.jpg", "og_image_alt" => 'Page & "quotes"', "og_image_width" => 1200, "og_image_height" => 630, "og_image_type" => "image/jpeg" }, {}, "/page.jpg", { "alt" => 'Page & "quotes"', "width" => "1200", "height" => "630", "type" => "image/jpeg" }],
    [{ "og_image" => "", "header_img" => "" }, {}, "/site.jpg", { "alt" => "Site image" }],
    [{ "header_img" => "/header.jpg" }, {}, "/header.jpg", {}],
    [{ "og_image" => "https://other.example/image.jpg" }, {}, "https://other.example/image.jpg", {}],
    [{}, { "og_image" => nil, "author" => { "avatar" => "/avatar.jpg" } }, "/avatar.jpg", {}],
    [{}, { "og_image" => nil, "github" => { "owner_gravatar_url" => "https://github.example/avatar.jpg" } }, "https://github.example/avatar.jpg", {}],
    [{ "og_image_alt" => "Orphan" }, { "og_image" => nil }, nil, {}]
  ]
  ["", "/subdir"].each do |baseurl|
    (cases + image_cases.map { |page, site, image, fields| ["image", page.merge("title" => "Page"), site, "Page | Example", "Page | Example", image, fields] }).each do |label, page, overrides, title, social, image, fields|
      filename = page.key?("title") ? "page.md" : "index.md"
      %w[page.md index.md].each { |file| FileUtils.rm_f(File.join(source, file)) }
      File.write(File.join(source, filename), "---\n#{page.merge('layout' => 'head').to_json}\n---\nContent")
      config = Jekyll.configuration({ "source" => source, "destination" => File.join(source, "_site"), "url" => "https://example.com", "baseurl" => baseurl, "title" => "Example", "og_image" => "/site.jpg", "og_image_alt" => "Site image", "github" => {}, "quiet" => true }.merge(overrides))
      Jekyll::Site.new(config).process
      doc = Nokogiri::HTML(File.read(File.join(config["destination"], filename.sub(".md", ".html"))))
      meta = ->(name) { doc.at_css("meta[property='#{name}']")&.[]("content") }
      check(doc.at_css("title").text == title, "Browser title: #{label}: #{doc.at_css("title").text.inspect}")
      check(meta.call("og:title") == social, "Social title: #{label}")
      check(meta.call("og:site_name") == config["title"].strip, "Site name: #{label}")
      check(doc.css("meta[name='keywords']").empty?, "Obsolete keywords")
      blocks = doc.css('script[type="application/ld+json"]').map { |node| JSON.parse(node.text) }
      webpage = blocks.find { |block| block["@type"] == "WebPage" }
      check(webpage["name"] == title, "Structured data title: #{label}") if page["seo_title"] && !page["seo_title"].strip.empty?
      next unless fields
      expected = image && (image.start_with?("https:") ? image : "https://example.com#{baseurl}#{image}")
      check(meta.call("og:image") == expected, "Image fallback: #{image}")
      %w[alt width height type].each { |field| check(meta.call("og:image:#{field}") == fields[field], "Image field #{field}: #{image}") }
      check(doc.css("meta[name='thumbnail']").empty?, "Orphan thumbnail") unless image
    end
  end
end
puts "Social metadata checks passed."
