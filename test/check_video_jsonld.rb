# Run from test/: bundle exec ruby check_video_jsonld.rb (Jekyll 3 or 4).
require "jekyll"
require "jekyll-include-cache"
require "nokogiri"
require "json"
require "tmpdir"
require "fileutils"

Dir.mktmpdir("chulapa-video-jsonld-") do |source|
  root = File.expand_path("..", __dir__)
  FileUtils.cp_r(File.join(root, "_includes"), source)
  providers = {
    "local" => ["video", "fileurl='/movie.mp4' provider='youtube' id='ignored'", "contentUrl", "/movie.mp4"],
    "external" => ["video", "fileurl='https://cdn.example/movie.mp4?a=1&b=2'", "contentUrl", "https://cdn.example/movie.mp4?a=1&b=2"],
    "eager" => ["video", "provider='youtube' id='clip' nolazy=true", "embedUrl", "https://www.youtube-nocookie.com/embed/clip"],
    "deferred" => ["video", "provider='youtube' id='clip'", "embedUrl", "https://www.youtube-nocookie.com/embed/clip"],
    "direct" => ["youtube", "id='clip' video_res='hqdefault'", "embedUrl", "https://www.youtube-nocookie.com/embed/clip"],
    "vimeo" => ["video", "provider='vimeo' id='123'", "embedUrl", "https://player.vimeo.com/video/123?dnt=true"],
    "drive" => ["video", "provider='google-drive' id='123'", "embedUrl", "https://drive.google.com/file/d/123/preview"],
    "bilibili" => ["video", "provider='bilibili' id='BV123'", "embedUrl", "https://player.bilibili.com/player.html?bvid=BV123&page=1&as_wide=1&high_quality=1&danmaku=0"],
    "dailymotion" => ["video", "provider='dailymotion' id='123'", "embedUrl", "https://www.dailymotion.com/embed/video/123"]
  }
  body = ""
  providers.each do |key, (snippet, args, *_rest)|
    body += "<section id='#{key}'>{% include snippets/#{snippet}.html #{args} name=page.video_name description=page.video_description duration='PT1M30S' upload_date='2024-01-02T10:00:00+01:00' thumbnail_url='/thumb.jpg' %}</section>"
  end
  {"bare" => "provider='vimeo' id='bare'", "spaces" => "provider='youtube' id='spaces' name='  ' description=' ' duration=' ' upload_date=' '", "default-thumb" => "provider='youtube' id='thumb' video_res='hqdefault'", "eager-bare" => "provider='youtube' id='clip' nolazy=true", "unknown" => "provider='unknown' id='abc'", "missing" => "provider='vimeo'", "empty-file" => "fileurl=' ' provider='youtube' id='ignored'"}.each do |key, args|
    body += "<section id='#{key}'>{% include snippets/video.html #{args} %}</section>"
  end
  body += "<section id='repeat'>{% include snippets/video.html provider='vimeo' id='123' %}</section>"
  values = { "video_name" => "A \"clip\" & </script><script>bad()</script>", "video_description" => "Line one\nLine two &amp; \\ end" }
  %w[first second].each do |page|
    File.write(File.join(source, "#{page}.html"), values.merge("canonical_url" => "/canonical/#{page}/").to_yaml + "---\n#{body}")
  end
  ["", "/project"].each do |baseurl|
    config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"), "url" => "https://example.com", "baseurl" => baseurl, "quiet" => true)
    Jekyll::Site.new(config).process
    %w[first second].each do |page|
      html = File.read(File.join(config["destination"], "#{page}.html"))
      doc = Nokogiri::HTML5(html)
      raise "Metadata escaped its script" if doc.css("script").any? { |node| node.text == "bad()" }
      read = ->(key) { node = doc.at_css("##{key} script[type='application/ld+json']"); node && JSON.parse(node.text) }
      providers.each do |key, (_snippet, _args, property, expected_url)|
        video = read.call(key)
        expected_url = "https://example.com#{baseurl}#{expected_url}" if expected_url.start_with?("/")
        raise "Wrong video URL: #{key}" unless video[property] == expected_url
        raise "Wrong URL kind: #{key}" if video.key?(property == "contentUrl" ? "embedUrl" : "contentUrl")
        raise "Wrong canonical: #{key}" unless video.dig("isPartOf", "@id") == "https://example.com#{baseurl}/canonical/#{page}/"
        wrapper = doc.at_css("##{key} [itemscope]")
        raise "Duplicate identities: #{key}" unless wrapper["itemid"] == video["@id"] && video["@id"] == expected_url + "#video"
        %w[name description duration uploadDate thumbnailUrl].each do |field|
          node = wrapper.at_css("[itemprop='#{field}']")
          raise "Microdata/JSON-LD differ: #{key}/#{field}" unless video[field] == (node["content"] || node["href"])
        end
        source_node = wrapper.at_css("[itemprop='#{property}']")
        raise "Player metadata URL differs: #{key}" unless source_node["href"] == expected_url || source_node["src"] == expected_url
      end
      raise "Repeated video got another ID" unless read.call("repeat")["@id"] == read.call("vimeo")["@id"]
      %w[bare spaces eager-bare repeat].each do |key|
        video = read.call(key)
        raise "Inherited metadata: #{key}" if %w[name description duration uploadDate].any? { |field| video.key?(field) }
      end
      raise "Unexpected eager thumbnail" if read.call("eager-bare").key?("thumbnailUrl")
      raise "Wrong deferred thumbnail" unless read.call("default-thumb")["thumbnailUrl"] == "https://img.youtube.com/vi/thumb/hqdefault.jpg"
      %w[unknown missing empty-file].each { |key| raise "Invented unsupported video: #{key}" if read.call(key) }
      raise "Deferred player loaded before click" if doc.at_css("#deferred iframe")
      raise "Deferred metadata inside replaceable player" if doc.at_css("#deferred .ch_ytdefer script[type='application/ld+json']")
    end
  end
end
puts "Video JSON-LD checks passed: providers, shared IDs, canonical/baseurl, optional fields and escaping."
