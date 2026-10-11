require "jekyll"
require "jekyll-include-cache"
require "nokogiri"

root = File.expand_path("..", __dir__)
site = Jekyll::Site.new(Jekyll.configuration("source" => root, "quiet" => true, "plugins" => [], "theme" => nil, "remote_theme" => nil))
source = File.read(File.join(root, "_layouts/indexcategory.html")).sub(/\A---.*?---\s*/m, "")
documents = [
  {"name" => "03", "title" => "Alpha", "date" => "2024-02-01", "rank" => 2},
  {"name" => "01", "title" => "Charlie", "date" => "2024-03-01", "rank" => 1},
  {"name" => "02", "title" => "Bravo", "date" => "2024-01-01", "rank" => 3}
].map { |doc| doc.merge("url" => "/#{doc['name']}", "collection" => "demo", "excerpt" => "Summary") }

[
  [{}, %w[Alpha Bravo Charlie]],
  [{"index_sort_asc" => true}, %w[Charlie Bravo Alpha]],
  [{"index_sort" => "title"}, %w[Charlie Bravo Alpha]],
  [{"index_sort" => "title", "index_sort_asc" => true}, %w[Alpha Bravo Charlie]],
  [{"index_sort" => "date"}, %w[Charlie Alpha Bravo]],
  [{"index_sort" => "date", "index_sort_asc" => true}, %w[Bravo Alpha Charlie]],
  [{"index_sort" => "rank", "index_sort_asc" => true, "index_items" => 2}, %w[Charlie Alpha]]
].each do |settings, expected|
  html = Liquid::Template.parse(source).render!(
    {"site" => {"documents" => documents, "url" => "https://example.com"}, "page" => settings.merge("include_collection" => "demo")},
    filters: [Jekyll::Filters], registers: {site: site}
  )
  actual = Nokogiri::HTML(html).css(".card-title").map { |title| title.text.strip }
  raise "Wrong index order for #{settings}: #{actual}" unless actual == expected
end
puts "Collection card sorting by filename, title, date and custom fields passed."

images = [
  {"basename" => "c", "modified_time" => 2, "path" => "/c.jpg"},
  {"basename" => "a", "modified_time" => 3, "path" => "/a.jpg"},
  {"basename" => "b", "modified_time" => 1, "path" => "/b.jpg"}
].map { |image| image.merge("image_col" => "gallery") }
%w[masonry carousel].each do |snippet|
  template = Liquid::Template.parse(File.read(File.join(root, "_includes/snippets/#{snippet}.html")))
  [
    [{}, %w[a c b]],
    [{"index_sort_asc" => true}, %w[b c a]],
    [{"index_sort" => "basename"}, %w[c b a]],
    [{"index_sort" => "basename", "index_sort_asc" => true}, %w[a b c]],
    [{"index_sort" => "basename", "index_sort_asc" => true, "index_items" => 2}, %w[a b]],
    [{"internal" => nil, "external" => "/c.jpg,/a.jpg,/b.jpg"}, %w[c a b]]
  ].each do |settings, expected|
    html = template.render!(
      {"site" => {"static_files" => images, "url" => "https://example.com"}, "include" => {"internal" => "gallery", "random" => false}.merge(settings)},
      filters: [Jekyll::Filters], registers: {site: site}
    )
    actual = Nokogiri::HTML(html).css("img").map { |image| File.basename(image["src"], ".jpg") }
    raise "Wrong #{snippet} order for #{settings}: #{actual}" unless actual == expected
  end
end
puts "Internal gallery sorting and external image order passed."

docs_site = Jekyll::Site.new(Jekyll.configuration("config" => File.join(root, "docs/_config.yml"), "source" => File.join(root, "docs"), "destination" => "/tmp/chulapa-index-check", "quiet" => true, "plugins" => [], "theme" => nil, "remote_theme" => nil))
docs_site.read
demo = docs_site.pages.find { |page| page.data["permalink"] == "/demo" }
html = Liquid::Template.parse(source).render!(
  {"site" => docs_site.site_payload["site"], "page" => demo.to_liquid},
  filters: [Jekyll::Filters], registers: {site: site}
)
links = Nokogiri::HTML(html).css(".card-body a.u-url").map { |link| link["href"] }
expected = docs_site.collections["demo"].docs.sort_by(&:relative_path).map(&:url)
raise "Demo index hides or misorders documents: #{links.inspect}; expected #{expected.inspect}" unless links == expected
puts "Demo index displays all #{links.size} demos in ascending filename order."
