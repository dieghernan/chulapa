# Build real default/inherited layouts; set DEFAULT_CONTENT_OUTPUT for browser/parser checks.
require 'jekyll'
require 'jekyll-include-cache'
require 'nokogiri'
require 'tmpdir'
require 'fileutils'

root = File.expand_path('..', __dir__)
Dir.mktmpdir('chulapa-default-content-') do |source|
  %w[_includes _layouts _sass assets].each { |dir| FileUtils.cp_r(File.join(root, dir), source) }
  FileUtils.mkdir_p(File.join(source, '_posts'))
  %w[01 02 03].each do |day|
    File.write(File.join(source, "_posts/2024-01-#{day}-entry.md"), {'layout' => 'default', 'title' => "Entry #{day}", 'tags' => ['example'], 'categories' => ['example'], 'show_bottomnavs' => true}.to_yaml + "---\n## Editorial section\n\nPost body #{day}.\n")
  end
  body = "## First section\n\nEditorial paragraph with a [source](https://example.com/source).\n\n1. Author list one\n2. Author list two\n\n## Second section\n\n```text\n  preserved spaces\n```\n\nFinal editorial paragraph.\n"
  layouts = %w[default archive indexcategory cloudtag cloudcategory cloudtag2 cloudcategory2]
  layouts.each do |layout|
    data = {'layout' => layout, 'title' => "Title #{layout}", 'subtitle' => 'Subtitle', 'header_type' => 'base', 'include_collection' => 'posts', 'show_toc' => true, 'show_sidetoc' => true, 'show_bottomnavs' => true}
    File.write(File.join(source, "#{layout}.md"), data.to_yaml + "---\n" + body)
  end
  File.write(File.join(source, 'plain.md'), {'layout' => 'default', 'title' => 'Plain title', 'header_type' => 'hero'}.to_yaml + "---\n" + body)
  File.write(File.join(source, 'authored-toc.md'), {'layout' => 'default', 'title' => 'Author outline', 'header_type' => 'base'}.to_yaml + "---\n* Author outline\n{:toc}\n\n" + body)
  destination = ENV.fetch('DEFAULT_CONTENT_OUTPUT', File.join(source, '_site'))
  config = Jekyll.configuration('source' => source, 'destination' => destination, 'quiet' => true,
    'url' => 'https://example.com', 'baseurl' => '/project', 'title' => 'Fixture', 'plugins' => ['jekyll-include-cache'],
    'navbar' => {'style' => 'classic', 'brand' => {'title' => 'Home'}},
    'chulapa-skin' => {'skin' => 'gitdev', 'highlight' => 'github'})
  Jekyll::Site.new(config).process
  (layouts + ['plain', 'authored-toc']).each do |name|
    doc = Nokogiri::HTML5(File.read(File.join(destination, "#{name}.html")))
    raise "Parser repairs: #{name}: #{doc.errors}" unless doc.errors.empty?
    ids = doc.css('[id]').map { |n| n['id'] }
    raise "Duplicate IDs: #{name}" unless ids == ids.uniq
    # The baseline run is for capturing before/after geometry and parser results.
    next if ENV['DEFAULT_CONTENT_BASELINE']
    raise "Title outside main: #{name}" unless doc.at_css('main h1.p-name')
    raise "Main count: #{name}" unless doc.css('main').size == 1
    raise "Empty document navigation: #{name}" if doc.at_css('nav.chulapa-pagination')
    if %w[default plain authored-toc].include?(name)
      content = doc.at_css('article#maincontent > .e-content')
      raise "Editorial content missing: #{name}" unless content && content.text.include?('Final editorial paragraph.') && content.css('ol li').size == 2 && content.at_css('a[href="https://example.com/source"]')
      raise "Theme TOC leaked into content: #{name}" if content.at_css('nav, #sideBar, #toc, #sidetoc, button')
      raise "Author outline lost" if name == 'authored-toc' && !content.at_css('#markdown-toc')
      raise "Preformatted content changed: #{name}" unless content.at_css('pre').text.include?('  preserved spaces')
    else
      raise "Feed became entry: #{name}" unless doc.at_css('.h-feed') && !doc.at_css('.h-feed > main > .e-content') && !doc.at_css('article#maincontent')
    end
  end
  unless ENV['DEFAULT_CONTENT_BASELINE']
    %w[01 02 03].each do |day|
      doc = Nokogiri::HTML5(File.read(File.join(destination, "example/2024/01/#{day}/entry.html")))
      links = doc.css('nav.chulapa-pagination a')
      raise "Unavailable/untabbable neighbor: #{day}" if links.any? { |n| n['tabindex'] == '-1' || n['href'].to_s.empty? || n['href'].end_with?('#') }
      raise "Neighbor count: #{day}" unless links.size == (day == '02' ? 2 : 1)
    end
  end
  puts "Default content fixtures passed on Jekyll #{Jekyll::VERSION}: #{destination}"
end
