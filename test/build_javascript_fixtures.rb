require "jekyll"
require "jekyll-include-cache"
require "fileutils"
require "tmpdir"
require "nokogiri"

root = File.expand_path("..", __dir__)
output = File.expand_path(ARGV.fetch(0))
%w[lunr fusejs].each do |provider|
  ["", "/project"].each do |baseurl|
    name = "#{baseurl.empty? ? 'root' : 'subdir'}-#{provider}"
    Dir.mktmpdir("chulapa-js-") do |source|
      %w[_layouts _includes _sass assets].each { |dir| FileUtils.cp_r(File.join(root, dir), source) }
      FileUtils.cp(File.join(root, "docs/_pages/demo_searchlunr.html"), source)
      FileUtils.cp(File.join(root, "docs/_pages/demo_searchfusejs.html"), source)
      FileUtils.cp(File.join(root, "docs/assets/demo-lunr-store.js"), File.join(source, "assets"))
      FileUtils.mkdir_p(File.join(source, "_posts"))
      File.write(File.join(source, "preview.svg"), '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="180"><rect width="300" height="180" fill="#285d70"/></svg>')
      12.times do |i|
        word = i.zero? ? "Alpha" : "Gamma"
        tags = i.zero? ? "[uniquetag]" : "[other]"
        content = i.zero? ? "Alpha beta content" : "Other gamma content"
        File.write(File.join(source, "_posts/2024-01-#{format('%02d', i + 1)}-article.md"), "---\nlayout: default\ntitle: #{word} article #{i}\nog_image: /preview.svg\ntags: #{tags}\n---\n#{content} #{i}.")
      end
      File.write(File.join(source, "_layouts/custom-search.html"), "---\nlayout: search\n---\n")
      File.write(File.join(source, "inherited-search.md"), "---\nlayout: custom-search\ntitle: Inherited search\n---\n")
      File.write(File.join(source, "search.md"), "---\nlayout: search\ntitle: Search\n---\n")
      File.write(File.join(source, "video.md"), "---\nlayout: default\ntitle: Video\n---\n{% include snippets/youtube.html id='first-video' name='First video' %}\n{% include snippets/youtube.html id='second-video' name='Second video' %}\n\n```ruby\nputs 'hello'\n```\n")
      FileUtils.cp(File.join(root, "docs/_pages/404.md"), source)
      config = Jekyll.configuration("source" => source, "destination" => File.join(output, name), "url" => "http://127.0.0.1:8770", "baseurl" => baseurl, "quiet" => true, "title" => "JavaScript fixture", "plugins" => ["jekyll-include-cache"], "search" => {"provider" => provider}, "navbar" => {"style" => "fab", "brand" => {"title" => "Fixture", "url" => "/video.html"}})
      Dir.chdir(source) { Jekyll::Site.new(config).process }
      search = Nokogiri::HTML(File.read(File.join(output, name, "search.html")))
      raise "Search preloads unused theme script" if search.at_css('link[rel="preload"][href$="chulapa_script.js"]')
      inherited = Nokogiri::HTML(File.read(File.join(output, name, "inherited-search.html")))
      raise "Inherited search preloads unused theme script" if inherited.at_css('link[rel="preload"][href$="chulapa_script.js"]')
      scripts = search.css('script[src]').map { |node| node["src"] }
      common = "#{baseurl}/assets/js/chulapa_search.js"
      engine = "http://127.0.0.1:8770#{baseurl}/assets/js/#{provider}/#{provider}-search.min.js"
      raise "Shared search helper absent or loaded after engine" unless scripts.count(common) == 1 && scripts.index(common) < scripts.index(engine)
      ["demo/search_lunr.html", "demo/search_fusejs.html", "404.html"].each do |page|
        document = Nokogiri::HTML(File.read(File.join(output, name, page)))
        sources = document.css('script[src]').map { |node| node["src"] }
        %w[jquery-3.5.1.slim.min.js bootstrap.min.js chulapa_navigation.js].each do |asset|
          raise "Duplicate/missing #{asset} in #{page}" unless sources.count { |url| url.end_with?(asset) } == 1
        end
        adapter = sources.find { |url| url.match?(%r{/(lunr|fusejs)-search(?:\.min)?\.js$}) }
        if adapter
          raise "Missing helper before adapter in #{page}" unless sources.count(common) == 1 && sources.index(common) < sources.index(adapter)
        end
      end
      video = Nokogiri::HTML(File.read(File.join(output, name, "video.html")))
      raise "Theme script missing" unless video.css('script[src$="chulapa_script.js"]').size == 1
      raise "Video preload missing" unless video.at_css('link[rel="preload"][href$="chulapa_script.js"]')
      raise "No-JavaScript video links missing" unless video.css('noscript a[href^="https://www.youtube.com/watch"]').size == 2
    end
  end
end
puts "Built and checked JavaScript fixtures for both engines and URL prefixes."
