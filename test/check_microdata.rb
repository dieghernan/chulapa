# Run from the repository root: bundle exec ruby test/check_microdata.rb
require "jekyll"
require "jekyll-include-cache"
require "nokogiri"
require "tmpdir"
require "fileutils"
require "uri"

# Extract direct properties using HTML microdata value rules and scope boundaries.
def properties(item, document_url)
  result = Hash.new { |hash, key| hash[key] = [] }
  walk = lambda do |node|
    node.element_children.each do |child|
      if child["itemprop"]
        value = if child["itemscope"]
          { "type" => child["itemtype"], "properties" => properties(child, document_url) }
        elsif %w[a area link].include?(child.name)
          URI.join(document_url, child["href"]).to_s
        elsif %w[audio embed iframe img source track video].include?(child.name)
          URI.join(document_url, child["src"]).to_s
        elsif child.name == "meta"
          child["content"]
        elsif child.name == "time"
          child["datetime"] || child.text
        else
          child.text
        end
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
  end
end
check(!File.read(File.join(root, "docs/_pages/demo_searchsimple.html")).include?('itemprop="headline"'), "Search demo has an unscoped headline")
puts "Microdata extraction checks passed."
