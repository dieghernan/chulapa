# Run from the repository root: bundle exec ruby test/check_head_formatting.rb
require "jekyll"
require "jekyll-include-cache"
require "nokogiri"
require "json"
require "tmpdir"
require "fileutils"

root = File.expand_path("..", __dir__)
Dir.mktmpdir("chulapa-head-formatting-") do |source|
  %w[_includes _layouts].each { |dir| FileUtils.cp_r(File.join(root, dir), source) }
  standalone = Dir.glob(File.join(root, "docs/_pages/demo_*.html")).select { |path| File.read(path).include?("include head.html") }
  standalone << File.join(root, "docs/assets/widgets/music-scales.html")
  standalone.each { |path| FileUtils.cp(path, File.join(source, File.basename(path))) }
  FileUtils.mkdir_p(File.join(source, "_posts"))
  {"index.html" => {}, "search.html" => {"layout" => "search"}, "page.html" => {"breadcrumb_list" => [{"label" => "Docs", "url" => "/docs/"}], "mathjax" => true}, "guest.html" => {"author" => {"name" => 'Guest "name" </script>', "links" => [{"url" => "https://guest.example/"}, {"url" => "https://guest.example/social"}]}}}.each do |path, values|
    data = {"layout" => "minimal", "title" => "Page", "excerpt" => "Description"}.merge(values)
    File.write(File.join(source, path), data.to_yaml + "---\nContent")
  end
  File.write(File.join(source, "_posts/2024-01-01-post.md"), {"layout" => "default", "title" => "Post", "schema_image" => ["/one.png", "/two.png"]}.to_yaml + "---\nContent")
  config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"), "url" => "https://example.com", "quiet" => true, "title" => "Site", "gtag_id" => "G-TEST", "navbar" => {"style" => "dual"}, "author" => {"name" => "Alice", "avatar" => "/avatar.png", "links" => [{"url" => "https://example.com/"}, {"url" => "https://social.example/"}]}, "compress_html" => {"blanklines" => true, "clippings" => "all"})
  Jekyll::Site.new(config).process
  Dir.glob(File.join(config["destination"], "**/*.html")).each do |path|
    html = File.read(path)
    raise "Joined document opening: #{File.basename(path)}: #{html[0, 100].inspect}" unless html.match?(/<!doctype html>\n<html lang="en-US">\n\s*<head>/)
    head = html.split("<head>", 2).last.split("</head>", 2).first
    raise "Joined head tags" if head.match?(/>(?:<meta|<link|<script|<title)/)
    raise "Lost head indentation: #{head.lines.grep(/<meta|<link|<title/).reject { |line| line.start_with?("    ") }.inspect}" unless head.lines.grep(/<meta|<link|<title/).all? { |line| line.start_with?("    ") }
    document = Nokogiri::HTML(html)
    document.css("label[for]").each do |label|
      target = document.at_css("[id='#{label['for']}']")
      raise "Label has no form control: #{path}: #{label['for']}" unless target && %w[input select textarea button output meter progress].include?(target.name)
    end
    raise "Styles emitted outside head: #{path}" unless document.css("style").all? { |style| style.ancestors.any? { |node| node.name == "head" } }
    document.css('link[rel="stylesheet"]').each do |link|
      next unless link["href"].start_with?("/assets/css/search-")
      raise "Missing search stylesheet" unless File.file?(File.join(root, link["href"].delete_prefix("/")))
    end
    scripts = document.css('script[type="application/ld+json"]')
    scripts.each { |script| JSON.parse(script.text) }
    raise "Missing JSON-LD" if scripts.empty?
    raise "Lost analytics" unless html.include?("gtag('config', 'G-TEST')")
  end
  if ENV["HEAD_FORMATTING_OUTPUT"]
    FileUtils.mkdir_p(ENV["HEAD_FORMATTING_OUTPUT"])
    FileUtils.cp_r(Dir.glob(File.join(config["destination"], "*")), ENV["HEAD_FORMATTING_OUTPUT"])
  end
end
puts "Head formatting checks passed (home, page, guest, post, search and six standalone demos)."
