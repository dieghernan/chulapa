require "jekyll"
require "jekyll-include-cache"
require "fileutils"
require "tmpdir"
require "nokogiri"

root = File.expand_path("..", __dir__)
output = File.expand_path(ARGV.fetch(0, File.join(Dir.tmpdir, "chulapa-accessibility-site")))
skins = %w[chulapa navi journal gitdev lux flatly]
fixtures = skins.map { |skin| [skin, skin, "fab"] } + [["navi-dual", "navi", "dual"], ["navi-classic", "navi", "classic"]]
fixtures.each do |name, skin, navigation|
  Dir.mktmpdir("chulapa-accessibility-source-") do |source|
    %w[_layouts _includes _sass assets].each { |dir| FileUtils.cp_r(File.join(root, dir), source) }
    config = {
      "source" => source, "destination" => File.join(output, name),
      "url" => "http://localhost:8767", "baseurl" => "/#{name}", "quiet" => true,
      "plugins" => ["jekyll-include-cache"], "title" => "Accessibility fixture",
      "author" => {"name" => "Author"}, "chulapa-skin" => {"skin" => skin},
      "comments" => {"provider" => "cactus"},
      "navbar" => {"style" => navigation, "brand" => {"title" => "Fixture", "url" => "/article.html"},
        "nav" => [{"title" => "Home", "url" => "/article.html"},
          {"title" => "Docs", "child" => [{"title" => "Article", "url" => "/article.html"}]}]},
      "footer" => {"links" => [{"url" => "https://github.com/dieghernan/chulapa", "label" => "GitHub", "icon" => "fab fa-github"}]},
      "collections" => {"projects" => {"output" => true}}
    }
    content = "## First section\n\nA paragraph with a [descriptive link](https://example.com).\n\n```ruby\nputs 'Hello'\n```\n\n## Second section\n\n" + "Text for scrolling.\n\n" * 40
    {"article" => "default", "landing" => "landingpage", "minimal" => "minimal", "cards" => "default", "comments-on" => "default"}.each do |page, layout|
      data = {"title" => page.capitalize, "layout" => layout, "header_type" => "hero", "show_header" => true,
        "show_sidetoc" => page == "article", "show_toc" => page == "landing", "show_comments" => page == "comments-on",
        "project_links" => [{"url" => "/article.html", "label" => "Read article"}]}
      body = page == "cards" ? "{% include components/indexcards.html cacheddocs=site.projects cachedlimit=2 %}" : content
      body = '<main id="maincontent"><h1>Minimal content</h1>' + body + "</main>" if page == "minimal"
      File.write(File.join(source, page + ".md"), data.to_yaml + "---\n" + body)
    end
    FileUtils.mkdir_p(File.join(source, "_projects"))
    project = {"title" => "Example project", "subtitle" => "Project subtitle", "layout" => "default", "header_img" => "/project.jpg"}
    File.write(File.join(source, "_projects/example.md"), project.to_yaml + "---\nA short project description.")
    Jekyll::Site.new(Jekyll.configuration(config)).process
    article = Nokogiri::HTML(File.read(File.join(output, name, "article.html")))
    font = article.at_css('link[rel="preload"][as="font"]')["href"]
    raise "Font ignores baseurl: #{name}" unless font == "/#{name}/assets/fonts/Chulapa/Chulapa-Bold_vmod.otf"
    css = File.read(File.join(output, name, "assets/css/main.css"))
    raise "Font CSS and preload differ: #{name}" unless css.include?(font)
    raise "Cactus loaded on disabled page: #{name}" if article.to_html.include?("latest.cactus.chat")
    enabled = File.read(File.join(output, name, "comments-on.html"))
    raise "Cactus missing on enabled page: #{name}" unless enabled.include?("latest.cactus.chat/cactus.js") && enabled.include?("latest.cactus.chat/style.css")
    cards = Nokogiri::HTML(File.read(File.join(output, name, "cards.html")))
    raise "Card image link lacks name: #{name}" unless cards.at_css(".chulapa-card-img")["aria-label"] == "Example project"
    puts "Built and checked #{name}"
  end
end
puts "Browser fixtures: #{output}"
