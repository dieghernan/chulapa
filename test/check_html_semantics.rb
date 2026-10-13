# Build complete documents and inspect the HTML5 tree, including parser repairs.
require "jekyll"
require "jekyll-include-cache"
require "nokogiri"
require "tmpdir"
require "fileutils"

root = File.expand_path("..", __dir__)
Dir.mktmpdir("chulapa-html-semantics-") do |source|
  %w[_layouts _includes].each { |dir| FileUtils.cp_r(File.join(root, dir), source) }
  FileUtils.mkdir_p(File.join(source, "_posts"))
  File.write(File.join(source, "_posts/2024-01-01-entry.md"), "---\ntitle: Entry\nlayout: default\nog_image: /preview.svg\ntags: [guide]\ncategories: [reference]\n---\n## Entry content\n\nA paragraph.")
  fixtures = %w[default landingpage archive cloudtag cloudcategory indexcategory].to_h do |layout|
    [layout, {"layout" => layout, "include_collection" => "posts", "show_sidetoc" => %w[default landingpage].include?(layout), "show_toc" => true}]
  end
  fixtures["author"] = {"layout" => "default", "show_author" => true}
  fixtures["simplelist"] = {"layout" => "default"}
  fixtures["comments"] = {"layout" => "default"}
  fixtures["minimal"] = {"layout" => "minimal"}
  %w[lunr google algolia simplesearch fusejs absent].each do |provider|
    fixtures["search-#{provider}"] = {"layout" => "search"}
  end
  fixtures.each do |name, settings|
    body = name == "minimal" ? '<main><h1>Minimal page</h1><p>Custom content.</p></main>' : "## First section\n\nA paragraph with **emphasis** and a [link](https://example.com).\n\n## Second section\n\n```text\n  preserved  spaces\n\n    second line\n```\n"
    body += "\n{% include components/simplelist.html cacheddocs=site.posts cachedlimit=10 %}" if name == "simplelist"
    body += "\n{% include welcomments/comments.html website_id='YOUR-WEBSITE-ID-HERE' %}" if name == "comments"
    data = {"title" => name, "header_type" => "base", "show_breadcrumb" => true}.merge(settings)
    File.write(File.join(source, "#{name}.md"), data.to_yaml + "---\n" + body)
  end
  %w[classic fab dual].each do |navigation|
    ["", "/preview"].each do |baseurl|
      config = Jekyll.configuration(
        "source" => source,
        "destination" => File.join(source, "_site"),
        "quiet" => true,
        "theme" => nil,
        "remote_theme" => nil,
        "url" => "https://example.com",
        "baseurl" => baseurl,
        "title" => "Semantic fixture",
        "author" => {"name" => "Author"},
        "navbar" => {
          "style" => navigation,
          "brand" => {"title" => "Home", "url" => "/"},
          "nav" => [{"title" => "Guides", "child" => [{"title" => "Entry", "url" => "/default.html"}]}]
        },
        "footer" => {"links" => [{"url" => "/default.html", "label" => "Read more", "icon" => "fas fa-book"}]},
        "compress_html" => {"blanklines" => true, "clippings" => "all"}
      )
      # Search providers are site settings; exercise each with a separate build.
      %w[lunr google algolia simplesearch fusejs absent].each do |provider|
        config["search"] = {"provider" => provider == "absent" ? nil : provider}
        Jekyll::Site.new(config).process
        names = provider == "lunr" ? fixtures.keys.reject { |name| name.start_with?("search-") } : []
        names << "search-#{provider}"
        names.each do |name|
          path = File.join(config["destination"], "#{name}.html")
          html = File.read(path)
          document = Nokogiri::HTML5.parse(html, max_errors: 100)
          context = "#{name}/#{navigation}/#{baseurl.empty? ? 'root' : baseurl}/#{provider}"
          raise "HTML5 parser repaired #{context}: #{document.errors.join("\n")}" unless document.errors.empty?
          raise "Missing document language: #{context}" if document.at_css("html")["lang"].to_s.empty?
          raise "Expected one main landmark: #{context}" unless document.css("main").size == 1
          raise "Main nested in another landmark: #{context}" if document.at_css("main").ancestors.any? { |ancestor| %w[main article aside header footer nav].include?(ancestor.name) }
          raise "Expected one page heading: #{context}" unless document.css("h1").size == 1
          raise "Missing page title: #{context}" if document.at_css("head > title")&.text.to_s.empty?
          ids = document.css("[id]").map { |node| node["id"] }
          raise "Duplicate IDs: #{context}" unless ids.uniq.size == ids.size
          document.css("nav, [role='navigation']").each do |nav|
            raise "Unnamed navigation: #{context}: #{nav.to_html}" if nav["aria-label"].to_s.strip.empty? && nav["aria-labelledby"].to_s.strip.empty?
          end
          document.css("[aria-controls], [aria-labelledby], label[for]").each do |node|
            %w[aria-controls aria-labelledby for].each do |attribute|
              node[attribute].to_s.split.each do |id|
                raise "Unresolved #{attribute}=#{id}: #{context}" unless ids.include?(id)
              end
            end
          end
          if %w[default landingpage].include?(name)
            raise "Empty author landmark: #{context}" unless document.css("aside").empty?
          elsif name == "author"
            raise "Author landmark removed: #{context}" unless document.at_css("aside .h-card")
          end
          document.css("a.chulapa-overlay-img").each do |link|
            raise "Unnamed thumbnail: #{context}" unless link["aria-label"] == "Entry"
          end
          raise "Simple-list heading level: #{context}" if name == "simplelist" && !document.at_css("article h2.h6")
          document.css("[data-toggle='dropdown']").each do |trigger|
            raise "Non-native dropdown: #{context}" unless trigger.name == "button" && trigger["type"] == "button"
            raise "Container marked as current page: #{context}" if trigger.key?("aria-current")
          end
          document.css("nav a[aria-current='page']").each do |link|
            raise "Wrong current destination: #{context}" unless link["href"].delete_suffix(".html") == "https://example.com#{baseurl}/#{name}".delete_suffix(".html")
          end
          raise "Current dropdown entry not marked: #{context}" if name == "default" && document.css(".dropdown-item[aria-current='page']").size != (navigation == "dual" ? 2 : 1)
          if name.start_with?("search-") && %w[lunr fusejs google simplesearch].include?(provider)
            raise "Search landmark absent: #{context}" unless document.at_css("form[role='search']")
          end
          if name.start_with?("search-") && %w[lunr fusejs].include?(provider)
            raise "Search status not announced: #{context}" unless document.at_css("#resultscount[role='status'][aria-live='polite'][aria-atomic='true']")
          end
          if name == "comments"
            raise "Comment label absent: #{context}" unless document.at_css("label[for='message']")&.text == "Comment"
            raise "Comment instructions absent: #{context}" unless document.at_css("textarea[aria-describedby='welcomments__markdown-notice']") && document.at_css("#welcomments__markdown-notice")
            raise "Configuration warning became heading: #{context}" unless document.at_css("p.h1")&.text == "Website id not configured!"
          end
          document.css("img").each do |image|
            raise "Image without alt: #{context}" unless image.key?("alt")
          end
          document.css("footer.footer-chulapa, footer.footer-chulapa *").each do |node|
            line = html.lines[node.line - 1]
            next unless line && line.lstrip.start_with?("<#{node.name} ", "<#{node.name}>")
            depth = node.ancestors.take_while { |ancestor| ancestor.name != "body" }.size
            expected = " " * ((depth + 1) * 2)
            raise "Footer indentation: #{context}: #{line.inspect}" unless line.start_with?(expected + "<")
          end
          head = html.split("<head>", 2).last.split("</head>", 2).first
          document.at_css("head").element_children.each do |node|
            line = html.lines[node.line - 1]
            raise "Head child indentation: #{context}: #{line.inspect}" unless line.start_with?("    <")
          end
          raise "Joined head tags: #{context}" if head.match?(/>(?:<meta|<link|<script|<title)/)
          raise "Inconsistent head indentation: #{context}" unless head.lines.grep(/<meta|<link|<title/).all? { |line| line.start_with?("    ") }
          raise "Code whitespace changed: #{context}" if name == "default" && document.at_css("pre code").text != "  preserved  spaces\n\n    second line\n"
        end
      end
    end
  end
end
puts "HTML5 syntax, landmarks, navigation names, IDs, head formatting and code whitespace passed."
