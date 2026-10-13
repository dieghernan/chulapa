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
  names = {"missing" => "", "empty" => "name=''", "false" => "name=false", "spaces" => "name='   '", "captured" => "name=blank_name", "padded" => "name='  Camera & tour  '", "quotes" => %q{name='Camera "tour"'}}
  providers = {"local" => "fileurl='/movie.mp4'", "youtube" => "provider='youtube' id='example' nolazy=true", "deferred" => "provider='youtube' id='example'", "direct" => "id='example'", "vimeo" => "provider='vimeo' id='example'", "drive" => "provider='google-drive' id='example'", "bilibili" => "provider='bilibili' id='example'", "dailymotion" => "provider='dailymotion' id='example'"}
  body = "{% capture blank_name %} \n\t {% endcapture %}"
  providers.each do |provider, parameters|
    names.each do |name, argument|
      snippet = provider == "direct" ? "youtube" : "video"
      body += "<section id='#{provider}-#{name}'>{% include snippets/#{snippet}.html #{parameters} #{argument} %}</section>"
    end
  end
  File.write(File.join(source, "names.html"), "---\n---\n" + body)
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
    videos.each do |video|
      name = video.at_css('[itemprop="name"]')["content"]
      player = video.at_css('iframe, video, .ch_ytdefer_btn')
      label = player && (player["title"] || player["aria-label"])
      raise "Video player does not use its supplied name" unless label && label.include?(name)
    end
    named = Nokogiri::HTML5(File.read(File.join(config["destination"], "names.html")))
    fallbacks = {"local" => "Video", "youtube" => "Video from YouTube", "deferred" => "YouTube video", "direct" => "YouTube video", "vimeo" => "Video: vimeo", "drive" => "Video: google-drive", "bilibili" => "Video: bilibili", "dailymotion" => "Video: dailymotion"}
    providers.each_key do |provider|
      names.each_key do |name|
        video = named.at_css("##{provider}-#{name}")
        expected = name == "padded" ? "Camera & tour" : name == "quotes" ? 'Camera "tour"' : fallbacks.fetch(provider)
        expected = "Video: #{expected}" if %w[vimeo drive bilibili dailymotion].include?(provider) && %w[padded quotes].include?(name)
        player = video.at_css("iframe, video, .ch_ytdefer")
        label = player["title"] || player["aria-label"] || player["data-title"]
        raise "Video name fallback/escaping failed: #{provider}/#{name}: #{label.inspect}" unless label == expected
        if %w[deferred direct].include?(provider)
          raise "Play button does not name the video" unless video.at_css("button")["aria-label"] == "Play #{expected}"
        end
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
