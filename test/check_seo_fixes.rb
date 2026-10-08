# Run from the repository root: bundle exec ruby test/check_seo_fixes.rb
require "jekyll"
require "jekyll-include-cache"
require "jekyll-sitemap"
require "nokogiri"
require "json"
require "tmpdir"
require "fileutils"

def check(condition, message)
  raise message unless condition
end

root = File.expand_path("..", __dir__)
paths = {
  "home" => ["/index.html", "/"],
  "nested" => ["/nested/index.html", "/nested/"],
  "filename" => ["/myindex.html", "/myindex.html"],
  "middle" => ["/directory-myindex.html/guide.html", "/directory-myindex.html/guide.html"],
  "suffix" => ["/myindex.html-notes.html", "/myindex.html-notes.html"],
  "pagination" => ["/blog/page/2/index.html", "/blog/page/2/"],
  "escaped" => ["/a&b.html", "/a&b.html"]
}
descriptions = {
  "ampersand" => ["a" * 153 + " & more words", "a" * 153 + " & more words"],
  "entity" => ["a" * 153 + " &amp; more words", "a" * 153 + " & more words"],
  "numeric" => ["a" * 153 + " &#38; more words", "a" * 153 + " & more words"],
  "quote" => ["a" * 153 + ' "more words"', "a" * 153 + ' “more words”'],
  "unicode" => ["é" * 153 + " & more words", "é" * 153 + " & more words"],
  "escaped-text" => ['A &quot;quote&quot; &lt;map&gt; &#39;note&#39; &amp; &copy; é.', 'A "quote" <map> \'note\' & © é.'],
  "empty" => ["", "Fallback content."]
}
Dir.mktmpdir("chulapa-seo-") do |source|
  %w[_includes _layouts].each { |dir| FileUtils.cp_r(File.join(root, dir), source) }
  FileUtils.mkdir_p(File.join(source, "_posts"))
  %w[atom.xml rss.xml].each { |file| FileUtils.cp(File.join(root, "assets", file), source) }
  paths.each do |name, (url, _)|
    data = {"title" => name, "permalink" => url, "include_on_feed" => true, "show_breadcrumb" => true}
    path = name == "home" ? "index.html" : "_posts/2024-01-02-#{name}.md"
    File.write(File.join(source, path), data.to_yaml + "---\nCanonical fixture.")
  end
  descriptions.each do |name, (excerpt, _)|
    data = {"title" => name, "excerpt" => excerpt}
    File.write(File.join(source, "#{name}.md"), data.to_yaml + "---\nFallback content.")
  end
  ["", "/subdir"].each do |baseurl|
    config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"), "url" => "https://example.com", "baseurl" => baseurl, "title" => "Site", "author" => {"name" => "Author"}, "og_image" => "/image.jpg", "defaults" => [{"scope" => {"path" => ""}, "values" => {"layout" => "default"}}], "quiet" => true)
    site = Jekyll::Site.new(config)
    site.process
    sitemap = Nokogiri::XML(File.read(File.join(config["destination"], "sitemap.xml"))).remove_namespaces!
    sitemap_urls = sitemap.css("loc").map(&:text)
    atom = Nokogiri::XML(File.read(File.join(config["destination"], "atom.xml"))).remove_namespaces!
    rss = Nokogiri::XML(File.read(File.join(config["destination"], "rss.xml"))).remove_namespaces!
    paths.each do |name, (_, normalized)|
      expected = "https://example.com#{baseurl}#{normalized}"
      page = site.pages.find { |item| item.data["title"] == name } || site.posts.docs.find { |item| item.data["title"] == name }
      doc = Nokogiri::HTML(File.read(page.destination(config["destination"])))
      check(doc.at_css('link[rel="canonical"]')["href"] == expected, "Canonical incorrect: #{name}, #{baseurl}")
      check(doc.at_css('meta[property="og:url"]')["content"] == expected, "OG URL differs: #{name}")
      check(doc.at_css('a.u-url')["href"] == expected, "Microformat URL differs: #{name}")
      check(sitemap_urls.include?(expected), "Sitemap differs: #{name}")
      blocks = doc.css('script[type="application/ld+json"]').map { |node| JSON.parse(node.text) }
      check(blocks.find { |block| block["@type"] == "WebPage" }["@id"] == expected, "WebPage URL differs: #{name}")
      if name == "home"
        check(blocks.find { |block| block["@type"] == "WebSite" }["url"] == expected, "WebSite home URL differs")
        next
      end
      article = blocks.find { |block| block["@type"] == "BlogPosting" }
      check(article.dig("mainEntityOfPage", "@id") == expected, "Article URL differs: #{name}")
      breadcrumb = blocks.find { |block| block["@type"] == "BreadcrumbList" }
      check(breadcrumb["itemListElement"].last["item"] == expected, "Breadcrumb JSON-LD differs: #{name}")
      check(doc.css('link[itemprop="item"]').last["href"] == expected, "Breadcrumb microdata differs: #{name}")
      entry = atom.css("entry").find { |node| node.at_css("title").text == name }
      check(entry.at_css("link")["href"] == expected && entry.at_css("id").text == expected && entry.at_css("content")["base"] == expected, "Atom URLs differ: #{name}")
      item = rss.css("item").find { |node| node.at_css("title").text == name }
      check(item.at_css("link").text == expected, "RSS URL differs: #{name}")
    end
    descriptions.each do |name, (_, expected)|
      doc = Nokogiri::HTML(File.read(File.join(config["destination"], "#{name}.html")))
      check(doc.at_css('meta[name="description"]')["content"] == expected, "Description truncated or escaped incorrectly: #{name}")
    end
  end
end
puts "SEO regression checks passed."
