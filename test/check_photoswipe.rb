require 'jekyll'
require 'jekyll-include-cache'
require 'tmpdir'
require 'fileutils'
require 'nokogiri'

root = File.expand_path('..', __dir__)
Dir.mktmpdir('chulapa-photoswipe-') do |source|
  %w[_layouts _includes _sass assets].each { |dir| FileUtils.cp_r(File.join(root, dir), source) }
  FileUtils.mkdir_p(File.join(source, 'images'))
  [[1600, 1000], [800, 1200], [600, 200]].each_with_index do |(width, height), i|
    File.write(File.join(source, "images/#{i}.svg"), %(<svg xmlns="http://www.w3.org/2000/svg" width="#{width}" height="#{height}"><rect width="100%" height="100%" fill="#{%w[teal coral purple][i]}"/><text x="20" y="80" font-size="60" fill="white">Image #{i + 1}</text></svg>))
  end
  gallery = 'http://localhost:8768/images/0.svg,http://localhost:8768/images/1.svg,http://localhost:8768/images/2.svg'
  # Internal images also exercise subdirectory URLs and the include cache key.
  gallery_body = <<~LIQUID
    <section id="masonry-on">{% include_cached snippets/masonry.html internal="gallery" index_sort="basename" index_sort_asc=true photoswipe=true %}</section>
    <section id="masonry-off">{% include_cached snippets/masonry.html internal="gallery" index_sort="basename" index_sort_asc=true %}</section>
    <section id="carousel-on">{% include_cached snippets/carousel.html internal="gallery" index_sort="basename" index_sort_asc=true photoswipe=true interval=1000 controls=true indicators=true %}</section>
    <section id="carousel-static">{% include_cached snippets/carousel.html internal="gallery" index_sort="basename" index_sort_asc=true controls=true indicators=true interval=0 %}</section>
    <section id="external">{% include_cached snippets/masonry.html external="#{gallery}" photoswipe=true %}</section>
  LIQUID
  %w[default minimal landingpage].each do |layout|
    File.write(File.join(source, "#{layout}.md"), "---\nlayout: #{layout}\ntitle: PhotoSwipe fixture\n---\n#{gallery_body}")
  end
  File.write(File.join(source, '_layouts/standalone-carousel.html'), <<~LIQUID)
    <!doctype html><html lang="en"><head><title>Layout carousel</title><link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}"></head><body>
    <main><h1>Layout-owned carousels</h1>{{ content }}
    {% include_cached snippets/carousel.html internal='gallery' index_sort='basename' index_sort_asc=true controls=true indicators=true interval=1000 %}
    {% include_cached snippets/carousel.html internal='gallery' index_sort='basename' index_sort_asc=true controls=true indicators=true interval=1000 %}
    </main>{% include components/scripts.html %}</body></html>
  LIQUID
  %w[a b].each { |name| File.write(File.join(source, "layout-carousel-#{name}.md"), "---\nlayout: standalone-carousel\n---\nPlain page content.") }
  File.write(File.join(source, 'disabled.md'), "---\nlayout: default\n---\n{% include_cached snippets/masonry.html internal='gallery' photoswipe='true' %}")
  config_path = File.join(source, '_config.yml')
  File.write(config_path, "plugins: [jekyll-include-cache]\ntheme: null\nremote_theme: null\nchulapa-skin:\n  skin: chulapa\ndefaults:\n- scope:\n    path: images\n  values:\n    image_col: gallery\n")
  ['', '/subdir'].each do |baseurl|
    config = Jekyll.configuration('config' => config_path, 'source' => source,
      'destination' => File.join(source, '_site'), 'url' => 'http://localhost:8768', 'baseurl' => baseurl, 'quiet' => true,
      'sass' => {'quiet_deps' => true, 'silence_deprecations' => %w[import global-builtin color-functions abs-percent function-units]})
    Dir.chdir(source) { Jekyll::Site.new(config).process }
    %w[default minimal landingpage].each do |layout|
      doc = Nokogiri::HTML(File.read(File.join(config['destination'], "#{layout}.html")))
      raise 'Module URL ignores baseurl' unless doc.at_css('script[type="module"][src$="chulapa_photoswipe.js"]')['src'] == "#{baseurl}/assets/js/chulapa_photoswipe.js"
      raise 'Third party assets loaded at build time' if doc.css('script[src], link[href]').any? { |node| (node['src'] || node['href']).include?('photoswipe@') }
      %w[masonry-on carousel-on].each do |id|
        anchors = doc.css("##{id} a.chulapa-photoswipe-item")
        expected = (0..2).map { |i| "http://localhost:8768#{baseurl}/images/#{i}.svg" }
        raise 'Image links or order incorrect' unless anchors.map { |a| a['href'] } == expected
        raise 'Image metadata or accessible names missing' unless anchors.all? { |a| a['aria-label'] && a.at_css('img[itemprop="contentUrl"][alt]') }
      end
      raise 'Cache leaked opt-in into default gallery' unless doc.css('#masonry-off a').empty?
      controllers = doc.css('script[src$="chulapa_carousel.js"]')
      raise 'Carousel module missing or loaded as classic script' unless controllers.size == 2 && controllers.all? { |script| script['type'] == 'module' }
      raise 'Carousel module URLs disagree' unless controllers.map { |script| script['src'] }.uniq == ["#{baseurl}/assets/js/chulapa_carousel.js"]
      raise 'External galleries missing' unless doc.css('#external a.chulapa-photoswipe-item').size == 3
    end
    %w[a b].each do |name|
      doc = Nokogiri::HTML5(File.read(File.join(config['destination'], "layout-carousel-#{name}.html")))
      modules = doc.css('script[type="module"][src$="chulapa_carousel.js"]')
      raise 'Layout-owned cached carousel lacks controller' unless doc.css('.carousel').size == 2 && modules.size == 2 && modules.map { |script| script['src'] }.uniq == ["#{baseurl}/assets/js/chulapa_carousel.js"]
    end
    disabled = Nokogiri::HTML(File.read(File.join(config['destination'], 'disabled.html')))
    raise 'String true must not enable PhotoSwipe' unless disabled.css('[data-photoswipe-gallery], script[type="module"]').empty?
    if ARGV.first
      output = File.join(File.expand_path(ARGV.first), baseurl.empty? ? 'root' : 'subdir')
      FileUtils.mkdir_p(output)
      FileUtils.cp_r(config['destination'] + '/.', output)
    end
  end
end
puts 'PhotoSwipe layouts, opt-in cache isolation, images and root/subdirectory URLs passed.'
