# Run from test: bundle exec ruby check_cloud_performance.rb
require "jekyll"
require "jekyll-include-cache"
require "nokogiri"

module CountWords
  def number_of_words(input)
    @context.registers[:word_counts] << input
    input.split.size
  end
end

root = File.expand_path("..", __dir__)
site = Jekyll::Site.new(Jekyll.configuration("source" => root, "quiet" => true, "plugins" => [], "theme" => nil, "remote_theme" => nil))
%w[cloudtag cloudcategory].each do |layout|
  field = layout == "cloudtag" ? "tags" : "categories"
  documents = [
    {"url" => "/long", "title" => "Long", "collection" => "posts", "date" => "2024-01-01", field => %w[alpha beta], "content" => "word " * 401},
    {"url" => "/short", "title" => "Short", "collection" => "posts", "date" => "2024-02-01", field => %w[beta], "content" => "short"},
    {"url" => "/other", "title" => "Other", "collection" => "demo", "date" => "2024-03-01", field => %w[alpha], "content" => "other"},
    {"url" => "/untagged", "title" => "Untagged", "collection" => "posts", "date" => "2024-04-01", field => [], "content" => "unused"}
  ]
  source = File.read(File.join(root, "_layouts/#{layout}.html")).sub(/\A---.*?---\s*/m, "")
  [
    [nil, %w[alpha beta], %w[2 2], 3, %w[Short Long]],
    ["posts", %w[beta alpha], %w[2 1], 2, %w[Short Long]],
    ["demo,posts", %w[alpha beta], %w[2 2], 3, %w[Short Long]],
    ["posts,posts", %w[beta alpha], %w[4 2], 2, %w[Short Short Long Long]],
    ["missing", [], [], 0, []]
  ].each do |collection, expected, counts, word_calls, beta_titles|
    JekyllIncludeCache.reset
    calls = []
    html = Liquid::Template.parse(source).render!(
      {"site" => {"documents" => documents, "url" => "https://example.com", "words_per_minute" => 200}, "page" => {"include_collection" => collection}},
      filters: [Jekyll::Filters, CountWords], registers: {site: site, word_counts: calls}
    )
    doc = Nokogiri::HTML(html)
    sections = doc.css("section")
    raise "Wrong order: #{layout}" unless sections.map { |s| s["id"] } == expected
    raise "Wrong counts: #{layout}" unless sections.map { |s| s.at_css(".d-flex .badge").text.strip } == counts
    raise "Unexpected word counting: #{layout}" unless calls.size == word_calls
    raise "Unused content counted" if calls.include?("unused")
    raise "Missing reading time" unless sections.empty? || sections.map(&:text).join.include?("2’")
    beta = sections.find { |section| section["id"] == "beta" }
    raise "Wrong article order" unless (beta ? beta.css(".h6 a").map(&:text) : []) == beta_titles
    badges = doc.css(".p-category")
    hide_badges = %w[posts missing].include?(collection)
    raise "Collection badge visibility changed" unless badges.empty? == hide_badges
  end
end
puts "Cloud ordering, counts, reading time and collection checks passed."
