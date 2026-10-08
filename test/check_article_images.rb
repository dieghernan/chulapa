# Run from the repository root: bundle exec ruby test/check_article_images.rb
require "jekyll"
require "jekyll-include-cache"
require "json"
require "tmpdir"
require "fileutils"
require "nokogiri"

def check(condition, message)
  raise message unless condition
end

root = File.expand_path("..", __dir__)
fixtures = {
  "single" => { "schema_image" => "/single.jpg", "og_image" => "/social.jpg" },
  "multiple" => { "schema_image" => ["/wide.jpg", "https://cdn.example.com/square.jpg?a=1&b=2", "", "  "] },
  "escaped" => { "schema_image" => 'https://cdn.example.com/"quoted"/</script>.jpg' },
  "page-social" => { "og_image" => "/social.jpg", "header_img" => "/header.jpg" },
  "header" => { "header_img" => "/header.jpg" },
  "empty" => { "schema_image" => "", "og_image" => "/social.jpg" },
  "empty-list" => { "schema_image" => [], "header_img" => "/header.jpg" },
  "whitespace" => { "schema_image" => "  " },
  "blank-list" => { "schema_image" => ["", "  "] },
  "absent" => {},
  "default-image" => {}
}
Dir.mktmpdir("chulapa-article-images-") do |source|
  FileUtils.cp_r(File.join(root, "_includes"), source)
  FileUtils.mkdir_p(File.join(source, "_layouts"))
  FileUtils.mkdir_p(File.join(source, "_posts"))
  File.write(File.join(source, "_layouts/head.html"), "{% include head.html %}")
  fixtures.each do |name, values|
    front_matter = { "layout" => "head", "title" => name, "permalink" => "/#{name}.html" }.merge(values)
    File.write(File.join(source, "_posts/2024-01-02-#{name}.md"), front_matter.to_yaml + "---\nAn article.\n")
  end
  File.write(File.join(source, "page.md"), "---\nlayout: head\ntitle: Page\nschema_image: /ignored.jpg\n---\n")
  ["", "/subdir"].each do |baseurl|
    config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"), "url" => "https://example.com", "baseurl" => baseurl, "title" => "Site", "og_image" => "/banner.jpg", "author" => { "name" => "Author", "avatar" => "/avatar.jpg" }, "defaults" => [{ "scope" => { "path" => "_posts/2024-01-02-default-image.md" }, "values" => { "schema_image" => "/default.jpg" } }], "quiet" => true)
    Jekyll::Site.new(config).process
    home = "https://example.com#{baseurl}"
    expected = {
      "single" => [home + "/single.jpg"],
      "multiple" => [home + "/wide.jpg", "https://cdn.example.com/square.jpg?a=1&b=2"],
      "escaped" => ['https://cdn.example.com/"quoted"/</script>.jpg'],
      "page-social" => [home + "/social.jpg"],
      "header" => [home + "/header.jpg"],
      "empty" => [home + "/social.jpg"],
      "empty-list" => [home + "/header.jpg"],
      "whitespace" => nil,
      "blank-list" => nil,
      "absent" => nil,
      "default-image" => [home + "/default.jpg"]
    }
    expected.each do |name, images|
      html = File.read(File.join(config["destination"], "#{name}.html"))
      blocks = html.scan(/<script type="application\/ld\+json">(.*?)<\/script>/m).map { |block| JSON.parse(block.first) }
      article = blocks.find { |block| block["@type"] == "BlogPosting" }
      check(article["image"] == images, "Article images incorrect: #{name}, #{baseurl}")
      check(article.key?("image") == !images.nil?, "Empty image property emitted: #{name}")
      document = Nokogiri::HTML(html)
      social = %w[single page-social empty].include?(name) ? home + "/social.jpg" : (%w[header empty-list].include?(name) ? home + "/header.jpg" : home + "/banner.jpg")
      check(document.at_css('meta[property="og:image"]')["content"] == social, "OpenGraph changed: #{name}")
      check(document.at_css('meta[name="twitter:card"]')["content"] == "summary_large_image", "Twitter card changed: #{name}")
      check(article.dig("publisher", "logo", "url") == home + "/banner.jpg", "Publisher logo changed: #{name}")
    end
    page_html = File.read(File.join(config["destination"], "page.html"))
    page = JSON.parse(page_html[/<script type="application\/ld\+json">(.*?)<\/script>/m, 1])
    check(page["image"] == home + "/banner.jpg", "Ordinary page image changed")
  end
end
puts "Article image checks passed."
