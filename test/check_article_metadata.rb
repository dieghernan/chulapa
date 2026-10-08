# Run from the repository root: bundle exec ruby test/check_article_metadata.rb
require "jekyll"
require "jekyll-include-cache"
require "nokogiri"
require "json"
require "tmpdir"
require "fileutils"

def check(condition, message)
  raise message unless condition
end

Dir.mktmpdir("chulapa-article-") do |source|
  root = File.expand_path("..", __dir__)
  %w[_includes _layouts].each { |dir| FileUtils.cp_r(File.join(root, dir), source) }
  fixtures = {
    "plain.md" => {},
    "defaulted.md" => {},
    "no-alternates.md" => { "og_locale_alternate" => [] },
    "language.md" => { "locale" => "fr" },
    "regional.md" => { "locale" => "es-mx" },
    "explicit.md" => { "locale" => "zh-Hant", "og_locale" => "zh_tw", "og_locale_alternate" => ["zh-TW", "en-gb", "en_GB", "fr", "invalid", "es_ES"] },
    "invalid.md" => { "og_locale" => 'e"_US' },
    "blank.md" => { "locale" => "  ", "og_locale" => "  " },
    "search.md" => { "layout" => "search", "locale" => "pt_BR" },
    "note.md" => { "og_type" => "article", "date" => "2024-02-03T12:00:00Z", "last_modified_at" => "2024-03-04T13:00:00Z", "og_article_author" => "/people/guest/?a=1&b=2", "og_article_section" => 'R & "GIS"', "tags" => ['maps & "data"', "", "  ", "cafes"] },
    "guest.md" => { "og_type" => "article", "author" => { "name" => "Guest" } },
    "guest-url.md" => { "og_type" => "article", "author" => { "url" => "https://guest.example/profile" }, "categories" => ["Mapping", "Other"] },
    "modified-only.md" => { "og_type" => "article", "last_modified_at" => "2024-03-04T13:00:00Z" },
    "_posts/2024-01-02-post.md" => { "categories" => ["News"], "tags" => ["release"] },
    "_posts/2024-01-03-website.md" => { "og_type" => "website", "tags" => ["hidden"] }
  }
  fixtures.each do |path, page|
    FileUtils.mkdir_p(File.dirname(File.join(source, path)))
    File.write(File.join(source, path), "---\n#{ { 'layout' => 'minimal', 'title' => 'Example' }.merge(page).to_json}\n---\nContent")
  end
  ["", "/subdir"].each do |baseurl|
    config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"), "url" => "https://example.com", "baseurl" => baseurl, "timezone" => "Etc/UTC", "title" => "Site", "author" => { "url" => "https://author.example/profile" }, "quiet" => true)
    Jekyll::Site.new(config).process
    docs = Dir.glob(File.join(config["destination"], "**/*.html")).to_h { |path| [File.basename(path, ".html"), Nokogiri::HTML(File.read(path))] }
    meta = ->(page, field) { docs.fetch(page).at_css("meta[property='#{field}']")&.[]("content") }
    { "plain" => ["en-US", "en_US"], "language" => ["fr", nil], "regional" => ["es-mx", "es_MX"], "explicit" => ["zh-Hant", "zh_TW"], "invalid" => ["en-US", nil], "blank" => ["en-US", "en_US"], "search" => ["pt-BR", "pt_BR"] }.each do |page, (lang, locale)|
      check(docs.fetch(page).at_css("html")["lang"] == lang, "HTML language: #{page}")
      check(meta.call(page, "og:locale") == locale, "Open Graph locale: #{page}")
    end
    check(docs.fetch("explicit").css("meta[property='og:locale:alternate']").map { |node| node["content"] } == %w[en_GB es_ES], "Alternate locale normalization and deduplication")
    check(meta.call("note", "article:published_time") == "2024-02-03T12:00:00+00:00", "Publication date")
    check(meta.call("note", "article:modified_time") == "2024-03-04T13:00:00+00:00", "Modification date")
    check(meta.call("note", "article:author") == "https://example.com#{baseurl}/people/guest/?a=1&b=2", "Author URL with baseurl and escaping")
    check(meta.call("note", "article:section") == 'R & "GIS"', "Article section escaping")
    check(docs.fetch("note").css("meta[property='article:tag']").map { |node| node["content"] } == ['maps & "data"', "cafes"], "Article tags: #{docs.fetch("note").css("meta[property='article:tag']").map { |node| node["content"] }.inspect}")
    check(meta.call("guest", "article:author").nil?, "Guest inherited site author")
    check(meta.call("guest-url", "article:author") == "https://guest.example/profile", "Guest profile")
    check(meta.call("guest-url", "article:section") == "Mapping", "Category fallback")
    check(meta.call("modified-only", "article:published_time").nil?, "Invented publication date")
    check(meta.call("modified-only", "article:modified_time") == "2024-03-04T13:00:00+00:00", "Independent modification date")
    check(meta.call("post", "og:type") == "article", "Post type")
    check(meta.call("post", "article:author") == "https://author.example/profile", "Site author fallback")
    check(meta.call("post", "article:published_time") == "2024-01-02T00:00:00+00:00", "Post date")
    %w[plain website].each { |page| check(docs.fetch(page).css("meta[property^='article:']").empty?, "Nonarticle emitted article metadata: #{page}") }
    docs.each do |page, doc|
      check(doc.at_css("link[rel='canonical']")["href"] == meta.call(page, "og:url"), "Canonical mismatch: #{page}")
      doc.css('script[type="application/ld+json"]').each { |node| JSON.parse(node.text) }
    end
  end
  config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"), "url" => "https://example.com", "baseurl" => "/subdir", "locale" => "en", "og_locale" => "en-gb", "og_locale_alternate" => ["en_GB", "fr_FR", "fr-fr"], "title" => "Site", "defaults" => [{ "scope" => { "path" => "defaulted.md" }, "values" => { "locale" => "de_DE", "og_type" => "article", "og_locale_alternate" => [] } }], "quiet" => true)
  Jekyll::Site.new(config).process
  read = ->(page) { Nokogiri::HTML(File.read(File.join(config["destination"], "#{page}.html"))) }
  check(read.call("plain").at_css("html")["lang"] == "en", "Site language fallback")
  check(read.call("plain").at_css("meta[property='og:locale']")["content"] == "en_GB", "Site Open Graph locale")
  check(read.call("plain").css("meta[property='og:locale:alternate']").map { |node| node["content"] } == ["fr_FR"], "Site alternate locales")
  check(read.call("regional").at_css("meta[property='og:locale']")["content"] == "es_MX", "Page language must override site Open Graph locale")
  check(read.call("language").css("meta[property='og:locale']").empty?, "Language-only page inherited incorrect territory")
  check(read.call("no-alternates").css("meta[property='og:locale:alternate']").empty?, "Empty page list must disable alternates")
  defaulted = read.call("defaulted")
  check(defaulted.at_css("html")["lang"] == "de-DE", "Front matter default language")
  check(defaulted.at_css("meta[property='og:locale']")["content"] == "de_DE", "Front matter default Open Graph locale")
  check(defaulted.at_css("meta[property='og:type']")["content"] == "article", "Front matter default article type")
  check(defaulted.css("meta[property='og:locale:alternate']").empty?, "Front matter default empty alternates")
end
puts "Article and locale metadata checks passed."
