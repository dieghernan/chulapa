# Run from test/: bundle exec ruby check_series_posts.rb (Jekyll 3 or 4).
require "jekyll"
require "jekyll-include-cache"
require "nokogiri"
require "json"
require "tmpdir"
require "fileutils"

root = File.expand_path("..", __dir__)
Dir.mktmpdir("chulapa-series-posts-") do |source|
  %w[_includes _layouts].each { |dir| FileUtils.cp_r(File.join(root, dir), source) }
  FileUtils.mkdir_p(File.join(source, "_posts"))
  FileUtils.mkdir_p(File.join(source, "_includes/custom"))
  FileUtils.cp(File.join(root, "docs/_includes/custom/series-jsonld.html"), File.join(source, "_includes/custom"))
  File.write(File.join(source, "_includes/custom/custom_head.html"), '{% if page.series_page %}{% include custom/series-jsonld.html %}{% endif %}')
  FileUtils.cp(File.join(root, "docs/_pages/tutorials.html"), source)
  series = {
    "guides" => { "label" => '<span class="chulapa"><em>R</em></span> & maps', "part_label" => "Issue", "index_label" => "Issues" },
    "notes" => { "label" => '<div data-editorial="label"><a href="/about/">Notes</a></div>' },
    "pages" => { "label" => "<p>Pages</p>" },
    "solo" => { "label" => "Solo" },
    "missing-order" => { "label" => "Missing order" },
    "image-only" => { "label" => '<img src="/logo.svg" alt="Logo">' }
  }
  fixtures = {
    "first" => [["guides", 0]],
    "middle" => [["guides", 20], ["notes", "-2"], ["notes", -2], ["missing-order", nil], ["guides", 0]],
    "without-widget" => [["guides", 50], ["notes", 3]],
    "solo" => [["solo", 1]],
    "invalid" => [["guides", "1"], ["notes", 1.0], ["solo", nil], ["image-only", 1], ["unknown", 1]]
  }
  fixtures.each do |name, entries|
    memberships = entries.map do |id, order|
      order.nil? ? { "id" => id } : { "id" => id, "order" => order }
    end
    body = name == "without-widget" ? "Content" : "{% include snippets/series-chapters.html %}"
    File.write(File.join(source, "_posts", "2024-01-01-#{name}.md"), "---\nlayout: default\ntitle: #{name}\nseries: #{JSON.generate(memberships)}\n---\n#{body}\n")
  end
  FileUtils.mkdir_p(File.join(source, "_entries"))
  FileUtils.mkdir_p(File.join(source, "_hidden"))
  {
    "index.md" => ["pages", -2, { "title" => "Home" }],
    "feature-notes.md" => ["pages", 2, {}],
    "_entries/entry.md" => ["pages", 2, { "title" => "Entry", "canonical_url" => "/canonical-entry" }],
    "_entries/last.md" => ["pages", 10, { "title" => "Last" }],
    "_entries/future.md" => ["guides", 100, { "title" => "Future", "date" => "2099-01-01" }],
    "_hidden/hidden.md" => ["guides", 100, { "title" => "Hidden" }],
    "unpublished.md" => ["guides", 100, { "title" => "Unpublished", "published" => false }]
  }.each do |path, (id, order, metadata)|
    front_matter = { "layout" => "minimal", "series" => [{ "id" => id, "order" => order }] }.merge(metadata)
    File.write(File.join(source, path), "---\n#{JSON.generate(front_matter)}\n---\n{% include snippets/series-chapters.html %}")
  end
  config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"),
    "url" => "https://example.com", "baseurl" => "/preview", "series" => series, "quiet" => true,
    "time" => "2026-11-16", "collections" => { "entries" => { "output" => true }, "hidden" => { "output" => false } },
    "compress_html" => { "blanklines" => true })
  Jekyll::Site.new(config).process
  home = "https://example.com/preview/"
  website = { "@id" => home + "#website" }
  posts = fixtures.keys.to_h do |name|
    doc = Nokogiri::HTML5.parse(File.read(File.join(config["destination"], "2024/01/01/#{name}.html")))
    scripts = doc.css('script[type="application/ld+json"]')
    nodes = scripts.map { |node| JSON.parse(node.text) }
    raise "WebPage must belong to the website" unless nodes.find { |node| node["@type"] == "WebPage" }.fetch("isPartOf") == website
    if name == "middle"
      expected = <<~'JSON'.gsub(/^/, "        ")
        "isPartOf": [
          {
            "@id": "https://example.com/preview/#website"
          },
          {
            "@type": "CreativeWorkSeries",
            "@id": "https://example.com/preview/#series-guides",
            "name": "R \u0026 maps"
          },
          {
            "@type": "CreativeWorkSeries",
            "@id": "https://example.com/preview/#series-notes",
            "name": "Notes"
          }
        ],
      JSON
      raise "Series JSON-LD indentation lost" unless scripts.first.text.include?("\n#{expected}")
    end
    [name, [doc, nodes.find { |node| node["@type"] == "BlogPosting" }.fetch("isPartOf")]]
  end
  guides = { "@type" => "CreativeWorkSeries", "@id" => home + "#series-guides", "name" => "R & maps" }
  notes = { "@type" => "CreativeWorkSeries", "@id" => home + "#series-notes", "name" => "Notes" }
  doc, membership = posts.fetch("middle")
  raise "Wrong article series" unless membership == [website, guides, notes]
  widgets = doc.css(".chulapa-series")
  progress = widgets.map do |widget|
    bar = widget.at_css("progress")
    %w[value max aria-label].map { |attribute| bar[attribute] }
  end
  raise "Wrong series progress: #{progress.inspect}" unless progress == [
    ["2", "3", "R & maps progress, Issue 2 of 3"], ["1", "2", "Notes progress, Part 1 of 2"]
  ]
  first_widget = widgets.first
  raise "Series branding was lost or wrapped in a paragraph" unless first_widget.at_css(".font-weight-bold > div > .chulapa > em")&.text == "R"
  raise "Block HTML was lost from the series label" unless widgets.last.at_css('[data-editorial="label"] > a')&.[]("href") == "/about/"
  raise "Missing repeated membership warning" unless doc.xpath("//comment()").count { |comment| comment.text.include?("is listed more than once on this page") } == 2
  raise "Wrong index label" unless first_widget.at_css("summary").text == "Issues: R & maps"
  raise "Wrong current chapter" unless first_widget.at_css('[aria-current="page"]').text.strip == "middle"
  links = first_widget.css(".chulapa-series-controls a").map { |link| link["href"] }
  raise "Wrong previous and next links" unless links == %w[/preview/2024/01/01/first.html /preview/2024/01/01/without-widget.html]
  raise "Series identity changed between posts" unless posts.fetch("first").last == [website, guides]
  raise "Missing membership without widget" unless posts.fetch("without-widget").last == [website, guides, notes]
  raise "Missing singleton membership" unless posts.fetch("solo").last.last["@id"] == home + "#series-solo"
  raise "Invalid memberships changed the website-only shape" unless posts.fetch("invalid").last == website
  %w[without-widget solo invalid].each do |name|
    raise "Unexpected widget on #{name}" if posts.fetch(name).first.at_css(".chulapa-series")
  end
  homepage = Nokogiri::HTML5.parse(File.read(File.join(config["destination"], "index.html")))
  homepage_nodes = homepage.css('script[type="application/ld+json"]').map { |node| JSON.parse(node.text) }
  pages = { "@type" => "CreativeWorkSeries", "@id" => home + "#series-pages", "name" => "Pages" }
  raise "Home page is missing its series membership" unless homepage_nodes.find { |node| node["@type"] == "WebPage" }.fetch("isPartOf") == [website, pages]
  home_widget = homepage.at_css(".chulapa-series")
  raise "Series label lost its explicit paragraph" unless home_widget.at_css(".font-weight-bold > div > p")&.text == "Pages"
  chapter_links = home_widget.css("ol a").map { |link| [link["href"], link.text] }
  raise "Wrong order or titles for page and collection chapters" unless chapter_links == [
    ["/preview/entries/entry.html", "Entry"], ["/preview/feature-notes.html", "feature notes"], ["/preview/entries/last.html", "Last"]
  ]
  raise "Missing duplicate order warning" unless home_widget.xpath(".//comment()").any? { |comment| comment.text.include?("duplicate order 2") }
  entry_page = Nokogiri::HTML5.parse(File.read(File.join(config["destination"], "entries/entry.html")))
  next_link = entry_page.css(".chulapa-series-controls a").last
  raise "Missing fallback title for the Next link" unless next_link["title"] == "feature notes" && next_link.text.include?("feature notes")

  catalog = Nokogiri::HTML5.parse(File.read(File.join(config["destination"], "tutorials/index.html")))
  catalog_nodes = catalog.css('script[type="application/ld+json"]').map { |node| JSON.parse(node.text) }
  catalog_series = catalog_nodes.find { |node| node["@type"] == "CollectionPage" }.fetch("mainEntity").fetch("itemListElement")
  raise "Catalog series identities differ from those on the chapters" unless catalog_series.map { |entry| entry.fetch("item").slice("@type", "@id", "name") } == [guides, notes, pages]
  raise "Catalog lost block HTML in its series name" unless catalog.at_css('#notes [data-editorial="label"] > a')&.text == "Notes"
  raise "Catalog lost series branding" unless catalog.at_css("#guides .chulapa em")&.text == "R"
  expected_paths = [
    %w[/preview/2024/01/01/first.html /preview/2024/01/01/middle.html /preview/2024/01/01/without-widget.html],
    %w[/preview/2024/01/01/middle.html /preview/2024/01/01/without-widget.html],
    ["/preview/"] + chapter_links.map(&:first)
  ]
  cards = catalog.css(".series-card")
  raise "Catalog navigation differs from widget navigation" unless cards.map { |card| card.css("ol a").map { |a| a["href"] } } == expected_paths
  raise "Start reading points to the wrong chapter" unless cards.map { |card| card.at_css(".card-footer a")["href"] } == expected_paths.map(&:first)
  raise "Catalog lost the fallback title" unless cards.last.css("ol a").map(&:text) == ["Home"] + chapter_links.map(&:last)
  chapter_ids = catalog_series.map { |entry| entry.fetch("item").fetch("hasPart").map { |part| part.fetch("@id") } }
  expected_ids = expected_paths.take(2).map { |paths| paths.map { |path| "https://example.com#{path}#article" } }
  expected_ids << [home, home + "canonical-entry", home + "feature-notes.html", home + "entries/last.html"]
  raise "Catalog JSON-LD membership, order or canonical identity is wrong" unless chapter_ids == expected_ids
end
puts "Series widget, article memberships and catalog identities passed."
