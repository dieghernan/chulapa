# Run from the repository root: bundle exec ruby test/check_video_examples.rb
require "jekyll"
require "jekyll-include-cache"
require "nokogiri"
require "tmpdir"
require "fileutils"

root = File.expand_path("..", __dir__)
docs = File.read(File.join(root, "docs/collections/_docs/04_layouts.md"))
section = docs.split("### Video support", 2).last.split("### Localization", 2).first
Dir.mktmpdir("chulapa-video-examples-") do |source|
  FileUtils.cp_r(File.join(root, "_includes"), source)
  File.write(File.join(source, "index.md"), "---\n---\n#{section}")
  ["", "/subdir"].each do |baseurl|
    config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"), "url" => "https://example.com", "baseurl" => baseurl, "quiet" => true)
    Jekyll::Site.new(config).process
    doc = Nokogiri::HTML(File.read(File.join(config["destination"], "index.html")))
    videos = doc.css('[itemscope][itemtype="https://schema.org/VideoObject"]')
    raise "Expected five rendered video examples" unless videos.size == 5
    videos.each do |video|
      %w[name thumbnailUrl uploadDate description duration].each do |field|
        node = video.at_css("[itemprop='#{field}']")
        value = node && (node["content"] || node["href"])
        raise "Missing #{field} in video example" if value.nil? || value.empty?
      end
    end
    if ENV["CHULAPA_VIDEO_VALIDATION_OUTPUT"] && baseurl == "/subdir"
      markup = videos.map do |video|
        '<div itemscope itemtype="https://schema.org/VideoObject">' + video.css('[itemprop]').map(&:to_html).join + '</div>'
      end.join
      File.write(ENV["CHULAPA_VIDEO_VALIDATION_OUTPUT"], '<!doctype html><html><head><title>Chulapa video metadata validation</title></head><body>' + markup + '</body></html>')
    end
    local = videos.find { |video| video.at_css('[itemprop="contentUrl"]')&.[]("href")&.end_with?("/assets/mp4/sample.mp4") }
    raise "Local video URL lost baseurl" unless local.at_css('[itemprop="contentUrl"]')["href"] == "https://example.com#{baseurl}/assets/mp4/sample.mp4"
    raise "Local thumbnail URL lost baseurl" unless local.at_css('[itemprop="thumbnailUrl"]')["href"] == "https://example.com#{baseurl}/assets/mp4/sample-thumbnail.jpg"
    raise "Missing local thumbnail" unless File.exist?(File.join(root, "docs/assets/mp4/sample-thumbnail.jpg"))
  end
end
puts "Video documentation examples passed."
