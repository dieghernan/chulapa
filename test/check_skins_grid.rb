# Run from the repository root: bundle exec ruby test/check_skins_grid.rb
require "jekyll"
require "nokogiri"

root = File.expand_path("..", __dir__)
source = File.read(File.join(root, "docs/_pages/skins.md")).sub(/\A---.*?---\s*/m, "")
documents = 3.times.map do |n|
  {"collection" => "skins", "id" => "skin-#{n}", "skin" => "skin-#{n}", "date" => "2025-01-0#{n + 1}", "url" => "/skins/skin-#{n}", "title" => "Skin #{n}", "skin_author" => "Example author", "og_image" => "/skin-#{n}.png"}
end
site = Jekyll::Site.new(Jekyll.configuration("source" => root, "quiet" => true))
liquid = Liquid::Template.parse(source).render!({"site" => {"documents" => documents, "url" => "https://example.com", "baseurl" => "/chulapa"}}, filters: [Jekyll::Filters], registers: {site: site})
html = site.find_converter_instance(Jekyll::Converters::Markdown).convert(liquid)
row = Nokogiri::HTML(html).at_css(".row.row-cols-1")
raise "Missing skins grid" unless row
raise "Skin columns must be siblings" unless row.element_children.size == documents.size
row.element_children.each do |column|
  raise "Expected a grid column" unless column["class"].split.include?("col")
  raise "Expected one card per column" unless column.css(".card").size == 1
  raise "Skin columns must not nest" unless column.css(".col").empty?
end
puts "Skins grid checks passed."
