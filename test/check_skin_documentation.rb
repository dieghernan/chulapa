# Shared catalog guidance must produce valid, copyable activation examples.
require "jekyll"
require "nokogiri"
require "tmpdir"
require "fileutils"
require "yaml"

root = File.expand_path("..", __dir__)
Dir.mktmpdir("chulapa-skin-docs-") do |source|
  FileUtils.cp_r(File.join(root, "_includes"), source)
  FileUtils.cp_r(File.join(root, "docs/_includes/skins"), File.join(source, "_includes"))
  FileUtils.mkdir_p(File.join(source, "_layouts"))
  File.write(File.join(source, "_layouts/default.html"), '<!doctype html><html lang="en"><title>{{ page.title | strip_html }}</title><main>{{ content }}</main></html>')
  FileUtils.mkdir_p(File.join(source, "skins"))
  Dir.glob(File.join(root, "docs/collections/_skins/*.md")).each do |file|
    FileUtils.cp(file, File.join(source, "skins"))
  end
  config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"),
    "url" => "https://example.com", "baseurl" => "/chulapa", "quiet" => true, "plugins" => [],
    "kramdown" => {"input" => "GFM"})
  Jekyll::Site.new(config).process
  Dir.glob(File.join(source, "skins/*.md")).each do |file|
    skin = File.basename(file, ".md")
    html = Nokogiri::HTML(File.read(File.join(config["destination"], "skins", "#{skin}.html")))
    raise "Unrendered include #{skin}" if html.text.include?("{% include")
    snippets = html.css(".language-yaml code, code.language-yaml")
    if skin == "current"
      raise "Current site must not suggest activation" unless snippets.empty?
    else
      raise "Exactly one activation example #{skin}" unless snippets.size == 1
      yaml = YAML.safe_load(snippets.first.text)
      raise "Wrong activation value #{skin}: #{yaml}" unless yaml == {"chulapa-skin" => {"skin" => skin}}
      %w[use-this-skin customize-and-check].each do |id|
        raise "Missing heading #{skin}/#{id}" unless html.at_css("h2##{id}")
      end
      raise "Missing autothemer guide #{skin}" unless html.at_css('a[href="/chulapa/docs/27-autothemer"]')
    end
    raise "Missing shared demo #{skin}" unless html.css("button.btn").size > 10
    if ARGV.first
      target = File.join(ARGV.first, "#{skin}.html")
      FileUtils.mkdir_p(File.dirname(target))
      FileUtils.cp(File.join(config["destination"], "skins", "#{skin}.html"), target)
    end
  end
end
puts "Skin documentation: all activation examples, current-site demo, shared sections and baseurl links passed."
