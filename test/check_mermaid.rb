require "jekyll"
require "jekyll-include-cache"
require "tmpdir"
require "fileutils"
require "nokogiri"

root = File.expand_path("..", __dir__)
Dir.mktmpdir("chulapa-mermaid-") do |source|
  %w[_layouts _includes _sass assets].each do |dir|
    FileUtils.cp_r(File.join(root, dir), source)
  end
  FileUtils.cp(File.join(root, "docs/collections/_demo/mermaid.md"), File.join(source, "demo.md"))
  %w[default minimal landingpage].each do |layout|
    [true, false].each do |enabled|
      File.write(File.join(source, "#{layout}-#{enabled}.md"), <<~PAGE)
        ---
        layout: #{layout}
        title: Mermaid example
        mermaid: #{enabled}
        ---
        ```mermaid
        flowchart LR
          accTitle: Publishing workflow
          accDescr: Write, build and publish the site.
          A[Write] --> B[Build] --> C[Publish]
        ```

        ```js
        const message = "Hello <world> & friends";
        ```
      PAGE
    end
  end
  File.write(File.join(source, "_config.yml"), "defaults:\n  - scope:\n      path: demo.md\n    values:\n      layout: default\n")
  ["", "/subdir"].each do |baseurl|
    config = Jekyll.configuration("source" => source,
      "destination" => File.join(source, "_site"), "url" => "http://localhost:8765",
      "baseurl" => baseurl, "quiet" => true, "kramdown" => {"input" => "GFM"}, "sass" => {"quiet_deps" => true,
      "silence_deprecations" => ["import", "global-builtin", "color-functions", "abs-percent", "function-units"]})
    Jekyll::Site.new(config).process
    %w[default minimal landingpage].each do |layout|
      [true, false].each do |enabled|
        doc = Nokogiri::HTML(File.read(File.join(config["destination"], "#{layout}-#{enabled}.html")))
        scripts = doc.css('script[type="module"]')
        raise "Module count #{layout}" unless scripts.size == (enabled ? 1 : 0)
        raise "Missing source #{layout}: #{doc.css("pre").to_html}" unless doc.at_css(".language-mermaid")&.text.include?("accTitle")
        if enabled
          raise "Module URL #{layout}" unless scripts.first["src"] == "#{baseurl}/assets/js/chulapa_mermaid.js"
          raise "Body flag #{layout}" unless doc.at_css("body")["data-mermaid"] == "true"
        end
      end
    end
    FileUtils.cp_r(config["destination"], ARGV.first) if ARGV.first && baseurl.empty?
  end
end
puts "Mermaid layout checks passed (enabled/disabled, three layouts, root/subdirectory)."
