# Run from test: bundle exec ruby check_related_ranking.rb
require "jekyll"
require "jekyll-include-cache"
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
  source = File.read(File.join(root, "_includes/components/recommendations.html"))
  ranking = source.split("  {%- if include.mode == 'random' -%}").first
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

module TrackRanking
  def sort(input, property = nil, nils = "first")
    @context.registers[:date_sorts] << input.size if property == "date"
    Jekyll::Filters.instance_method(:sort).bind(self).call(input, property, nils)
  end

  def sample(input, num = 1)
    @context.registers[:samples] << [input.map { |document| document["id"] }, num]
    Jekyll::Filters.instance_method(:sample).bind(self).call(input, num)
  end
end

# Equal-score/equal-date entries are sorted together once. Sampling must still
# receive the entire eligible pool, not just the first three ranked entries.
tied_documents = %w[a b c d].map do |id|
  {"id" => id, "url" => "/#{id}", "title" => id, "tags" => %w[x y z], "collection" => "posts", "date" => "2024-01-01"}
end
%w[related random].each do |component|
  sorts = []
  samples = []
  source = File.read(File.join(root, "_includes/components/#{component}.html"))
  srand(73)
  output = Liquid::Template.parse(source).render!(
    {"site" => {"documents" => tied_documents}, "page" => {"url" => "/self", "tags" => %w[x y z], "collection" => "posts"}},
    filters: [Jekyll::Filters, TrackRanking], registers: {site: site, date_sorts: sorts, samples: samples}
  )
  titles = Nokogiri::HTML.fragment(output).css(".card-title a").map { |link| link.text.strip }
  raise "Expected one date sort for the score group" unless sorts == [4]
  if component == "related"
    raise "Equal-date order changed unexpectedly" unless titles == %w[d c b]
    raise "Related panel should not sample" unless samples.empty?
  else
    raise "Random pool or sample size changed" unless samples == [[%w[d c b a], 4]]
    raise "Random panel must select three distinct eligible entries" unless titles.size == 3 && titles.uniq.size == 3 && (titles - %w[a b c d]).empty?
  end
end
puts "Single-sort tie handling and full-pool random sampling checks passed."
