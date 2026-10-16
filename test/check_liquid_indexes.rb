# Build real collections and static files through Jekyll, not synthetic hashes.
require "jekyll"
require "jekyll-include-cache"
require "nokogiri"
require "tmpdir"
require "fileutils"
require "yaml"

# Record real sampling calls without fixing the random draw itself.
module TrackGallerySampling
  def sample(input, num = 1)
    Thread.current[:gallery_samples] << [input.sort, num]
    super
  end
end
Jekyll::Filters.prepend(TrackGallerySampling)

root = File.expand_path("..", __dir__)
Dir.mktmpdir("chulapa-indexes-") do |source|
  %w[_includes _layouts].each { |dir| FileUtils.cp_r(File.join(root, dir), source) }
  File.write(File.join(source, "_layouts/default.html"), "<!doctype html><html lang='en'><body>{% if page.show_sidetoc %}{% include components/sidetoc.html %}{% endif %}{{ content }}</body></html>")
  FileUtils.mkdir_p(File.join(source, "_entries"))
  FileUtils.mkdir_p(File.join(source, "_other"))
  # File order, title order, dates and numeric ranks deliberately disagree.
  entries = (1..12).map do |i|
    {"title" => "Entry #{format('%02d', 13 - i)}", "date" => "2024-01-#{format('%02d', (i * 5) % 13)}", "rank" => (i * 7) % 13, "tags" => [i.even? ? "even" : "odd"], "categories" => i % 3 == 0 ? %w[guides shared] : %w[news]}
  end
  # Exercise exact names, embedded "demo", spaces and the former rewrite collision.
  fragment_names = ["demo", "demonstration", "demo topic", "dmo"]
  entries.first["tags"] += fragment_names
  entries.first["categories"] += fragment_names
  File.write(File.join(source, "badges.html"), {"layout" => "default", "tags" => fragment_names,
    "categories" => fragment_names, "cloudtag_url" => "/cloudtag-0.html",
    "cloudcategory_url" => "/cloudcategory-0.html"}.to_yaml +
    "---\n{% include components/tags.html %}{% include components/categories.html %}")
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
  cases << ["inherited-defaults", {}, "title", true, 3]
  cases << ["override-defaults", {"index_sort_asc" => false, "index_items" => 2}, "title", false, 2]
  cases.each do |name, settings, *_|
    data = {"layout" => "indexcategory", "include_collection" => "entries"}.merge(settings)
    File.write(File.join(source, "#{name}.html"), "#{data.to_yaml}---\n")
  end
  File.write(File.join(source, "empty.html"), "---\nlayout: indexcategory\ninclude_collection: missing\n---\n")
  File.write(File.join(source, "mixed.html"), "---\nlayout: indexcategory\ninclude_collection: other,entries\nindex_sort: rank\nindex_sort_asc: true\nindex_items: 100\n---\n")
  %w[archive cloudtag cloudcategory].each do |layout|
    ["entries", "entries,entries", "missing"].each_with_index do |collection, index|
      File.write(File.join(source, "#{layout}-#{index}.html"), "---\nlayout: #{layout}\ninclude_collection: #{collection}\nshow_sidetoc: true\n---\n")
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
    body = gallery_cases.map { |args, _| "<section class='gallery-case'>{% include_cached snippets/#{snippet}.html internal='gallery' random=false #{args} %}</section>" }.join
    body += "<section class='gallery-case'>{% include_cached snippets/#{snippet}.html internal='gallery' random=true index_items=2 %}</section>"
    body += "<section class='gallery-case'>{% include_cached snippets/#{snippet}.html internal='missing' %}</section>"
    if snippet == "carousel"
      body += "<section class='carousel-options'>{% include_cached snippets/carousel.html internal='gallery' index_sort='basename' index_sort_asc=true indicators=true controls=true interval=1234 index_items=2 %}</section>"
    end
    File.write(File.join(source, "#{snippet}.html"), "---\nlayout: default\n---\n#{body}")
  end

  ["", "/preview"].each do |baseurl|
    defaults = [{"scope" => {"path" => "assets/gallery"}, "values" => {"image_col" => "gallery"}}]
    %w[inherited-defaults override-defaults].each do |name|
      defaults << {"scope" => {"path" => "#{name}.html"}, "values" => {"index_sort" => "title", "index_sort_asc" => true, "index_items" => 3}}
    end
    config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"), "quiet" => true, "plugins" => [], "theme" => nil, "remote_theme" => nil, "url" => "https://example.com", "baseurl" => baseurl, "collections" => {"entries" => {"output" => true}, "other" => {"output" => true}}, "defaults" => defaults)
    site = Jekyll::Site.new(config)
    Thread.current[:gallery_samples] = []
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
    %w[cloudtag cloudcategory].each do |layout|
      cloud = output.call("#{layout}-0")
      raise "Sidebar trigger missing" unless cloud.at_css('button#chulapa-sidetoc-toggle[aria-controls="sideBar"]')
      fragment_names.each do |name|
        badge = output.call("badges").css('a[rel="tag"]').find do |link|
          link.text == name && link["href"].include?("/#{layout}-0.html#")
        end
        raise "Missing #{layout} badge for #{name}" unless badge
        fragment = badge["href"].split("#").last
        groups = cloud.css('section[id]').select { |section| section['id'] == fragment }
        raise "#{layout} badge must reach exactly one group: #{badge['href']}" unless groups.size == 1
        raise "#{layout} duplicate fragment ID" unless cloud.css('[id]').count { |node| node['id'] == fragment } == 1
        raise "#{layout} badge reaches wrong group" unless groups.first.at_css('h2').text.strip == name
        raise "#{layout} cloud button missing for #{name}" unless cloud.css('a[role="button"]').any? { |a| a['href'] == "##{fragment}" }
      end
    end
    by_date = site.collections["entries"].docs.sort_by(&:date).reverse
    [1, 2].each_with_index do |copies, index|
      archive = output.call("archive-#{index}").css(".h-entry .u-url").map { |link| link["href"] }
      expected_archive = urls.call(by_date.flat_map { |document| [document] * copies })
      raise "Archive date order or duplicates changed" unless archive == expected_archive
      %w[cloudtag cloudcategory].each do |layout|
        field = layout == "cloudtag" ? "tags" : "categories"
        sections = output.call("#{layout}-#{index}").css("section.chulapa-#{layout}")
        expected_groups = by_date.flat_map { |document| document.data.fetch(field) }.uniq
        expected_groups = expected_groups.sort_by { |group| -by_date.count { |document| document.data.fetch(field).include?(group) } }
        raise "Cloud groups missing or misordered: #{layout}" unless sections.map { |section| section["id"] } == expected_groups.map { |group| group.tr(" ", "-") }
        sections.each do |section|
          group = section.at_css("h2").text.strip
          expected_documents = by_date.select { |document| document.data.fetch(field).include?(group) }.flat_map { |document| [document] * copies }
          actual = section.css(".h-entry .u-url").map { |link| link["href"] }
          raise "Cloud article order changed: #{layout}/#{group}" unless actual == urls.call(expected_documents)
          raise "Cloud counts changed: #{layout}/#{group}" unless section.at_css(".d-flex .badge").text.strip == expected_documents.size.to_s
        end
      end
    end
    %w[archive cloudtag cloudcategory].each do |layout|
      raise "Missing collection rendered entries: #{layout}" unless output.call("#{layout}-2").css(".h-entry").empty?
    end
    %w[masonry carousel].each do |snippet|
      document = output.call(snippet)
      sections = document.css("section.gallery-case")
      gallery_cases.each_with_index do |(_, expected), index|
        actual = sections[index].css("img").map { |image| image["src"] }
        expected_urls = expected.map { |name| "https://example.com#{baseurl}/assets/gallery/#{name}.svg" }
        raise "#{snippet} case #{index}: #{actual}" unless actual == expected_urls
      end
      random = sections[-2].css("img").map { |image| File.basename(image["src"], ".svg") }
      raise "#{snippet}: invalid random selection" unless random.size == 2 && random.uniq.size == 2 && (random - %w[a b c]).empty?
      raise "#{snippet}: missing gallery produces images" unless sections[-1].css("img").empty?
      if snippet == "carousel"
        raise "Carousel options unexpectedly enabled by default" unless sections.css(".carousel-indicators, .carousel-control-prev, .carousel-control-next").empty?
        carousel = document.at_css(".carousel-options .carousel")
        raise "Uncontrolled automatic ride enabled" if carousel.key?("data-ride")
        raise "Pause control missing" unless carousel.at_css("button.chulapa-carousel-toggle[type=button][hidden]")
        raise "Carousel interval ignored" unless carousel["data-interval"] == "1234"
        slides = carousel.css(".carousel-item")
        indicators = carousel.css(".carousel-indicators button")
        raise "Carousel indicators do not match limited slides" unless slides.size == 2 && indicators.map { |indicator| indicator["data-slide-to"] } == %w[0 1]
        raise "Carousel active slide mismatch" unless slides.select { |slide| slide["class"].split.include?("active") } == [slides.first] && indicators.select { |indicator| indicator["aria-current"] == "true" } == [indicators.first]
        raise "Carousel indicator targets broken" unless indicators.all? { |indicator| indicator["data-target"] == "##{carousel['id']}" }
        controls = carousel.css(".carousel-control-prev, .carousel-control-next")
        raise "Carousel controls broken" unless controls.size == 2 && controls.all? { |control| control.name == "button" && control["type"] == "button" && control["data-target"] == "##{carousel['id']}" }
      end
    end
    expected_sample = [%w[/assets/gallery/a.svg /assets/gallery/b.svg /assets/gallery/c.svg], 3]
    raise "Gallery random option ignored or sampled a truncated pool" unless Thread.current[:gallery_samples] == [expected_sample, expected_sample]
  end
end
puts "Real Jekyll indexes and galleries passed: sort fields, limits, collection selection, cached variants and root/subdirectory URLs."
