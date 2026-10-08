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
    "entities.md" => <<~YAML.chomp,
      title: Country codes & organizations
      subtitle: R & GIS
      excerpt: Use &amp; &quot;quotes&quot; &apos;apostrophes&apos; &lt;maps&gt; &copy; &eacute;.
      breadcrumb_list:
        - label: Maps &amp; "data"
          url: /maps/?a=1&b=2
    YAML
    "special-author.md" => <<~'YAML'.chomp,
      title: Special author
      excerpt: Safe metadata
      author:
        name: 'Guest "R & GIS" \ map </script>'
        location: 'Madrid "Spain"'
        links:
          - url: https://twitter.com/guest
          - url: https://example.com/?a=1&amp;b=2
    YAML
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
  creator_cases = {
    "query" => [["https://x.com/guest?lang=en"], "@guest"],
    "uppercase-scheme" => [["HTTPS://x.com/guest"], "@guest"],
    "mixed-case-scheme" => [["hTtPs://WWW.TWITTER.COM/Guest_12/?lang=en#bio"], "@Guest_12"],
    "uppercase-http-scheme" => [["HTTP://www.x.com/guest"], "@guest"],
    "profile-port" => [["https://x.com:443/guest"], "@guest"],
    "deceptive-userinfo-port" => [["https://x.com:443@evil.test/guest"], nil],
    "deceptive-userinfo-password" => [["https://twitter.com:password@evil.test/guest"], nil],
    "userinfo" => [["https://user:password@x.com/guest"], nil],
    "userinfo-later-valid" => [["https://x.com:443@evil.test/guest", "https://x.com/guest"], "@guest"],
    "fragment" => [["https://twitter.com/guest#bio"], "@guest"],
    "trailing-only" => [["https://twitter.com/guest/"], "@guest"],
    "maximum-length" => [["http://x.com/abcdefghijklmno"], "@abcdefghijklmno"],
    "trailing" => [["https://www.x.com/Guest_12/?lang=en#bio"], "@Guest_12"],
    "status" => [["https://x.com/guest/status/123"], nil],
    "root" => [["https://x.com/"], nil],
    "root-query" => [["https://x.com?lang=en"], nil],
    "auxiliary" => [["https://x.com/HOME"], nil],
    "intent" => [["https://twitter.com/intent/tweet"], nil],
    "invalid-character" => [["https://x.com/guest-name"], nil],
    "too-long" => [["https://x.com/abcdefghijklmnop"], nil],
    "double-slash" => [["https://x.com/guest//"], nil],
    "invalid-scheme" => [["ftp://x.com/guest"], nil],
    "empty-url" => [[""], nil],
    "later-valid" => [["https://x.com/home", "https://x.com/guest/status/123", "https://twitter.com/guest"], "@guest"],
    "deceptive" => [["https://evil.x.com/guest", "https://x.com.evil.test/guest", "https://x.com@evil.test/guest"], nil],
    "missing-links" => [nil, nil],
    "empty-links" => [[], nil]
  }
  creator_cases.each do |name, (urls, _expected)|
    author = { "name" => "Guest" }
    author["links"] = urls.map { |url| { "url" => url } } unless urls.nil?
    fixtures["creator-#{name}.md"] = "title: Creator #{name}\nauthor: #{author.to_json}"
  end
  # The explicit home breadcrumb is exercised in a separate build below.
  fixtures.each do |path, frontmatter|
    next if path == "custom-home.md"
    File.write(File.join(source, path), "---\n#{frontmatter}\n---\n\nFirst paragraph.\n\nSecond paragraph.\n")
  end

  config = nil
  [nil, "es-MX"].each do |locale|
    config = Jekyll.configuration(
      "source" => source,
      "destination" => File.join(source, "_site"),
      "url" => "https://example.com",
      "title" => "Example site",
      "subtitle" => "Example subtitle",
      "locale" => locale,
      "twitter_site" => "site_account",
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
      creator_case = File.basename(path, ".html").delete_prefix("creator-")
      expected_creator = if creator_cases.key?(creator_case)
                           creator_cases.fetch(creator_case).last
                         elsif path.end_with?("guest.html", "www-twitter.html", "special-author.html")
                           "@guest"
                         elsif path.end_with?("unrelated.html")
                           nil
                         else
                           "@author"
                         end
      check(metadata(html, "twitter:creator") == expected_creator, "Incorrect Twitter/X creator in #{File.basename(path)}")
      check(metadata(html, "twitter:site") == "@site_account", "Twitter site attribution changed")
      if creator_cases.key?(creator_case)
        urls = creator_cases.fetch(creator_case).first
        expected_urls = (urls || []).select { |url| url.include?("http") }
        author = blocks.first.fetch("author")
        check(author["name"] == "Guest", "Guest author changed")
        if expected_urls.any?
          check(author["url"] == expected_urls.first, "Author social URL changed")
          check((author["sameAs"] || []) == expected_urls.drop(1), "Author social links changed")
        end
      end
      check(metadata(html, "og:type") == (path.end_with?("example.html") ? "article" : "website"), "Incorrect OG type")
    end

    entities = blocks_by_page.fetch("entities.html")
    check(entities.first["headline"] == "Country codes & organizations", "Headline retains HTML entities")
    check(entities.find { |block| block["@type"] == "BreadcrumbList" }["itemListElement"].first["name"] == 'Maps & "data"', "Breadcrumb encoding incorrect")
    expected_description = %(R & GIS - Use & "quotes" 'apostrophes' <maps> © é.)
    check(entities.find { |block| block.key?("description") }["description"] == expected_description, "Description retains HTML entities")
    check(metadata(File.read(File.join(destination, "entities.html")), "description") == expected_description, "HTML description changed")
    special = blocks_by_page.fetch("special-author.html")
    expected_name = 'Guest "R & GIS" \\ map </script>'
    check(special.first["author"]["name"] == expected_name, "Author string serialization incorrect")
    check(special.first["author"]["sameAs"] == ["https://example.com/?a=1&amp;b=2"], "Raw URL entity altered")
    check(special.last["name"] == expected_name && special.last["homeLocation"]["name"] == 'Madrid "Spain"', "Person serialization incorrect")
    check(metadata(File.read(File.join(destination, "special-author.html")), "author") == expected_name, "HTML author attribute broken")

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

  values = {
    "&amp; &quot; &apos; &lt; &gt;" => %(& " ' < >),
    "&#38; &#34; &#39; &#60; &#62;" => %(& " ' < >),
    "&#x26; &#x22; &#x27; &#x3C; &#x3E;" => %(& " ' < >),
    "&amp;quot; &amp;amp;" => "&quot; &amp;",
    %(Quotes " and backslash \\ and naïve </script>) => %(Quotes " and backslash \\ and naïve </script>)
  }
  values.each do |value, expected|
    File.write(File.join(source, "string.json"), "---\nlayout: null\nvalue: #{value.to_json}\n---\n{% include snippets/jsonld-string.html value=page.value %}")
    Jekyll::Site.new(config).process
    output = File.read(File.join(config["destination"], "string.json"))
    check(JSON.parse(output) == expected, "String include decoded incorrectly: #{value}")
    check(!output.include?("</script>"), "Literal script end tag emitted")
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
