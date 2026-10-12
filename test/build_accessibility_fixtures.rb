require "jekyll"
require "jekyll-include-cache"
require "fileutils"
require "tmpdir"
require "nokogiri"

root = File.expand_path("..", __dir__)
output = File.expand_path(ARGV.fetch(0, File.join(Dir.tmpdir, "chulapa-accessibility-site")))
skins = %w[chulapa navi journal gitdev lux flatly sketchy]
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
    content = "## First section [jump to second](#second-section) {#first-section}\n\nA paragraph with a [descriptive link](https://example.com).\n\n```ruby\nputs 'Hello'\n```\n\n## Second section\n\n" + "Text for scrolling.\n\n" * 40
    {"article" => "default", "landing" => "landingpage", "minimal" => "minimal", "cards" => "default", "comments-on" => "default"}.each do |page, layout|
      data = {"title" => page.capitalize, "layout" => layout, "header_type" => "hero", "show_header" => true,
        "show_sidetoc" => page == "article", "show_toc" => %w[article landing].include?(page), "show_comments" => page == "comments-on",
        "project_links" => [{"url" => "/article.html", "label" => "Read article"}]}
      body = page == "cards" ? "{% include components/indexcards.html cacheddocs=site.projects cachedlimit=2 %}" : content
      if page == "article"
        body = "* TOC\n{:toc}\n\n" + body
        body += '<div id="visibility-panels" class="tab-content" style="height:160px;position:relative"><div id="panel-a" class="tab-pane active" style="position:absolute;inset:0"><h2 id="panel-a-title">Panel A</h2><p>First panel.</p></div><div id="panel-b" class="tab-pane active" style="position:absolute;inset:0;visibility:hidden"><h2 id="panel-b-title">Panel B</h2><p>Second panel.</p></div></div>'
        body += "\n\n" + "Text after the panels.\n\n" * 25
        body += "\n\n### Last subsection\n\nEnd of article.\n"
        body += '<details id="extra-details"><summary>Optional section</summary><h2 id="progress-100%">Progress 100%</h2><p>Extra reading.</p></details>'
      end
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
    comments_doc = Nokogiri::HTML5.parse(enabled, max_errors: 100)
    raise "Invalid comments HTML5: #{name}: #{comments_doc.errors.join("\n")}" unless comments_doc.errors.empty?
    raise "Cactus missing on enabled page: #{name}" unless enabled.include?("latest.cactus.chat/cactus.js") && enabled.include?("latest.cactus.chat/style.css")
    cards = Nokogiri::HTML(File.read(File.join(output, name, "cards.html")))
    raise "Card image link lacks name: #{name}" unless cards.at_css(".chulapa-card-img")["aria-label"] == "Example project"
    puts "Built and checked #{name}"
  end
end
puts "Browser fixtures: #{output}"
