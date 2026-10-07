# Run from the repository root with: bundle exec ruby test/check_head_metadata.rb
require "jekyll"
require "json"
require "tmpdir"
require "fileutils"
require "cgi"

def check(condition, message)
  raise message unless condition
end

def metadata(html, property)
  tag = html[/<meta (?:name|property)="#{Regexp.escape(property)}"[^>]*>/]
  tag && CGI.unescapeHTML(tag[/content="([^"]*)"/, 1])
end

theme_root = File.expand_path("..", __dir__)

Dir.mktmpdir("chulapa-head-") do |source|
  FileUtils.cp_r(File.join(theme_root, "_includes"), source)
  FileUtils.mkdir_p(File.join(source, "_layouts"))
  FileUtils.mkdir_p(File.join(source, "_posts"))
  File.write(File.join(source, "_layouts", "head.html"), <<~LIQUID)
    <html lang="{{ site.locale | default: 'en-US' }}">
    {% include head.html %}
    <body>{{ content }}</body></html>
  LIQUID

  fixtures = {
    "index.md" => "title: Home\nexcerpt: Home description",
    "page.md" => "title: Page\nsubtitle: A subtitle\nexcerpt: |\n  Words on\n  separate lines.",
    "plain.md" => "title: Plain\nexcerpt: |\n  Words on\n  separate lines.",
    "fallback.md" => "title: Fallback",
    "www-twitter.md" => <<~YAML.chomp,
      title: WWW Twitter
      excerpt: Twitter profile
      author:
        name: Guest
        links:
          - url: https://www.twitter.com/guest
    YAML
    "unrelated.md" => <<~YAML.chomp,
      title: Unrelated profiles
      excerpt: No Twitter or X profile
      author:
        name: Other author
        links:
          - url: https://box.com/user
          - url: https://example.com/x.com/other
          - url: https://example.com/?profile=https://twitter.com/other
          - url: https://notx.com/user
          - url: https://evil.x.com/user
    YAML
    "_posts/2024-01-02-example.md" => "title: Example post\nexcerpt: Post description",
    "guest.md" => <<~YAML.chomp,
      title: Guest
      excerpt: Guest description
      author:
        name: Guest
        links:
          - url: https://box.com/user
          - url: https://twitter.com/guest
    YAML
    "custom-home.md" => <<~YAML.chomp,
      title: Custom home
      permalink: /index.html
      excerpt: Custom home description
      breadcrumb_list:
        - label: Parent
          url: /parent/
    YAML
  }
  # The explicit home breadcrumb is exercised in a separate build below.
  fixtures.each do |path, frontmatter|
    next if path == "custom-home.md"
    File.write(File.join(source, path), "---\n#{frontmatter}\n---\n\nFirst paragraph.\n\nSecond paragraph.\n")
  end

  [nil, "es-MX"].each do |locale|
    config = Jekyll.configuration(
      "source" => source,
      "destination" => File.join(source, "_site"),
      "url" => "https://example.com",
      "title" => "Example site",
      "subtitle" => "Example subtitle",
      "locale" => locale,
      "author" => { "name" => "Author", "links" => [{ "url" => "https://box.com/user" }, { "url" => "https://example.com/x.com/other" }, { "url" => locale ? "https://WWW.X.COM:443/author" : "https://x.com/author" }] },
      "defaults" => [{ "scope" => { "path" => "" }, "values" => { "layout" => "head" } }],
      "quiet" => true
    )
    Jekyll::Site.new(config).process
    destination = config["destination"]
    blocks_by_page = {}
    Dir.glob(File.join(destination, "**", "*.html")).each do |path|
      html = File.read(path)
      blocks = html.scan(/<script type="application\/ld\+json">(.*?)<\/script>/m).map { |block| JSON.parse(block.first) }
      blocks_by_page[File.basename(path)] = blocks
      check(blocks.all? { |block| block["@context"] == "https://schema.org" }, "Schema context changed")
      check(metadata(html, "og:locale") == (locale || "en-US").tr("-", "_"), "Incorrect OG locale")
      check(html.include?("<html lang=\"#{locale || 'en-US'}\">"), "HTML language changed")
      expected_creator = if path.end_with?("guest.html", "www-twitter.html")
                           "@guest"
                         elsif path.end_with?("unrelated.html")
                           nil
                         else
                           "@author"
                         end
      check(metadata(html, "twitter:creator") == expected_creator, "Incorrect Twitter/X creator")
      check(metadata(html, "og:type") == (path.end_with?("example.html") ? "article" : "website"), "Incorrect OG type")
    end

    home = blocks_by_page.fetch("index.html")
    check(home.first["@type"] == "WebSite", "Home schema type changed")
    check(home.none? { |block| block["@type"] == "BreadcrumbList" }, "Automatic home breadcrumb remains")
    check(!home.first.key?("datePublished"), "Home gained a publication date")
    post = blocks_by_page.fetch("example.html").first
    check(post["@type"] == "BlogPosting" && post["datePublished"].start_with?("2024-01-02"), "Post schema or date changed")
    check(blocks_by_page.fetch("page.html").first["@type"] == "WebPage", "Page schema type changed")
    check(blocks_by_page.fetch("page.html").any? { |block| block["@type"] == "BreadcrumbList" }, "Interior breadcrumb removed")

    { "page.html" => "A subtitle - Words on separate lines.", "plain.html" => "Words on separate lines.", "fallback.html" => "First paragraph." }.each do |name, expected|
      html = File.read(File.join(destination, name))
      check(metadata(html, "description") == expected, "Description whitespace lost in #{name}")
      check(metadata(html, "og:description") == expected, "OG description differs in #{name}")
      check(blocks_by_page.fetch(name).find { |block| block.key?("description") }["description"] == expected, "Schema description differs in #{name}")
    end
  end

  File.delete(File.join(source, "index.md"))
  File.write(File.join(source, "custom-home.md"), "---\n#{fixtures.fetch('custom-home.md')}\n---\n")
  config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"), "url" => "https://example.com", "title" => "Example", "author" => { "name" => "Author" }, "defaults" => [{ "scope" => { "path" => "" }, "values" => { "layout" => "head" } }], "quiet" => true)
  Jekyll::Site.new(config).process
  html = File.read(File.join(config["destination"], "index.html"))
  blocks = html.scan(/<script type="application\/ld\+json">(.*?)<\/script>/m).map { |block| JSON.parse(block.first) }
  check(blocks.any? { |block| block["@type"] == "BreadcrumbList" && block["itemListElement"].first["name"] == "Parent" }, "Explicit home breadcrumb removed")
end

puts "Head metadata checks passed."
