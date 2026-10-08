require "jekyll"
require "jekyll-include-cache"
require "tmpdir"
require "fileutils"
require "nokogiri"

root = File.expand_path("..", __dir__)
fixtures = {
  "unchanged" => [{}, 0],
  "disabled" => [{"show_header" => false}, 0],
  "empty-type" => [{"show_header" => true, "header_type" => ""}, 0],
  "none" => [{"show_header" => true, "header_type" => "none"}, 0],
  "invalid" => [{"show_header" => true, "header_type" => "unknown"}, 0],
  "custom" => [{"layout" => "custom", "show_header" => true}, 1],
  "own" => [{"layout" => "own", "show_header" => true}, 1],
  "default" => [{"layout" => "default", "show_header" => true}, 1],
  "landing" => [{"layout" => "landingpage", "show_header" => true}, 1],
  "derived" => [{"layout" => "derived", "show_header" => true}, 1],
  "default-disabled" => [{"layout" => "default", "show_header" => false}, 1],
  "default-none" => [{"layout" => "default", "show_header" => true, "header_type" => "none"}, 0]
}
%w[base hero splash image post].each do |type|
  fixtures[type] = [{"show_header" => true, "header_type" => type}, 1]
end
Dir.mktmpdir("chulapa-minimal-header-") do |source|
  %w[_layouts _includes].each { |dir| FileUtils.cp_r(File.join(root, dir), source) }
  File.write(File.join(source, "_layouts/custom.html"), "---\nlayout: minimal\n---\n{{ content }}")
  File.write(File.join(source, "_layouts/derived.html"), "---\nlayout: default\n---\n{{ content }}")
  File.write(File.join(source, "_layouts/own.html"), "---\nlayout: minimal\nheader_in_content: true\n---\n{% include components/headers.html headertype=page.header_type imghero=page.header_img projects=page.project_links %}{{ content }}")
  fixtures.each do |name, (values, _)|
    data = {"layout" => "minimal", "title" => "A header", "subtitle" => "A subtitle", "header_img" => "/header.jpg", "project_links" => [{"url" => "/project", "label" => "Project"}]}.merge(values)
    File.write(File.join(source, "#{name}.html"), data.to_yaml + "---\n<main id=\"wide\">Custom content</main>")
  end
  ["", "/subdir"].each do |baseurl|
    config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"), "url" => "https://example.com", "baseurl" => baseurl, "quiet" => true, "defaults" => [{"scope" => {"path" => ""}, "values" => {"header_type" => "hero"}}, {"scope" => {"path" => "disabled.html"}, "values" => {"show_header" => true}}])
    Jekyll::Site.new(config).process
    fixtures.each do |name, (_, expected)|
      doc = Nokogiri::HTML(File.read(File.join(config["destination"], "#{name}.html")))
      headers = doc.css("header")
      raise "Header count: #{name}, #{baseurl}" unless headers.size == expected
      raise "Content missing: #{name}" unless doc.at_css("#wide").text == "Custom content"
      next if expected.zero?
      header = headers.first
      raise "Title missing: #{name}" unless header.at_css("h1").text == "A header"
      raise "Subtitle missing: #{name}" unless header.at_css(".chulapa-subtitle").text == "A subtitle"
      raise "Project URL: #{name}" unless header.at_css("a")["href"] == "https://example.com#{baseurl}/project"
      raise "Image URL: #{name}" unless header.to_html.include?("https://example.com#{baseurl}/header.jpg")
      raise "Content position: #{name}" unless doc.to_html.index("<header") < doc.to_html.index('id="wide"')
    end
    landing = Nokogiri::HTML(File.read(File.join(config["destination"], "landing.html")))
    raise "Landing background lost" unless landing.at_css(".chulapa-bg-landingpage header")
  end
end
puts "Minimal header checks passed (17 fixtures, root and subdirectory URLs)."
