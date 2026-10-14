# Run from test: bundle exec ruby check_related_ranking.rb
require "jekyll"
require "jekyll-include-cache"
require "json"
require "nokogiri"
require "tmpdir"
require "fileutils"
require "yaml"

root = File.expand_path("..", __dir__)
site = Jekyll::Site.new(Jekyll.configuration("source" => root, "quiet" => true, "plugins" => [], "theme" => nil, "remote_theme" => nil))
documents = [
  {"id" => "self", "url" => "/self", "tags" => %w[x y z], "collection" => "posts"},
  {"id" => "best", "url" => "/best", "tags" => %w[x y z], "collection" => "posts", "date" => "2024-01-01"},
  {"id" => "older", "url" => "/older", "tags" => %w[x y], "collection" => "posts", "date" => "2024-01-01"},
  {"id" => "newer", "url" => "/newer", "tags" => %w[x y], "collection" => "posts", "date" => "2024-02-01"},
  {"id" => "below", "url" => "/below", "tags" => %w[x], "collection" => "posts", "date" => "2024-03-01"},
  {"id" => "other-below", "url" => "/other-below", "tags" => %w[x y], "collection" => "demo", "date" => "2025-01-01"},
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

# Equal-score/equal-date entries are sorted together once; their tie order is
# unspecified. Sampling must receive the entire eligible pool.
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
    raise "Related panel must select three distinct eligible entries" unless titles.size == 3 && titles.uniq.size == 3 && (titles - %w[a b c d]).empty?
    raise "Related panel should not sample" unless samples.empty?
  else
    raise "Random pool or sample size changed" unless samples.size == 1 && samples.first[0].sort == %w[a b c d] && samples.first[1] == 4
    raise "Random panel must select three distinct eligible entries" unless titles.size == 3 && titles.uniq.size == 3 && (titles - %w[a b c d]).empty?
  end
end
puts "Single-sort tie handling and full-pool random sampling checks passed."

# Empty and small pools must not create empty cards or lose eligible entries.
%w[related random].each do |component|
  [nil, [], %w[missing], %w[x y z]].each do |tags|
    [0, 1, 2].each do |count|
      documents = tied_documents.first(count)
      output = Liquid::Template.parse(File.read(File.join(root, "_includes/components/#{component}.html"))).render!(
        {"site" => {"documents" => documents}, "page" => {"url" => "/self", "tags" => tags, "collection" => "posts"}},
        filters: [Jekyll::Filters], registers: {site: site}
      )
      html = Nokogiri::HTML.fragment(output)
      titles = html.css(".card-title a").map { |link| link.text.strip }.sort
      expected = tags == %w[x y z] ? documents.map { |document| document["title"] }.sort : []
      raise "#{component}: small pool #{count}/#{tags.inspect}: #{titles.inspect}" unless titles == expected
      raise "Empty recommendations created a navigation region" unless html.css("nav").empty? == expected.empty?
    end
  end
end
puts "Empty tags, missing matches and zero/one/two-document recommendation pools passed."

# Exercise singleton sampling with Jekyll document drops, not just hashes.
[0, 1, 2].each do |count|
  Dir.mktmpdir("chulapa-recommendations-") do |source|
    %w[_includes _layouts].each { |dir| FileUtils.cp_r(File.join(root, dir), source) }
    File.write(File.join(source, "_layouts/default.html"), '{% include components/related.html %}{% include components/random.html %}')
    FileUtils.mkdir_p(File.join(source, "_entries"))
    data = {"layout" => "default", "tags" => %w[x y z], "date" => "2024-01-01"}
    File.write(File.join(source, "_entries/self.md"), "#{data.merge('title' => 'Self', 'permalink' => '/self.html').to_yaml}---\nSelf.")
    count.times do |index|
      File.write(File.join(source, "_entries/candidate#{index}.md"), "#{data.merge('title' => "Candidate #{index}").to_yaml}---\nCandidate.")
    end
    config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"), "theme" => nil, "remote_theme" => nil, "plugins" => ["jekyll-include-cache"], "collections" => {"entries" => {"output" => true}}, "quiet" => true)
    Jekyll::Site.new(config).process
    html = Nokogiri::HTML(File.read(File.join(config["destination"], "self.html")))
    panels = html.css("nav.card-group")
    raise "Wrong number of recommendation panels for #{count} candidates" unless panels.size == (count.zero? ? 0 : 2)
    panels.each do |panel|
      titles = panel.css(".card-title a").map { |link| link.text.strip }.sort
      raise "Real document recommendations lost entries or included self" unless titles == count.times.map { |index| "Candidate #{index}" }
      raise "Real document recommendation links are blank" unless panel.css(".card-title a").all? { |link| link["href"].include?("candidate") }
    end
  end
end
puts "Real Jekyll zero/one/two-candidate recommendations passed."

# A collection document without a front matter date receives Jekyll's build date.
# An explicit show_date: false must hide that fallback and explicit dates alike.
[nil, false, true].each do |visibility|
  [nil, "2024-01-01"].each do |date|
    Dir.mktmpdir("chulapa-card-dates-") do |source|
      %w[_includes _layouts].each { |dir| FileUtils.cp_r(File.join(root, dir), source) }
      File.write(File.join(source, "_layouts/default.html"), '{% include components/related.html %}{% include components/random.html %}')
      FileUtils.mkdir_p(File.join(source, "_entries"))
      data = {"layout" => "default", "tags" => %w[x y], "title" => "Self", "permalink" => "/self.html"}
      File.write(File.join(source, "_entries/self.md"), "#{data.to_yaml}---\nSelf.")
      candidate = {"title" => "Candidate", "tags" => %w[x y]}
      candidate["show_date"] = visibility unless visibility.nil?
      candidate["date"] = date unless date.nil?
      File.write(File.join(source, "_entries/candidate.md"), "#{candidate.to_yaml}---\nCandidate.")
      config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"), "theme" => nil, "remote_theme" => nil, "plugins" => ["jekyll-include-cache"], "collections" => {"entries" => {"output" => true}}, "quiet" => true)
      built_site = Jekyll::Site.new(config)
      built_site.process
      html = Nokogiri::HTML(File.read(File.join(source, "_site/self.html")))
      %w[related-articles random\ -articles].each do |label|
        panel = html.at_css("nav[aria-label='#{label}']")
        raise "Missing candidate panel" unless panel && panel.css(".card-title a").size == 1
        expected_footer = visibility == false ? 0 : 1
        # Jekyll 3 and 4 expose fallback dates differently to Liquid.
        expected_time = visibility == false ? 0 : (date.nil? ? nil : 1)
        raise "Incorrect card date for #{visibility.inspect}/#{date.inspect}" unless (expected_time.nil? || panel.css("time").size == expected_time) && panel.css(".card-footer").size == expected_footer
      end
    end
  end
end
puts "Related/random explicit and fallback dates respect show_date false; true/unset retain dates."
