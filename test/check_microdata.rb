# Run from the repository root: bundle exec ruby test/check_microdata.rb
require "jekyll"
require "jekyll-include-cache"
require "nokogiri"
require "tmpdir"
require "fileutils"
require "uri"

def microdata_value(node, document_url)
  return { "type" => node["itemtype"], "properties" => properties(node, document_url) } if node["itemscope"]

  case node.name
  when "a", "area", "link"
    URI.join(document_url, node["href"]).to_s
  when "audio", "embed", "iframe", "img", "source", "track", "video"
    URI.join(document_url, node["src"]).to_s
  when "meta"
    node["content"]
  when "time"
    node["datetime"] || node.text
  else
    node.text
  end
end

# Extract direct properties using HTML microdata value rules and scope boundaries.
def properties(item, document_url)
  result = Hash.new { |hash, key| hash[key] = [] }
  walk = lambda do |node|
    node.element_children.each do |child|
      if child["itemprop"]
        value = microdata_value(child, document_url)
        child["itemprop"].split.each { |name| result[name] << value }
      end
      walk.call(child) unless child["itemscope"]
    end
  end
  walk.call(item)
  result
end

def check(condition, message)
  raise message unless condition
end

root = File.expand_path("..", __dir__)
Dir.mktmpdir("chulapa-microdata-") do |source|
  FileUtils.cp_r(File.join(root, "_includes"), source)
  File.write(File.join(source, "index.html"), <<~LIQUID)
    ---
    ---
    {% include snippets/video.html provider="youtube" id="first-video" %}
    {% include snippets/youtube.html id="second-video" video_res="hqdefault" %}
    {% include snippets/video.html provider="youtube" id="third-video" nolazy=true %}
    {% include snippets/video.html fileurl="/movie.mp4?a=1&b=2" %}
    {% include snippets/video.html provider="vimeo" id="123" %}
    {% include snippets/video.html provider="google-drive" id="456" %}
    {% include snippets/video.html provider="bilibili" id="BV789" %}
    {% include snippets/video.html provider="dailymotion" id="abc" %}
    {% include snippets/masonry.html external="/photo.jpg" %}
    {% include snippets/carousel.html external="/slide.jpg" %}
    {% include welcomments/template.html element_id="comment-1" id="1" author_name="Guest" date_xml_schema="2024-01-02T10:00:00Z" formatted_date="January 2" message="A comment" %}
    {% include search/simplesearch.html %}
  LIQUID
  File.write(File.join(source, "metadata.html"), <<~LIQUID)
    ---
    ---
    {% assign video_name = 'A "video" & <story>' %}
    {% capture details %}First line.
    Second line & more.{% endcapture %}
    {% include snippets/video.html provider="youtube" id="one" name=video_name thumbnail_url="/thumb.jpg?a=1&b=2" upload_date="2024-01-02T10:00:00+01:00" description=details duration="PT1M30S" %}
    {% include snippets/youtube.html id="two" name="Second video" upload_date="2024-02-03T12:00:00Z" %}
    {% include snippets/video.html provider="youtube" id="three" nolazy=true name=video_name thumbnail_url="/thumb.jpg?a=1&b=2" upload_date="2024-01-02T10:00:00+01:00" description=details duration="PT1M30S" %}
    {% include snippets/video.html fileurl="/movie.mp4" name=video_name thumbnail_url="/thumb.jpg?a=1&b=2" upload_date="2024-01-02T10:00:00+01:00" description=details duration="PT1M30S" %}
    {% include snippets/video.html provider="vimeo" id="123" name=video_name thumbnail_url="/thumb.jpg?a=1&b=2" upload_date="2024-01-02T10:00:00+01:00" description=details duration="PT1M30S" %}
    {% include snippets/video.html provider="google-drive" id="456" name=video_name thumbnail_url="/thumb.jpg?a=1&b=2" upload_date="2024-01-02T10:00:00+01:00" description=details duration="PT1M30S" %}
    {% include snippets/video.html provider="bilibili" id="BV789" name=video_name thumbnail_url="/thumb.jpg?a=1&b=2" upload_date="2024-01-02T10:00:00+01:00" description=details duration="PT1M30S" %}
    {% include snippets/video.html provider="dailymotion" id="abc" name=video_name thumbnail_url="/thumb.jpg?a=1&b=2" upload_date="2024-01-02T10:00:00+01:00" description=details duration="PT1M30S" %}
    {% include snippets/video.html fileurl="/empty.mp4" name=" " thumbnail_url=" " upload_date="" description=" " duration="" %}
    {% include snippets/youtube.html id="blank" thumbnail_url=" " %}
  LIQUID
  ["", "/subdir"].each do |baseurl|
    config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"), "url" => "https://example.com", "baseurl" => baseurl, "quiet" => true)
    Jekyll::Site.new(config).process
    html = File.read(File.join(config["destination"], "index.html"))
    document = Nokogiri::HTML(html)
    videos = document.css('[itemscope][itemtype="https://schema.org/VideoObject"]')
    check(videos.size == 8, "Video fixture count changed")
    check(videos.all? { |video| !video["itemprop"] }, "Video has an unscoped parent property")
    data = videos.map { |video| properties(video, "https://example.com#{baseurl}/") }
    check(data[0] == { "thumbnailUrl" => ["https://img.youtube.com/vi/first-video/maxresdefault.jpg"], "embedUrl" => ["https://www.youtube-nocookie.com/embed/first-video"] }, "Deferred URLs not extracted before playback")
    check(data[1]["thumbnailUrl"] == ["https://img.youtube.com/vi/second-video/hqdefault.jpg"], "Custom preview URL lost")
    check(data[2]["embedUrl"] == ["https://www.youtube-nocookie.com/embed/third-video"], "Iframe player URL lost")
    check(data[3]["contentUrl"] == ["https://example.com#{baseurl}/movie.mp4?a=1&b=2"], "File URL altered or gained playback fragment")
    expected_embeds = ["https://player.vimeo.com/video/123?dnt=true", "https://drive.google.com/file/d/456/preview", "https://player.bilibili.com/player.html?bvid=BV789&page=1&as_wide=1&high_quality=1&danmaku=0", "https://www.dailymotion.com/embed/video/abc"]
    check(data.drop(4).map { |item| item["embedUrl"].first } == expected_embeds, "Provider URL extraction incorrect")
    check(data.all? { |item| !item.key?("name") && !item.key?("uploadDate") }, "Missing video metadata invented")
    check(document.at_css('video')["src"].end_with?("#t=0.1") && document.at_css('video').key?("controls"), "Playback behavior changed")
    images = document.css('[itemscope][itemtype="https://schema.org/ImageObject"]')
    check(images.map { |item| properties(item, "https://example.com/")["contentUrl"].first } == ["https://example.com#{baseurl}/photo.jpg", "https://example.com#{baseurl}/slide.jpg"], "Gallery image extraction changed")
    comment = document.at_css('[itemtype="https://schema.org/Comment"]')
    check(!comment["itemprop"], "Comment has an unscoped parent property")
    comment_data = properties(comment, "https://example.com/")
    check(comment_data["author"].first["properties"]["name"] == ["Guest"] && comment_data["text"] == ["A comment"], "Comment scope boundaries lost")
    check(!html.include?('itemprop="headline"'), "Search has an unscoped headline")
    check(html.include?("https://example.com#{baseurl}/assets/js/ch_ytdefer/ch_ytdefer.js"), "Deferred script does not use installed theme or baseurl")
    # Simulate the player's DOM replacement; persistent metadata must survive.
    videos[0].at_css('.ch_ytdefer').inner_html = '<iframe src="https://www.youtube.com/embed/first-video"></iframe>'
    check(properties(videos[0], "https://example.com/") == data[0], "Deferred URLs changed after player insertion")
    metadata_doc = Nokogiri::HTML(File.read(File.join(config["destination"], "metadata.html")))
    metadata_videos = metadata_doc.css('[itemscope][itemtype="https://schema.org/VideoObject"]')
    metadata = metadata_videos.map { |video| properties(video, "https://example.com#{baseurl}/") }
    check(metadata.size == 10, "Metadata fixture count changed")
    [0, 2, 3, 4, 5, 6, 7].each do |index|
      item = metadata[index]
      check(item["name"] == ['A "video" & <story>'], "Escaped name lost: #{index}")
      check(item["description"] == ["First line.\nSecond line & more."], "Multiline description lost: #{index}")
      check(item["thumbnailUrl"] == ["https://example.com#{baseurl}/thumb.jpg?a=1&b=2"], "Thumbnail URL duplicated or altered: #{index}")
      check(item["uploadDate"] == ["2024-01-02T10:00:00+01:00"] && item["duration"] == ["PT1M30S"], "Date or duration altered: #{index}")
    end
    check(metadata[1]["name"] == ["Second video"] && metadata[1]["uploadDate"] == ["2024-02-03T12:00:00Z"], "Direct YouTube metadata lost")
    check(metadata[1]["thumbnailUrl"] == ["https://img.youtube.com/vi/two/maxresdefault.jpg"], "Default thumbnail changed")
    check(metadata[8] == {"contentUrl" => ["https://example.com#{baseurl}/empty.mp4"]}, "Blank metadata emitted")
    check(metadata[9]["thumbnailUrl"] == ["https://img.youtube.com/vi/blank/maxresdefault.jpg"], "Blank thumbnail suppresses YouTube fallback")
    metadata_videos[0].at_css('.ch_ytdefer').inner_html = '<iframe src="https://www.youtube.com/embed/one"></iframe>'
    check(properties(metadata_videos[0], "https://example.com/") == metadata[0], "Video metadata lost after player insertion")
  end
end
check(!File.read(File.join(root, "docs/_pages/demo_searchsimple.html")).include?('itemprop="headline"'), "Search demo has an unscoped headline")
puts "Microdata extraction checks passed."
