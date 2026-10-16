# Render provider templates with real Jekyll filters; never contact providers.
require "jekyll"
require "jekyll-include-cache"
require "nokogiri"
require "json"
require "fileutils"

root = File.expand_path("..", __dir__)
cactus = Liquid::Template.parse('{% include components/cactus.html pageurl=page.url %}')
welcomments = Liquid::Template.parse('{% include components/welcomments.html %}')
paths = {
  "/" => "%2F",
  "/a/b/" => "%2Fa%2Fb%2F",
  "/a-b/" => "%2Fa-b%2F",
  "/a_b/" => "%2Fa%5Fb%2F",
  "/a%2Fb/" => "%2Fa%252Fb%2F",
  "/a%5Fb/" => "%2Fa%255Fb%2F",
  "/a b/" => "%2Fa+b%2F",
  "/a+b/" => "%2Fa%2Bb%2F"
}
["", "/project"].each do |baseurl|
  site = Jekyll::Site.new(Jekyll.configuration("source" => root, "quiet" => true, "plugins" => [], "theme" => nil, "remote_theme" => nil, "url" => "https://example.com", "baseurl" => baseurl))
  values = {"url" => "https://example.com", "baseurl" => baseurl, "comments" => {"cactus_shortname" => "registered", "website_id" => "website-123"}, "data" => {"welcomments" => {"thread" => [{"id" => "saved-1", "date" => "2024-01-02", "author" => {"name" => "Reader", "avatar_url" => "https://example.com/avatar.png"}, "message" => "Saved **comment**"}]}}}
  ids = []
  paths.each do |url, expected|
    page = {"url" => url, "slug" => "thread"}
    rendered = 2.times.map do
      cactus.render!({"site" => values, "page" => page}, filters: [Jekyll::Filters], registers: {site: site})
    end
    raise "Unstable Cactus output: #{url}" unless rendered.uniq.size == 1
    id = rendered.first[/commentSectionId: "([^"]+)"/, 1]
    raise "Invalid Cactus ID: #{url}" unless id == expected && !id.match?(/[\/_]/)
    raise "Cactus registered site changed" unless rendered.first.include?('siteName: "registered"')
    ids << id
  end
  raise "Cactus IDs collide" unless ids.uniq.size == paths.size
  ["/", "/2024/01/01/thread.html", "/a_b/", "/a-b/", "/a%2Fb/"].each do |url|
    page = {"url" => url, "slug" => "thread"}
    html = welcomments.render!({"site" => values, "page" => page}, filters: [Jekyll::Filters], registers: {site: site})
    doc = Nokogiri::HTML.fragment(html)
    form = doc.at_css("form")
    raise "Saved comment lost" unless doc.at_css('#welcomments__comment-saved-1 strong')&.text == "comment"
    raise "Author data lost" unless doc.at_css('#welcomments__comment-saved-1')["data-author-name"] == "Reader"
    raise "Form fields changed" unless form.css("input, textarea").map { |field| field["name"] } == %w[website-id replying-to permalink page-slug message author-name author-url author-email]
    raise "Wrong submitted URL: #{url}/#{baseurl}: #{form.at_css('input[name="permalink"]')["value"]}" unless form.at_css('input[name="permalink"]')["value"] == "https://example.com#{baseurl}#{url}"
    raise "Website ID changed" unless form.at_css('input[name="website-id"]')["value"] == "website-123"
    raise "Slug changed" unless form.at_css('input[name="page-slug"]')["value"] == "thread"
    raise "Reply target lost" unless form.at_css('input[name="replying-to"]')
    raise "Form endpoint changed" unless form["action"] == "https://welcomments.io/api/comments" && form["method"] == "post"
    raise "Comment field semantics changed" unless form.at_css('label[for="message"]') && form.at_css('textarea[name="message"][required][aria-describedby="welcomments__markdown-notice"]')
    if ENV["COMMENT_ADAPTER_OUTPUT"] && url == "/2024/01/01/thread.html"
      FileUtils.mkdir_p(ENV["COMMENT_ADAPTER_OUTPUT"])
      name = baseurl.empty? ? "root" : "project"
      File.write(File.join(ENV["COMMENT_ADAPTER_OUTPUT"], "#{name}.html"), '<meta charset="utf-8"><link rel="stylesheet" href="/assets/css/main.css">' + html)
    end
  end
end
puts "Comment adapters passed: eight distinct repeatable Cactus paths; Welcomments root/project URLs and form fields."
