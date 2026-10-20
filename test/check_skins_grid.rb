# Run from the repository root: bundle exec ruby test/check_skins_grid.rb
require "jekyll"
require "nokogiri"

root = File.expand_path("..", __dir__)
source = File.read(File.join(root, "docs/_pages/skins.md")).sub(/\A---.*?---\s*/m, "")
documents = 3.times.map do |n|
  {"collection" => "skins", "id" => "skin-#{n}", "skin" => "skin-#{n}", "date" => "2025-01-0#{n + 1}", "url" => "/skins/skin-#{n}", "title" => "Skin #{n}", "skin_author" => "Example author", "og_image" => "/skin-#{n}.png"}
end
site = Jekyll::Site.new(Jekyll.configuration("source" => root, "quiet" => true, "plugins" => [], "theme" => nil, "remote_theme" => nil))
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
row.css("img").each do |image|
  raise "Missing intrinsic dimensions" unless image["width"] == "960" && image["height"] == "540"
  raise "Missing lazy loading" unless image["loading"] == "lazy"
  raise "Unhelpful preview alt" unless image["alt"].include?("typography, buttons and components")
end
names = row.css(".card-footer a").map { |a| a["aria-label"] }
raise "Preview links need distinct accessible names" unless names.uniq.size == documents.size && names.none?(&:nil?)
File.write(ARGV.first, html) if ARGV.first
puts "Skins grid checks passed."
