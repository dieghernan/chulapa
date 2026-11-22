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
  card_images = {
    '01' => {'header_img' => '/header.png'},
    '02' => {'og_image' => '/og.png'},
    '03' => {'header_img' => '/header.png', 'og_image' => '/og.png'},
    '04' => {'header_img' => '', 'og_image' => ''},
    '05' => {}
  }
  titles = card_images.keys.to_h { |day| [day, "Entry #{day}"] }
  titles['01'] = "Áreas & datos " + ('Boundary' * 12)
  titles['03'] = "Mapas de la costa con varios nombres de localidades y territorios"
  card_images.each do |day, images|
    data = {'layout' => day == '03' ? 'landingpage' : 'default', 'title' => titles.fetch(day),
      'tags' => ['example'], 'categories' => ['example'], 'show_bottomnavs' => day != '04'}.merge(images)
    File.write(File.join(source, "_posts/2024-01-#{day}-entry.md"), data.to_yaml + "---\n## Editorial section\n\nPost body #{day}.\n")
  end
  body = "## First section\n\nEditorial paragraph with a [source](https://example.com/source).\n\n1. Author list one\n2. Author list two\n\n## Second section\n\n```text\n  preserved spaces\n```\n\nFinal editorial paragraph.\n"
  layouts = %w[default archive indexcategory cloudtag cloudcategory cloudtag2 cloudcategory2]
  layouts.each do |layout|
    data = {'layout' => layout, 'title' => "Title #{layout}", 'subtitle' => 'Subtitle', 'header_type' => 'base', 'include_collection' => 'posts', 'show_toc' => true, 'show_sidetoc' => true, 'show_bottomnavs' => true}
    File.write(File.join(source, "#{layout}.md"), data.to_yaml + "---\n" + body)
  end
  File.write(File.join(source, 'plain.md'), {'layout' => 'default', 'title' => 'Plain title', 'header_type' => 'hero'}.to_yaml + "---\n" + body)
  File.write(File.join(source, 'authored-toc.md'), {'layout' => 'default', 'title' => 'Author outline', 'header_type' => 'base'}.to_yaml + "---\n* Author outline\n{:toc}\n\n" + body)
  destination = File.expand_path(ENV.fetch('DEFAULT_CONTENT_OUTPUT', File.join(source, '_site')))
  config = Jekyll.configuration('source' => source, 'destination' => destination, 'quiet' => true,
    'url' => 'https://example.com', 'baseurl' => ENV.fetch('DEFAULT_CONTENT_BASEURL', '/project'), 'title' => 'Fixture', 'plugins' => ['jekyll-include-cache'],
    'navbar' => {'style' => 'classic', 'brand' => {'title' => 'Home'}},
    'chulapa-skin' => {'skin' => 'gitdev', 'highlight' => 'github'})
  # Jekyll 3 looks for layouts in the working directory before the source.
  Dir.chdir(source) { Jekyll::Site.new(config).process }
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
    index = Nokogiri::HTML5(File.read(File.join(destination, 'indexcategory.html')))
    cards = index.css('.chulapa-border-card-index').to_h { |card| [card.at_css('h2').text, card] }
    {'01' => 'header.png', '02' => 'og.png', '03' => 'og.png', '04' => nil, '05' => nil}.each do |day, image|
      title = titles.fetch(day)
      card = cards.fetch(title)
      thumbnail = card.at_css('a.chulapa-card-img')
      if image
        raise "Wrong thumbnail for #{title}" unless thumbnail && thumbnail['style'] == "background-image: url('https://example.com#{config['baseurl']}/#{image}')"
        raise "Invalid thumbnail link for #{title}" unless thumbnail['aria-label'] == title && thumbnail['href'] == card.at_css('a.u-url')['href']
      else
        raise "Unexpected image column for #{title}" if thumbnail
      end
    end
    neighbors = {'01' => {'next' => '02'}, '02' => {'prev' => '01', 'next' => '03'},
      '03' => {'prev' => '02', 'next' => '04'}, '04' => {}, '05' => {'prev' => '04'}}
    neighbors.each do |day, expected|
      doc = Nokogiri::HTML5(File.read(File.join(destination, "example/2024/01/#{day}/entry.html")), max_errors: 20)
      raise "Parser repairs in post #{day}: #{doc.errors}" unless doc.errors.empty?
      nav = doc.at_css('nav[aria-label="Adjacent pages"]')
      links = nav ? nav.css('li > a') : []
      raise "Neighbor count: #{day}" unless links.size == expected.size && (expected.empty? == nav.nil?)
      links.zip(expected.to_a).each do |link, (direction, target)|
        expected_url = "https://example.com#{config['baseurl']}/example/2024/01/#{target}/entry.html"
        label = direction == 'prev' ? 'Previous' : 'Next'
        raise "Neighbor destination: #{day}/#{direction}" unless link['rel'] == direction && link['href'] == expected_url
        raise "Unavailable or incorrectly named neighbor: #{day}/#{direction}" unless
          !link.key?('tabindex') && link.text.gsub(/\s+/, ' ').strip == "#{label}: #{titles.fetch(target)}"
      end
    end
  end
  puts "Default content fixtures passed on Jekyll #{Jekyll::VERSION}: #{destination}"
end
