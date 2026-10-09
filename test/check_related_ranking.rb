# Run from test: bundle exec ruby check_related_ranking.rb
require "jekyll"
require "json"
require "nokogiri"

root = File.expand_path("..", __dir__)
site = Jekyll::Site.new(Jekyll.configuration("source" => root, "quiet" => true, "plugins" => [], "theme" => nil, "remote_theme" => nil))
documents = [
  {"id" => "self", "url" => "/self", "tags" => %w[x y z], "collection" => "posts"},
  {"id" => "best", "url" => "/best", "tags" => %w[x y z], "collection" => "posts", "date" => "2024-01-01"},
  {"id" => "older", "url" => "/older", "tags" => %w[x y], "collection" => "posts", "date" => "2024-01-01"},
  {"id" => "newer", "url" => "/newer", "tags" => %w[x y], "collection" => "posts", "date" => "2024-02-01"},
  {"id" => "below", "url" => "/below", "tags" => %w[x], "collection" => "posts", "date" => "2024-03-01"},
  {"id" => "other", "url" => "/other", "tags" => %w[x y z], "collection" => "demo", "date" => "2023-01-01"}
]

%w[related random].each do |component|
  source = File.read(File.join(root, "_includes/components/#{component}.html"))
  ranking = source.split(component == "random" ? "{% assign total = 0 %}" : "  {%- if sorted_docs -%}").first
  [%w[x y z], [], %w[missing]].each do |tags|
    template = Liquid::Template.parse(ranking + "{{ sorted_docs | map: 'id' | jsonify }}{% endif %}")
    output = template.render!(
      {"site" => {"documents" => documents}, "page" => {"url" => "/self", "tags" => tags, "collection" => "posts"}},
      filters: [Jekyll::Filters], registers: {site: site}
    )
    ids = JSON.parse(Nokogiri::HTML.fragment(output).text.strip)
    expected = tags == %w[x y z] ? %w[best newer older other] : []
    raise "#{component}: expected #{expected}, got #{ids}" unless ids == expected
  end
end
puts "Related and random ranking checks passed."
