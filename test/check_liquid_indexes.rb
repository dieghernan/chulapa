# Build real collections and static files through Jekyll, not synthetic hashes.
require "jekyll"
require "jekyll-include-cache"
require "nokogiri"
require "tmpdir"
require "fileutils"
require "yaml"

root = File.expand_path("..", __dir__)
Dir.mktmpdir("chulapa-indexes-") do |source|
  %w[_includes _layouts].each { |dir| FileUtils.cp_r(File.join(root, dir), source) }
  File.write(File.join(source, "_layouts/default.html"), "<!doctype html><html lang='en'><body>{{ content }}</body></html>")
  FileUtils.mkdir_p(File.join(source, "_entries"))
  FileUtils.mkdir_p(File.join(source, "_other"))
  # File order, title order, dates and numeric ranks deliberately disagree.
  entries = (1..12).map do |i|
    {"title" => "Entry #{format('%02d', 13 - i)}", "date" => "2024-01-#{format('%02d', (i * 5) % 13)}", "rank" => (i * 7) % 13, "tags" => [i.even? ? "even" : "odd"], "categories" => [i.even? ? "even" : "odd"]}
  end
  entries.each_with_index do |data, index|
    File.write(File.join(source, "_entries/#{format('%02d', index)}.md"), "#{data.to_yaml}---\nSummary #{index}.")
  end
  File.write(File.join(source, "_other/other.md"), "---\ntitle: Other\nrank: 0\n---\nOther collection.")
  cases = []
  %w[title date rank path].each do |field|
    [true, false].each do |ascending|
      cases << ["#{field}-#{ascending}", {"index_sort" => field, "index_sort_asc" => ascending, "index_items" => 100}, field, ascending, 12]
    end
  end
  cases << ["default-limit", {"index_sort" => "rank"}, "rank", false, 10]
  cases << ["explicit-limit", {"index_sort" => "rank", "index_sort_asc" => true, "index_items" => 2}, "rank", true, 2]
  cases << ["zero-limit", {"index_sort" => "rank", "index_items" => 0}, "rank", false, 0]
  cases.each do |name, settings, *_|
    data = {"layout" => "indexcategory", "include_collection" => "entries"}.merge(settings)
    File.write(File.join(source, "#{name}.html"), "#{data.to_yaml}---\n")
  end
  File.write(File.join(source, "empty.html"), "---\nlayout: indexcategory\ninclude_collection: missing\n---\n")
  File.write(File.join(source, "mixed.html"), "---\nlayout: indexcategory\ninclude_collection: other,entries\nindex_sort: rank\nindex_sort_asc: true\nindex_items: 100\n---\n")
  %w[archive cloudtag cloudcategory].each do |layout|
    ["entries", "entries,entries", "missing"].each_with_index do |collection, index|
      File.write(File.join(source, "#{layout}-#{index}.html"), "---\nlayout: #{layout}\ninclude_collection: #{collection}\n---\n")
    end
  end

  FileUtils.mkdir_p(File.join(source, "assets/gallery"))
  FileUtils.mkdir_p(File.join(source, "assets/other"))
  %w[c a b].each_with_index do |name, index|
    path = File.join(source, "assets/gallery/#{name}.svg")
    File.write(path, '<svg xmlns="http://www.w3.org/2000/svg"></svg>')
    File.utime(Time.at(1_700_000_000 + index * 60), Time.at(1_700_000_000 + index * 60), path)
  end
  File.write(File.join(source, "assets/other/excluded.svg"), "<svg/>")
  gallery_cases = [
    ["index_sort='basename' index_sort_asc=true", %w[a b c]],
    ["index_sort='basename' index_sort_asc=false", %w[c b a]],
    ["index_sort_asc=true", %w[c a b]],
    ["", %w[b a c]],
    ["index_sort='basename' index_sort_asc=true index_items=2", %w[a b]],
    ["index_items=0", []]
  ]
  %w[masonry carousel].each do |snippet|
    body = gallery_cases.map { |args, _| "<section>{% include_cached snippets/#{snippet}.html internal='gallery' random=false #{args} %}</section>" }.join
    body += "<section>{% include_cached snippets/#{snippet}.html internal='gallery' random=true index_items=2 %}</section>"
    body += "<section>{% include_cached snippets/#{snippet}.html internal='missing' %}</section>"
    File.write(File.join(source, "#{snippet}.html"), "---\nlayout: default\n---\n#{body}")
  end

  ["", "/preview"].each do |baseurl|
    config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"), "quiet" => true, "plugins" => [], "theme" => nil, "remote_theme" => nil, "url" => "https://example.com", "baseurl" => baseurl, "collections" => {"entries" => {"output" => true}, "other" => {"output" => true}}, "defaults" => [{"scope" => {"path" => "assets/gallery"}, "values" => {"image_col" => "gallery"}}])
    site = Jekyll::Site.new(config)
    site.process
    output = ->(name) { Nokogiri::HTML(File.read(File.join(config["destination"], "#{name}.html"))) }
    urls = ->(documents) { documents.map { |document| "https://example.com#{baseurl}#{document.url}" } }
    cases.each do |name, _, field, ascending, limit|
      sorted = site.collections["entries"].docs.sort_by { |document| field == "path" ? document.path : document.data.fetch(field) }
      sorted.reverse! unless ascending
      actual = output.call(name).css(".card-body a.u-url").map { |link| link["href"] }
      raise "#{name} (#{baseurl}): wrong cards #{actual}" unless actual == urls.call(sorted.first(limit))
    end
    raise "Missing collection produces cards" unless output.call("empty").css(".card-title").empty?
    mixed = (site.collections["entries"].docs + site.collections["other"].docs).sort_by { |document| document.data["rank"] }
    raise "Collection selection or cross-collection sorting failed" unless output.call("mixed").css(".card-body a.u-url").map { |link| link["href"] } == urls.call(mixed)
    by_date = site.collections["entries"].docs.sort_by(&:date).reverse
    [1, 2].each_with_index do |copies, index|
      archive = output.call("archive-#{index}").css(".h-entry .u-url").map { |link| link["href"] }
      expected_archive = urls.call(by_date.flat_map { |document| [document] * copies })
      raise "Archive date order or duplicates changed" unless archive == expected_archive
      %w[cloudtag cloudcategory].each do |layout|
        sections = output.call("#{layout}-#{index}").css("section.chulapa-#{layout}")
        raise "Cloud groups missing: #{layout}" unless sections.map { |section| section["id"] }.sort == %w[even odd]
        sections.each do |section|
          group = section["id"]
          expected_documents = by_date.select { |document| document.data["tags"].include?(group) }.flat_map { |document| [document] * copies }
          actual = section.css(".h-entry .u-url").map { |link| link["href"] }
          raise "Cloud article order changed: #{layout}/#{group}" unless actual == urls.call(expected_documents)
          raise "Cloud counts changed" unless section.at_css(".d-flex .badge").text.strip == (6 * copies).to_s
        end
      end
    end
    %w[archive cloudtag cloudcategory].each do |layout|
      raise "Missing collection rendered entries: #{layout}" unless output.call("#{layout}-2").css(".h-entry").empty?
    end
    %w[masonry carousel].each do |snippet|
      sections = output.call(snippet).css("section")
      gallery_cases.each_with_index do |(_, expected), index|
        actual = sections[index].css("img").map { |image| image["src"] }
        expected_urls = expected.map { |name| "https://example.com#{baseurl}/assets/gallery/#{name}.svg" }
        raise "#{snippet} case #{index}: #{actual}" unless actual == expected_urls
      end
      random = sections[-2].css("img").map { |image| File.basename(image["src"], ".svg") }
      raise "#{snippet}: invalid random selection" unless random.size == 2 && random.uniq.size == 2 && (random - %w[a b c]).empty?
      raise "#{snippet}: missing gallery produces images" unless sections[-1].css("img").empty?
    end
  end
end
puts "Real Jekyll indexes and galleries passed: sort fields, limits, collection selection, cached variants and root/subdirectory URLs."
