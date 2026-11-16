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
  File.write(File.join(source, "_includes/custom/custom_head.html"), '{% if page.catalog %}{% include custom/series-jsonld.html %}{% endif %}')
  File.write(File.join(source, "tutorials.html"), "---\nlayout: minimal\ncatalog: true\n---\n")
  series = {
    "guides" => { "label" => "<em>R</em> & maps", "part_label" => "Issue", "index_label" => "Issues" },
    "notes" => { "label" => '<a href="/unexpected/">Notes</a>' },
    "solo" => { "label" => "Solo" },
    "missing-order" => { "label" => "Missing order" },
    "image-only" => { "label" => '<img src="/logo.svg" alt="Logo">' }
  }
  fixtures = {
    "first" => [["guides", 0]],
    "middle" => [["guides", 20], ["notes", -2], ["missing-order", nil]],
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
  config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"),
    "url" => "https://example.com", "baseurl" => "/preview", "series" => series, "quiet" => true,
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
  raise "Inline HTML was lost or wrapped in a paragraph" unless first_widget.at_css(".font-weight-bold > div > em")&.text == "R"
  raise "Series label introduced an interactive control" if widgets.last.at_css(".font-weight-bold > div > a")
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
  catalog = Nokogiri::HTML5.parse(File.read(File.join(config["destination"], "tutorials.html")))
  catalog_nodes = catalog.css('script[type="application/ld+json"]').map { |node| JSON.parse(node.text) }
  catalog_series = catalog_nodes.find { |node| node["@type"] == "CollectionPage" }.fetch("mainEntity").fetch("itemListElement")
  raise "Catalog series identities differ from the article" unless catalog_series.map { |entry| entry.fetch("item").slice("@type", "@id", "name") } == [guides, notes]
end
puts "Series widget, article memberships and catalog identities passed."
