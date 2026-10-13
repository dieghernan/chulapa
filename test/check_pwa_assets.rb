# Check the published docs manifest and icon assets, without claiming offline support.
require "jekyll"
require "jekyll-include-cache"
require "nokogiri"
require "json"
require "uri"
require "tmpdir"
require "fileutils"
require "date"

root = File.expand_path("..", __dir__)
docs_config = YAML.safe_load(File.read(File.join(root, "docs/_config.yml")), permitted_classes: [Date, Time], aliases: true)
site_url = docs_config.fetch("url").delete_suffix("/")
baseurl = docs_config.fetch("baseurl", "").delete_suffix("/")
site_uri = URI(site_url)
raise "Docs manifest requires configured HTTPS" unless site_uri.scheme == "https"

Dir.mktmpdir("chulapa-pwa-") do |source|
  %w[_includes _layouts].each { |directory| FileUtils.cp_r(File.join(root, directory), source) }
  FileUtils.cp(File.join(root, "docs/_includes/custom/custom_head.html"), File.join(source, "_includes/custom/custom_head.html"))
  FileUtils.mkdir_p(File.join(source, "assets"))
  FileUtils.cp_r(File.join(root, "docs/assets/favicons"), File.join(source, "assets"))
  File.write(File.join(source, "index.html"), "---\nlayout: minimal\ntitle: PWA fixture\n---\n<main><h1>PWA fixture</h1></main>")
  config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"), "url" => site_url, "baseurl" => baseurl, "quiet" => true)
  Dir.chdir(source) { Jekyll::Site.new(config).process }
  document = Nokogiri::HTML5(File.read(File.join(config["destination"], "index.html")))
  links = document.css('link[rel="manifest"]')
  raise "Expected one docs manifest" unless links.size == 1
  manifest_uri = URI.join("#{site_url}#{baseurl}/", links.first["href"])
  local_file = lambda do |uri|
    raise "Manifest asset leaves the configured origin" unless [uri.scheme, uri.host, uri.port] == [site_uri.scheme, site_uri.host, site_uri.port]
    raise "Manifest asset loses baseurl" unless uri.path.start_with?("#{baseurl}/")
    path = File.join(config["destination"], URI::DEFAULT_PARSER.unescape(uri.path.delete_prefix("#{baseurl}/")))
    raise "Missing published manifest asset: #{uri.path}" unless File.file?(path)
    path
  end
  manifest = JSON.parse(File.read(local_file.call(manifest_uri)))
  %w[name short_name].each do |field|
    raise "Missing manifest #{field}" unless manifest[field].is_a?(String) && !manifest[field].strip.empty?
  end
  raise "Invalid display mode" unless %w[fullscreen standalone minimal-ui browser].include?(manifest["display"])
  icons = manifest.fetch("icons")
  raise "No manifest icons" if icons.empty?
  icons.each do |icon|
    uri = URI.join(manifest_uri.to_s, icon.fetch("src"))
    data = File.binread(local_file.call(uri))
    raise "Incorrect PNG icon type" unless icon["type"] == "image/png" && data.start_with?("\x89PNG\r\n\x1a\n".b)
    width, height = data.byteslice(16, 8).unpack("NN")
    raise "Declared icon dimensions do not match the PNG" unless icon.fetch("sizes").split.include?("#{width}x#{height}")
  end
  raise "Missing generated theme color" unless document.at_css('meta[name="theme-color"]')
end
puts "Docs manifest, HTTPS/baseurl URLs and actual PNG icon dimensions passed (installability/offline support not established)."
