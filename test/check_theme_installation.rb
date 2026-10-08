# Build the gem first, then run: bundle exec ruby test/check_theme_installation.rb
require "jekyll"
require "jekyll-include-cache"
require "jekyll-sitemap"
require "jekyll-paginate"
require "rubygems/package"
require "rubygems/installer"
require "nokogiri"
require "json"
require "tmpdir"
require "fileutils"

root = File.expand_path("..", __dir__)
version = Gem::Specification.load(File.join(root, "chulapa-jekyll.gemspec")).version
package_path = File.join(root, "chulapa-jekyll-#{version}.gem")
package = Gem::Package.new(package_path)
%w[_includes/snippets/og-locale.html _includes/snippets/page-language.html _includes/snippets/canonical-url.html _includes/snippets/video-metadata.html assets/js/ch_ytdefer/ch_ytdefer.js assets/atom.xml assets/rss.xml].each do |path|
  raise "Missing packaged file: #{path}" unless package.spec.files.include?(path)
end
Dir.mktmpdir("chulapa-install-") do |work|
  gem_home = File.join(work, "gems")
  installed = Gem::Installer.at(package_path, install_dir: gem_home, ignore_dependencies: true, wrappers: false).install
  Gem::Specification.add_spec(installed)
  source = File.join(work, "site")
  FileUtils.mkdir_p(File.join(source, "blog"))
  FileUtils.mkdir_p(File.join(source, "_posts"))
  File.write(File.join(source, "index.md"), "---\nlayout: minimal\nlocale: es-MX\nog_title: Social title\n---\nGem site")
  FileUtils.cp(File.join(root, "docs/blog/index.html"), File.join(source, "blog/index.html"))
  5.times do |n|
    File.write(File.join(source, "_posts/2024-01-0#{n + 1}-post.md"), "---\nlayout: default\ntitle: Post #{n}\ninclude_on_feed: true\n---\nPost content.")
  end
  ["", "/subdir"].each do |baseurl|
    config = Jekyll.configuration("source" => source, "destination" => File.join(work, "output"), "theme" => "chulapa-jekyll", "url" => "https://example.com", "baseurl" => baseurl, "title" => "Installed theme", "paginate" => 2, "paginate_path" => "/blog/page:num/", "plugins" => ["jekyll-include-cache", "jekyll-paginate", "jekyll-sitemap"], "quiet" => true)
    site = Jekyll::Site.new(config)
    raise "Build did not use the installed gem" unless File.realpath(site.theme.root) == File.realpath(installed.full_gem_path)
    site.process
    html = Nokogiri::HTML(File.read(File.join(config["destination"], "index.html")))
    raise "Installed locale snippet failed" unless html.at_css("html")["lang"] == "es-MX"
    raise "Installed social title failed" unless html.at_css('meta[property="og:title"]')["content"] == "Social title"
    raise "Installed theme assets missing" unless File.exist?(File.join(config["destination"], "assets/js/ch_ytdefer/ch_ytdefer.js"))
    sitemap = Nokogiri::XML(File.read(File.join(config["destination"], "sitemap.xml"))).remove_namespaces!
    sitemap_urls = sitemap.css("loc").map(&:text)
    (1..3).each do |n|
      path = n == 1 ? "/blog/" : "/blog/page#{n}/"
      expected = "https://example.com#{baseurl}#{path}"
      doc = Nokogiri::HTML(File.read(File.join(config["destination"], path, "index.html")))
      raise "Paginated canonical: #{n}" unless doc.at_css('link[rel="canonical"]')["href"] == expected
      raise "Paginated OG URL: #{n}" unless doc.at_css('meta[property="og:url"]')["content"] == expected
      raise "Pagination absent from sitemap: #{n}" unless sitemap_urls.include?(expected)
      links = doc.css(".chulapa-pagination a[href]").map { |a| a["href"].strip }
      target = n == 1 ? "#{baseurl}/blog/page2/" : "#{baseurl}/blog/"
      raise "Uncrawlable pagination: #{n}" unless links.include?(target)
      doc.css('script[type="application/ld+json"]').each { |node| JSON.parse(node.text) }
    end
  end
  docs_source = File.join(work, "docs")
  FileUtils.mkdir_p(docs_source)
  Dir.children(File.join(root, "docs")).reject { |name| %w[_site .jekyll-cache .sass-cache vendor].include?(name) }.each do |name|
    FileUtils.cp_r(File.join(root, "docs", name), docs_source)
  end
  docs_config = Jekyll.configuration("config" => File.join(docs_source, "_config.yml"), "source" => docs_source, "destination" => File.join(work, "docs-output"), "remote_theme" => nil, "theme" => "chulapa-jekyll", "quiet" => true)
  docs_config["plugins"] = docs_config["plugins"].reject { |plugin| plugin == "jekyll-remote-theme" }
  Jekyll::Site.new(docs_config).process
  docs_page = Nokogiri::HTML(File.read(File.join(docs_config["destination"], "docs/04-layouts.html")))
  videos = docs_page.css('[itemscope][itemtype="https://schema.org/VideoObject"]')
  raise "Documentation videos missing" unless videos.size == 5
  videos.each do |video|
    %w[name thumbnailUrl uploadDate description duration].each do |property|
      raise "Documentation video missing #{property}" unless video.at_css("[itemprop='#{property}']")
    end
  end
  raise "Documentation CSS missing" if Dir.glob(File.join(docs_config["destination"], "assets/**/*.css")).empty?
end
puts "Installed gem, pagination and documentation checks passed."
