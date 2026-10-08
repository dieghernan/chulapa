# Run from the repository root with: bundle exec ruby test/check_head_metadata.rb
require "jekyll"
require "jekyll-include-cache"
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
    <body>{% include components/breadcrumbdatesocial.html %}{{ content }}</body></html>
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
  robots_cases = {
    "robots-configured.md" => ["robots: 'noindex, follow'", "noindex, follow"],
    "robots-empty.md" => ["robots: ''", "index, follow"],
    "robots-null.md" => ["robots:", "index, follow"],
    "robots-whitespace.md" => ["robots: '   '", "index, follow"],
    "robots-escaped.md" => ["robots: #{%(noindex, \"quoted\" & <value>).to_json}", %(noindex, "quoted" & <value>)],
    "robots-defaults/defaulted.md" => ["", "noindex, follow"],
    "robots-defaults/overridden.md" => ["robots: 'index, nofollow'", "index, nofollow"],
    "robots-defaults/empty-override.md" => ["robots: ''", "index, follow"],
    "_posts/2024-01-03-robots-post.md" => ["robots: 'noindex, nofollow'", "noindex, nofollow"],
    "_notes/robots-collection.md" => ["robots: 'noindex, follow'", "noindex, follow"],
    "404.md" => ["", "index, follow"],
    "search.md" => ["", "index, follow"],
    "tags.md" => ["", "index, follow"],
    "archives.md" => ["", "index, follow"]
  }
  robots_expected = {}
  robots_cases.each do |path, (frontmatter, expected)|
    fixtures[path] = "title: Robots fixture\n#{frontmatter}"
    robots_expected[File.basename(path, ".md").sub(/\A\d{4}-\d{2}-\d{2}-/, "") + ".html"] = expected
  end
  fixtures["custom-permalink.md"] = "title: Custom page\npermalink: /custom-location.html\ndate: 2024-02-03\nlast_modified_at: 2024-03-04"
  fixtures["empty-breadcrumbs.md"] = "title: Empty breadcrumbs\nbreadcrumb_list: []"
  fixtures["untitled.md"] = "excerpt: Untitled page"
  fixtures["_notes/dated-note.md"] = "title: Dated note\ndate: 2024-04-05"
  # The explicit home breadcrumb is exercised in a separate build below.
  fixtures.each do |path, frontmatter|
    next if path == "custom-home.md"
    FileUtils.mkdir_p(File.dirname(File.join(source, path)))
    File.write(File.join(source, path), "---\n#{frontmatter}\n---\n\nFirst paragraph.\n\nSecond paragraph.\n")
  end

  config = nil
  [nil, "es-MX"].each do |locale|
    config = Jekyll.configuration(
      "source" => source,
      "destination" => File.join(source, "_site"),
      "url" => "https://example.com",
      "baseurl" => locale ? "/subdir" : "",
      "og_image" => "/images/cover.jpg",
      "navbar" => { "brand" => { "title" => '<i class="fa-solid fa-fire"></i>' } },
      "title" => "Example site",
      "subtitle" => "Example subtitle",
      "locale" => locale,
      "twitter_site" => "site_account",
      "collections" => { "notes" => { "output" => true } },
      "author" => { "name" => "Author", "links" => [{ "url" => "https://box.com/user" }, { "url" => "https://example.com/x.com/other" }, { "url" => locale ? "https://WWW.X.COM:443/author" : "https://x.com/author" }] },
      "defaults" => [
        { "scope" => { "path" => "" }, "values" => { "layout" => "head", "show_breadcrumb" => true } },
        { "scope" => { "path" => "robots-defaults" }, "values" => { "robots" => "noindex, follow" } }
      ],
      "quiet" => true
    )
    Jekyll::Site.new(config).process
    destination = config["destination"]
    blocks_by_page = {}
    Dir.glob(File.join(destination, "**", "*.html")).each do |path|
      html = File.read(path)
      check(html.scan(/<meta\s+name="robots"\s/).size == 1, "Expected one robots tag in #{path}")
      check(metadata(html, "robots") == robots_expected.fetch(File.basename(path), "index, follow"), "Incorrect robots metadata in #{path}")
      if File.basename(path) == "robots-escaped.html"
        check(html.include?('content="noindex, &quot;quoted&quot; &amp; &lt;value&gt;"'), "Robots attribute was not escaped")
      end
      blocks = html.scan(/<script type="application\/ld\+json">(.*?)<\/script>/m).map { |block| JSON.parse(block.first) }
      blocks_by_page[File.basename(path)] = blocks
      canonical = CGI.unescapeHTML(html[/<link rel="canonical" href="([^"]+)"/, 1])
      webpage = blocks.select { |block| block["@type"] == "WebPage" }
      check(webpage.size == 1, "Expected one principal WebPage in #{path}")
      check(webpage.first["@id"] == canonical, "WebPage identifier differs from canonical in #{path}")
      check(webpage.first.key?("name") && webpage.first.key?("description"), "WebPage lost name or description in #{path}")
      check(!webpage.first.key?("mainEntityOfPage"), "WebPage refers to itself in #{path}")
      if blocks.first["@type"] == "WebPage"
        check(%w[headline image author publisher].all? { |key| webpage.first.key?(key) }, "Consolidated WebPage lost properties in #{path}")
        check(blocks.none? { |block| %w[BlogPosting WebSite].include?(block["@type"]) }, "Ordinary page reclassified in #{path}")
      elsif blocks.first["@type"] == "BlogPosting"
        check(blocks.first["@id"] == canonical + "#article", "Article identifier incorrect")
        check(blocks.first.dig("mainEntityOfPage", "@id") == webpage.first["@id"], "Article not linked to its WebPage")
      end
      breadcrumb = blocks.find { |block| block["@type"] == "BreadcrumbList" }
      microdata = html[/<ol[^>]*itemtype="https:\/\/schema.org\/BreadcrumbList"[^>]*>.*?<\/ol>/m]
      if breadcrumb
        items = breadcrumb.fetch("itemListElement")
        check(items.size >= 2 && items.all? { |item| !item.fetch("name").strip.empty? }, "Breadcrumb has missing names or too few items in #{path}")
        check(items.map { |item| item["position"] } == (1..items.size).to_a, "Breadcrumb positions incorrect")
        check(items.map { |item| item["@id"] } == (1..items.size).map { |position| canonical + "#breadcrumb-#{position}" }, "Breadcrumb element identifiers incorrect")
        check(items.last["item"] == canonical, "Current breadcrumb URL missing")
        check(breadcrumb["@id"] == canonical + "#breadcrumb", "Breadcrumb identifier incorrect")
        check(!microdata.nil?, "Microdata breadcrumb missing in #{path}")
        check(CGI.unescapeHTML(microdata[/itemid="([^"]+)"/, 1]) == breadcrumb["@id"], "Breadcrumb identifiers disagree")
        micro_items = microdata.scan(/<li\b.*?<\/li>/m).map do |li|
          item = {
            "@id" => CGI.unescapeHTML(li[/itemid="([^"]+)"/, 1]),
            "name" => CGI.unescapeHTML(li[/<span itemprop="name">(.*?)<\/span>/m, 1]),
            "position" => li[/itemprop="position" content="(\d+)"/, 1].to_i
          }
          url = li[/<a href="([^"]+)" itemprop="item"/, 1]
          url ||= li[/<link itemprop="item" href="([^"]+)"/, 1]
          item["item"] = CGI.unescapeHTML(url) if url
          item
        end
        check(micro_items == items.map { |item| item.reject { |key, _| key == "@type" } }, "Breadcrumb formats disagree in #{path}")
      else
        check(microdata.nil?, "Unexpected microdata breadcrumb on home page")
      end
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
      check(metadata(html, "og:type") == (path.end_with?("example.html", "robots-post.html") ? "article" : "website"), "Incorrect OG type")
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
    expected_home = "https://example.com#{locale ? '/subdir' : ''}/"
    check(home.count { |block| block["@type"] == "WebSite" } == 1, "Duplicate WebSite on home page")
    check(home.first["name"] == "Example site" && home.first["url"] == expected_home, "Required WebSite properties incorrect")
    check(home.first["@id"] == expected_home + "#website", "WebSite identifier incorrect")
    check(home.find { |block| block["@type"] == "WebPage" }.dig("isPartOf", "@id") == home.first["@id"], "Home page not linked to WebSite")
    automatic = blocks_by_page.fetch("page.html").find { |block| block["@type"] == "BreadcrumbList" }
    check(automatic["itemListElement"].first["name"] == "Example site", "Icon-only brand did not fall back to site title")
    check(automatic["itemListElement"].first["item"] == expected_home, "Breadcrumb baseurl incorrect")
    custom = blocks_by_page.fetch("custom-location.html").first
    check(custom["@id"] == expected_home + "custom-location.html", "Custom permalink identifier incorrect")
    check(custom["datePublished"].start_with?("2024-02-03") && custom["dateModified"].start_with?("2024-03-04"), "Page date metadata lost")
    check(custom["image"] == expected_home + "images/cover.jpg", "Page image baseurl incorrect")
    check(custom["publisher"]["name"] == "Author" && custom["author"]["name"] == "Author", "Page author or publisher changed")
    note = blocks_by_page.fetch("dated-note.html").first
    check(note["@type"] == "WebPage" && note["datePublished"].start_with?("2024-04-05"), "Collection reclassified or date lost")
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

Dir.mktmpdir("chulapa-publisher-") do |source|
  FileUtils.cp_r(File.join(theme_root, "_includes"), source)
  FileUtils.mkdir_p(File.join(source, "_layouts"))
  File.write(File.join(source, "_layouts", "head.html"), "{% include head.html %}")
  File.write(File.join(source, "index.md"), "---\nlayout: head\ntitle: Home\n---\n")
  File.write(File.join(source, "guest.md"), "---\nlayout: head\ntitle: Guest\ndate: 2024-01-02\nauthor:\n  name: Guest writer\n---\n")
  cases = [
    ["legacy", nil, {}, { "@type" => "Organization", "name" => "Author", "url" => "https://example.com/subdir/", "logo" => { "@type" => "ImageObject", "url" => "https://example.com/subdir/banner.jpg" } }],
    ["blank", { "type" => nil, "name" => "", "image" => "" }, {}, { "@type" => "Organization", "name" => "Author", "url" => "https://example.com/subdir/", "logo" => { "@type" => "ImageObject", "url" => "https://example.com/subdir/banner.jpg" } }],
    ["organization", { "name" => 'Publisher "&" </script>', "url" => "/publisher/", "logo" => "/logo.png", "image" => "https://cdn.example.com/image.jpg?a=1&b=2" }, {}, { "@type" => "Organization", "name" => 'Publisher "&" </script>', "url" => "https://example.com/subdir/publisher/", "logo" => { "@type" => "ImageObject", "url" => "https://example.com/subdir/logo.png" }, "image" => "https://cdn.example.com/image.jpg?a=1&b=2" }],
    ["person", { "type" => "Person", "name" => "Publisher", "url" => "https://publisher.example/", "image" => "/person.jpg", "logo" => "/ignored.png" }, {}, { "@type" => "Person", "name" => "Publisher", "url" => "https://publisher.example/", "image" => "https://example.com/subdir/person.jpg" }],
    ["person avatar", { "type" => "Person", "image" => "" }, {}, { "@type" => "Person", "name" => "Author", "url" => "https://example.com/subdir/", "image" => "https://example.com/subdir/avatar.png" }],
    ["person no image", { "type" => "Person" }, { "author" => { "name" => "Author" } }, { "@type" => "Person", "name" => "Author", "url" => "https://example.com/subdir/" }],
    ["unsupported type", { "type" => "person" }, {}, { "@type" => "Organization", "name" => "Author", "url" => "https://example.com/subdir/", "logo" => { "@type" => "ImageObject", "url" => "https://example.com/subdir/banner.jpg" } }],
    ["github fallbacks", { "type" => "Person" }, { "author" => {}, "github" => { "owner_name" => "GitHub owner", "owner_gravatar_url" => "https://github.example/avatar.png" } }, { "@type" => "Person", "name" => "GitHub owner", "url" => "https://example.com/subdir/", "image" => "https://github.example/avatar.png" }],
    ["organization avatar", {}, { "og_image" => nil }, { "@type" => "Organization", "name" => "Author", "url" => "https://example.com/subdir/", "logo" => { "@type" => "ImageObject", "url" => "https://example.com/subdir/avatar.png" } }]
  ]
  cases.each do |label, publisher, overrides, expected|
    config = Jekyll.configuration({ "source" => source, "destination" => File.join(source, "_site"), "url" => "https://example.com", "baseurl" => "/subdir", "title" => "Example", "author" => { "name" => "Author", "avatar" => "/avatar.png" }, "og_image" => "/banner.jpg", "publisher" => publisher, "quiet" => true }.merge(overrides))
    Jekyll::Site.new(config).process
    %w[index.html guest.html].each do |file|
      html = File.read(File.join(config["destination"], file))
      blocks = html.scan(/<script type="application\/ld\+json">(.*?)<\/script>/m).map { |block| JSON.parse(block.first) }
      check(blocks.first["publisher"] == expected, "Publisher incorrect: #{label}, #{file}")
      profile = blocks.find { |block| block["@type"] == "Person" }
      configured = publisher && publisher.values.any? { |value| value && value != "" }
      check(profile["description"] == (configured ? "Site author" : "Publisher"), "Site author role incorrect: #{label}")
      check(blocks.first.dig("author", "name") == "Guest writer", "Publisher overwrote guest author: #{label}") if file == "guest.html"
      check(metadata(html, "og:image") == "https://example.com/subdir/banner.jpg", "Publisher changed social image") unless overrides.key?("og_image")
    end
  end
end

puts "Head metadata checks passed."
