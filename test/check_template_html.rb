# Run from the repository root: bundle exec ruby test/check_template_html.rb
# Set TEMPLATE_HTML_OUTPUT to retain generated pages for W3C validation.
require "jekyll"
require "jekyll-include-cache"
require "nokogiri"
require "tmpdir"
require "fileutils"

root = File.expand_path("..", __dir__)
Dir.mktmpdir("chulapa-template-html-") do |source|
  %w[_layouts _includes].each { |dir| FileUtils.cp_r(File.join(root, dir), source) }
  FileUtils.mkdir_p(File.join(source, "_posts"))
  3.times do |index|
    data = {"layout" => "default", "title" => "Post #{index}", "header_type" => "base", "tags" => ["one", "two"], "show_related" => true, "related_label" => '<h2 class="h5">Related posts</h2>'}
    File.write(File.join(source, "_posts/2024-01-0#{index + 1}-post.md"), data.to_yaml + "---\n## Content\n\nA paragraph.\n")
  end
  File.write(File.join(source, "comments.html"), "---\nlayout: minimal\ntitle: Comments\n---\n<main><h1>Comments</h1><h2>Discussion</h2>{% include welcomments/comments.html website_id='test-site' %}</main>")
  %w[classic fab dual].each do |style|
    config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"), "url" => "https://example.com", "quiet" => true, "title" => "Site", "navbar" => {"style" => style, "brand" => {"title" => "Site", "url" => "/"}, "nav" => [{"title" => "Archives", "child" => [{"title" => "Posts", "url" => "/posts/"}]}]})
    site = Jekyll::Site.new(config)
    site.process
    page = site.posts.docs.first
    html = File.read(page.destination(config["destination"]))
    doc = Nokogiri::HTML(html)
    groups = doc.css(".dropdown-menu")
    expected = style == "dual" ? 2 : 1
    raise "Dropdown count: #{style}" unless groups.size == expected
    groups.each do |group|
      raise "Dropdown role: #{style}" unless group["role"] == "group"
      trigger = doc.at_css("[id='#{group['aria-labelledby']}']")
      raise "Dropdown name: #{style}" unless trigger && trigger.text.strip == "Archives"
      raise "Dropdown controls: #{style}" unless trigger["data-toggle"] == "dropdown" && trigger["aria-expanded"] == "false"
      raise "Child link: #{style}" unless group.at_css("a")["href"] == "https://example.com/posts/"
    end
    raise "Related heading lost: #{style}" unless doc.at_css("h2.h5").text == "Related posts"
    if style != "classic"
      raise "No-JS style missing from head: #{style}" unless html.match?(/<head>.*<noscript><style>#navi-toggle/m)
      raise "No-JS style inside body: #{style}" if html.match?(/<body[^>]*>.*<style>#navi-toggle/m)
    end
    if ENV["TEMPLATE_HTML_OUTPUT"]
      FileUtils.mkdir_p(ENV["TEMPLATE_HTML_OUTPUT"])
      File.write(File.join(ENV["TEMPLATE_HTML_OUTPUT"], "#{style}.html"), html)
    end
    comments = File.read(File.join(config["destination"], "comments.html"))
    raise "Void slash in comments" if comments.match?(/<(?:input|link)\b[^>]*\/>/)
    raise "Redundant script type" if comments.include?('type="text/javascript"')
    if ENV["TEMPLATE_HTML_OUTPUT"] && style == "classic"
      File.write(File.join(ENV["TEMPLATE_HTML_OUTPUT"], "comments.html"), comments)
    end
  end
end
puts "Template HTML checks passed (classic, fab, dual, related labels and Welcomments)."
