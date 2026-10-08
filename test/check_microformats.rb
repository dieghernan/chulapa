# Run from the repository root: bundle exec ruby test/check_microformats.rb
# Set MICROFORMATS_OUTPUT to retain generated pages for external validation.
require "jekyll"
require "jekyll-include-cache"
require "nokogiri"
require "tmpdir"
require "fileutils"

def check(condition, message)
  raise message unless condition
end

root = File.expand_path("..", __dir__)
fixtures = {
  "published" => {},
  "updated" => {"last_modified_at" => "2025-01-01"},
  "landing" => {"layout" => "landingpage", "last_modified_at" => "2025-01-01"},
  "guest" => {"author" => {"name" => "Guest", "url" => "/guest/"}},
  "guest-no-url" => {"author" => {"name" => "Guest"}},
  "absolute-profile" => {"author" => {"name" => "Guest", "url" => "https://guest.example/about/?a=1&b=2"}},
  "no-author" => {"show_author" => false},
  "no-date" => {"show_date" => false},
  "minimal" => {"layout" => "minimal"},
  "minimal-header" => {"layout" => "minimal", "show_header" => true},
  "custom" => {"layout" => "custom"},
  "derived" => {"layout" => "derived"},
  "own-entry" => {"layout" => "minimal"}
}

Dir.mktmpdir("chulapa-microformats-") do |source|
  %w[_layouts _includes].each { |dir| FileUtils.cp_r(File.join(root, dir), source) }
  File.write(File.join(source, "_layouts/custom.html"), "---\nlayout: minimal\n---\n{{ content }}")
  File.write(File.join(source, "_layouts/derived.html"), "---\nlayout: default\n---\n{{ content }}")
  fixtures.each do |name, values|
    data = {"layout" => "default", "title" => "Real title", "date" => "2024-01-01", "header_type" => "base", "show_author" => true, "show_date" => true}.merge(values)
    content = "<p>Real content</p>"
    if name == "own-entry"
      content = '<article class="h-entry"><h1 class="p-name">Custom title</h1><a class="u-url" href="https://example.com/custom/">Permalink</a><div class="e-content"><p>Custom content</p></div></article>'
    end
    File.write(File.join(source, "#{name}.html"), data.to_yaml + "---\n#{content}")
  end
  ["", "/subdir"].each do |baseurl|
    config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"), "url" => "https://example.com", "baseurl" => baseurl, "title" => "Site", "quiet" => true, "author" => {"name" => "Alice", "url" => "/about/"})
    Jekyll::Site.new(config).process
    fixtures.each do |name, values|
      doc = Nokogiri::HTML(File.read(File.join(config["destination"], "#{name}.html")))
      if %w[minimal minimal-header custom].include?(name)
        check(doc.css(".h-entry").empty?, "Automatic entry on unrestricted layout: #{name}")
        check(doc.css(".u-url").empty?, "Orphan entry URL: #{name}")
        check(doc.text.include?("Real content"), "Content lost: #{name}")
        next
      end
      check(doc.css(".h-entry").size == 1, "Entry count: #{name}")
      check(doc.css(".h-entry footer, .h-entry nav[aria-label='primary-navigation']").empty?, "Site chrome inside entry: #{name}")
      if name == "own-entry"
        check(doc.at_css(".h-entry .p-name").text == "Custom title", "Custom entry title lost")
        check(doc.at_css(".e-content").text == "Custom content", "Custom content lost")
        next
      end
      check(doc.at_css(".h-entry > .u-url")["href"] == "https://example.com#{baseurl}/#{name}.html", "Entry URL: #{name}")
      check(doc.at_css("header .p-name").text == "Real title", "Entry title: #{name}")
      check(doc.at_css(".e-content").text.strip == "Real content", "Entry content: #{name}")
      if values["show_date"] == false
        check(doc.css(".dt-published, .dt-updated").empty?, "Hidden dates: #{name}")
      else
        check(doc.at_css("time.dt-published")["datetime"].start_with?("2024-01-01T"), "Publication date: #{name}")
        if values["last_modified_at"]
          check(doc.at_css("time.dt-updated")["datetime"].start_with?("2025-01-01T"), "Update date: #{name}")
          check(doc.at_css("time.dt-published")["class"].include?("chulapa-text-line-through"), "Date styling lost: #{name}")
        end
      end
      card = doc.at_css(".h-card.p-author")
      if values["show_author"] == false
        check(card.nil?, "Hidden author: #{name}")
        next
      end
      expected_name = values.dig("author", "name") || "Alice"
      check(card.at_css(".p-name").text.strip == expected_name, "Author name: #{name}")
      urls = card.css(".u-url").map { |node| node["href"] }
      expected_url = case name
      when "guest-no-url" then nil
      when "absolute-profile" then "https://guest.example/about/?a=1&b=2"
      when "guest" then "https://example.com#{baseurl}/guest/"
      else "https://example.com#{baseurl}/about/"
      end
      check(urls == Array(expected_url), "Author URLs: #{name}: #{urls.inspect}")
    end
    if ENV["MICROFORMATS_OUTPUT"]
      target = File.join(ENV["MICROFORMATS_OUTPUT"], baseurl.empty? ? "root" : "subdir")
      FileUtils.mkdir_p(target)
      FileUtils.cp(Dir.glob(File.join(config["destination"], "*.html")), target)
    end
  end
end
puts "Microformats checks passed (13 fixtures, root and subdirectory URLs)."
