# Run from test: bundle exec ruby check_liquid_fallbacks.rb
require "jekyll"
require "nokogiri"

# Count real Markdown conversions rather than matching template source text.
module TrackMarkdown
  def markdownify(input)
    @context.registers[:markdown_inputs] << input
    Jekyll::Filters.instance_method(:markdownify).bind(self).call(input)
  end
end

root = File.expand_path("..", __dir__)
site = Jekyll::Site.new(Jekyll.configuration("source" => root, "quiet" => true, "plugins" => [], "theme" => nil, "remote_theme" => nil))

def render(source, assigns, site)
  calls = []
  html = Liquid::Template.parse(source).render!(assigns, filters: [Jekyll::Filters, TrackMarkdown], registers: {site: site, markdown_inputs: calls})
  [Nokogiri::HTML.fragment(html), calls]
end

cards = File.read(File.join(root, "_includes/components/indexcards.html"))
documents = ["<p>Existing &amp; excerpt</p>", nil, "", false].each_with_index.map do |excerpt, index|
  {"url" => "/card-#{index}", "title" => "Card #{index}", "excerpt" => excerpt, "content" => "Fallback **#{index}**\n\nSecond paragraph."}
end
html, calls = render(cards, {"site" => {"url" => "https://example.com"}, "include" => {"cacheddocs" => documents}}, site)
expected = ["Existing & excerpt", "Fallback 1", "Fallback 2", "Fallback 3"]
raise "Card excerpts or fallback paragraphs changed" unless html.css(".p-summary").map(&:text) == expected
raise "Existing card excerpt still converts the full content" if calls.include?(documents.first["content"])
documents.drop(1).each do |document|
  raise "Missing card fallback conversion" unless calls.count(document["content"]) == 1
end

head = File.read(File.join(root, "_includes/head.html"))
page = {"url" => "/page/", "title" => "Page", "description" => "Explicit **description**", "subtitle" => "Unused subtitle", "excerpt" => "Unused excerpt", "content" => "Content **fallback**\n\nSecond paragraph."}
site_values = {"url" => "https://example.com", "title" => "Site", "author" => {"name" => "Author"}}
[nil, "Unused excerpt"].each do |excerpt|
  explicit_page = page.merge("excerpt" => excerpt)
  html, calls = render(head, {"site" => site_values, "page" => explicit_page}, site)
  raise "Explicit description changed" unless html.at_css('meta[name="description"]')["content"] == "Explicit description"
  %w[content excerpt subtitle].each do |field|
    next unless explicit_page[field]
    raise "Unused #{field} still converted" if calls.include?(explicit_page[field])
  end
end
[nil, "", "   "].each do |description|
  fallback_page = page.merge("description" => description, "excerpt" => nil, "subtitle" => nil)
  html, calls = render(head, {"site" => site_values, "page" => fallback_page}, site)
  raise "Missing metadata content fallback" unless html.at_css('meta[name="description"]')["content"] == "Content fallback"
  raise "Content fallback was not converted" unless calls.include?(page["content"])
end
puts "Liquid fallback output and Markdown conversion checks passed."
