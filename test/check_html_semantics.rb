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
  File.write(File.join(source, "_posts/2024-01-01-entry.md"), "---\ntitle: Entry\nlayout: default\ntags: [guide]\ncategories: [reference]\n---\n## Entry content\n\nA paragraph.")
  fixtures = %w[default landingpage archive cloudtag cloudcategory indexcategory].to_h do |layout|
    [layout, {"layout" => layout, "include_collection" => "posts", "show_sidetoc" => %w[default landingpage].include?(layout), "show_toc" => true}]
  end
  fixtures["minimal"] = {"layout" => "minimal"}
  %w[lunr google algolia simplesearch fusejs absent].each do |provider|
    fixtures["search-#{provider}"] = {"layout" => "search"}
  end
  fixtures.each do |name, settings|
    body = name == "minimal" ? '<main><h1>Minimal page</h1><p>Custom content.</p></main>' : "## First section\n\nA paragraph with **emphasis** and a [link](https://example.com).\n\n## Second section\n\n```text\n  preserved  spaces\n\n    second line\n```\n"
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
