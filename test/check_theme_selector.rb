require 'jekyll'
require 'jekyll-include-cache'
require 'nokogiri'
require 'tmpdir'
require 'fileutils'

root = File.expand_path('..', __dir__)
font_url = 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100..700&family=Inter:wght@100..900&family=Inter+Tight:wght@100..900&display=swap'
font_markup = '{% include snippets/skin-fonts.html %}{% for font in site.googlefonts %}<link rel="stylesheet" href="{{ font.url | escape }}">{% endfor %}'
font_cases = [
  ['gitdev', nil, [], 1], ['gitdev-dark', nil, [], 1],
  ['none', 'gitdev-dark', [], 1], ['none', 'gitdev', [], 1],
  ['none', nil, [], 0], ['none', 'darkly', [], 0],
  ['gitdev', 'gitdev-dark', [], 1],
  ['gitdev', 'gitdev-dark', [{'url' => font_url}], 1]
]
font_cases.each do |light, dark, fonts, expected|
  site = {'source' => root, 'quiet' => true, 'plugins' => [], 'googlefonts' => fonts,
    'chulapa-skin' => {'skin' => light}, 'chulapa-skin-dark' => {'skin' => dark}}
  jekyll_site = Jekyll::Site.new(Jekyll.configuration(site))
  rendered = jekyll_site.liquid_renderer.file('skin-fonts-test').parse(font_markup).render!({'site' => site}, registers: {site: jekyll_site})
  links = Nokogiri::HTML(rendered).css('link[rel=stylesheet]').select { |link| link['href'] == font_url }
  raise "Independent skin fonts: #{light}/#{dark}" unless links.size == expected
end
predicate = Liquid::Template.parse(File.read(File.join(root, '_includes/snippets/dark-skin-enabled.html')) + '{{ dark_skin_enabled }}')
[
  [nil, false],
  [{'vars' => {'primary' => nil}}, false],
  [{'vars' => {'primary' => '', 'secondary' => ' '}}, false],
  [{'vars' => {'enable-rounded' => false}}, true],
  [{'vars' => {'border-width' => 0}}, true],
  [{'autothemer' => false}, false],
  [{'autothemer' => true}, true],
  [{'skin' => 'gitdev-dark'}, true],
  [{'highlight' => 'github.dark'}, true]
].each do |settings, enabled|
  actual = predicate.render!('site' => {'chulapa-skin-dark' => settings}).strip
  raise "Dark configuration activation: #{settings.inspect}: #{actual}" unless actual == enabled.to_s
end
output = File.expand_path(ARGV.fetch(0, File.join(Dir.tmpdir, 'chulapa-theme-selector')))
FileUtils.mkdir_p(output)
fixtures = %w[classic fab dual].product([true, false]).map { |style, links| ["#{style}-#{links ? 'links' : 'empty'}", style, links, true] }
fixtures += [['root', 'classic', true, true], ['disabled', 'classic', true, false], ['blank', 'classic', true, false], ['dark-color-only', 'classic', true, true], ['light-color-only', 'classic', true, true]]
fixtures << ['blank-vars', 'classic', false, false]
fixtures = %w[classic fab dual].map { |style| ["null-vars-#{style}", style, false, false] } + fixtures
fixtures.each do |name, style, links, enabled|
  Dir.mktmpdir('chulapa-theme-source-') do |source|
    %w[_includes _layouts _sass assets].each { |dir| FileUtils.cp_r(File.join(root, dir), source) }
    File.write(File.join(source, 'article.md'), "---\nlayout: default\ntitle: Theme selector\n---\n## A heading\n\nA paragraph with a [link](#a-heading).\n\n```ruby\nputs 'Hello'\n```\n")
    File.write(File.join(source, 'second.md'), "---\nlayout: default\ntitle: Second page\n---\nSecond page.")
    File.write(File.join(source, 'assets/css/custom.scss'), "---\n---\nbody { border-top: 3px solid rgb(255, 0, 0); }\n")
    baseurl = name == 'root' ? '' : '/project'
    config = {'source' => source, 'destination' => File.join(output, name, baseurl),
      'url' => "http://#{name}.localhost:8770", 'baseurl' => baseurl, 'quiet' => true,
      'plugins' => ['jekyll-include-cache'], 'title' => 'Theme selector fixture',
      'chulapa-skin' => {'skin' => 'gitdev', 'highlight' => 'github', 'vars' => {'primary' => '#123456', 'font-size-base' => '1.05rem'}},
      'navbar' => {'style' => style, 'brand' => {'title' => 'Home'},
        'nav' => links ? [{'title' => 'Article', 'url' => '/article.html'}] : nil}}
    config['chulapa-skin-dark'] = {'skin' => 'gitdev-dark', 'highlight' => 'github.dark', 'vars' => {'primary' => '#abcdef', 'font-size-base' => '1.1rem'}} if enabled
    config['chulapa-skin']['vars'].delete('primary') if name == 'dark-color-only'
    config['chulapa-skin-dark']['vars'].delete('primary') if name == 'light-color-only'
    config['chulapa-skin-dark'] = {'skin' => nil, 'highlight' => nil, 'autothemer' => nil, 'vars' => nil} if name == 'blank'
    config['chulapa-skin-dark'] = {'skin' => '', 'highlight' => nil, 'autothemer' => false, 'vars' => {'primary' => nil}} if name.start_with?('null-vars-')
    config['chulapa-skin-dark'] = {'skin' => ' ', 'highlight' => '', 'autothemer' => false, 'vars' => {'primary' => nil, 'secondary' => '', 'body-bg' => '  '}} if name == 'blank-vars'
    config['chulapa-skin-dark']['vars'].merge!({'secondary' => nil, 'body-bg' => ' ', 'enable-rounded' => false, 'border-width' => 0}) if name == 'classic-links'
    if %w[dark-color-only light-color-only].include?(name)
      File.write(File.join(source, '_includes/custom/custom_head.html'), '<meta name="theme-color" id="custom-theme-color" media="(prefers-color-scheme: dark)" content="#987654">')
      config['chulapa-skin-dark']['skin'] = name == 'dark-color-only' ? 'darkly' : 'gitdev'
    end
    Jekyll::Site.new(Jekyll.configuration(config)).process
    html = File.read(File.join(config['destination'], 'article.html'))
    doc = Nokogiri::HTML(html)
    credit = doc.at_css('.chulapa-footer-brand').text
    raise 'Light skin credit missing' unless credit.include?('GitDev skin by dieghernan')
    expected_dark = name == 'dark-color-only' ? 'Darkly skin by Bootswatch' : 'GitDev Dark skin by dieghernan'
    if enabled && name != 'light-color-only'
      raise "Dark skin credit missing: #{name}" unless credit.include?(expected_dark)
    else
      raise 'Duplicated or disabled skin credit' unless credit.scan('skin by').size == 1
    end
    selectors = doc.css('.chulapa-theme-selector')
    raise "Selector count: #{name}" unless selectors.size == (enabled ? (style == 'dual' ? 2 : 1) : 0)
    ids = doc.css('[id]').map { |node| node['id'] }
    raise "Duplicate IDs: #{name}" unless ids.uniq == ids
    selectors.each do |selector|
      raise 'Selector visible without JavaScript' unless selector.key?('hidden')
      button = selector.at_css('button.chulapa-theme-toggle')
      raise 'Missing accessible dropdown name' unless button['aria-label'] == 'Color theme: Light'
      raise 'Missing group name' unless selector.at_css('[role=group]')['aria-labelledby'] == button['id']
      raise 'Missing theme choices' unless selector.css('[data-theme-mode]').map { |node| node['data-theme-mode'] } == %w[light dark auto]
    end
    css = File.read(File.join(config['destination'], 'assets/css/main.css'))
    font_links = doc.css('link[rel=stylesheet]').select { |link| link['href'] == font_url }
    raise "Missing or duplicated independent GitDev fonts: #{name}" unless font_links.size == 1
    raise 'Optional fonts still imported by light CSS' if css.include?('fonts.googleapis.com')
    raise 'Light override missing' unless css.include?('1.05rem')
    dark = File.read(File.join(config['destination'], 'assets/css/dark/main.css'))
    raise 'Optional fonts still imported by GitDev dark CSS' if config.dig('chulapa-skin-dark', 'skin') == 'gitdev-dark' && dark.include?('fonts.googleapis.com')
    raise 'Dark settings ignored' if enabled && (!dark.include?('1.1rem') || dark == css)
    raise 'Disabled dark CSS compiled' if !enabled && dark.include?('font-face')
    raise 'Disabled selector CSS compiled' if !enabled && css.include?('chulapa-theme-toggle')
    raise 'Incorrect baseurl' unless html.include?("#{baseurl}/assets/css/main.css")
    raise 'Unexpected selector controller' if !enabled && html.include?("var key = 'chulapa-theme'")
    if name == 'root'
      [[nil, 'github'], [nil, nil], ['github.dark', 'github']].each do |dark_highlight, light_highlight|
        config['chulapa-skin-dark']['highlight'] = dark_highlight
        config['chulapa-skin']['highlight'] = light_highlight
        Jekyll::Site.new(Jekyll.configuration(config)).process
        expected = dark_highlight || light_highlight || 'default'
        actual = File.read(File.join(config['destination'], 'assets/css/highlighterdark.css')).gsub(%r{/\*# sourceMappingURL=.*?\*/}, '')
        baseline = File.read(File.join(config['destination'], 'assets/css/highlighter.css')).gsub(%r{/\*# sourceMappingURL=.*?\*/}, '')
        raise "Dark highlighter fallback failed: #{expected}" if !dark_highlight && actual != baseline
        raise 'Explicit dark highlighter ignored' if dark_highlight && actual == baseline
      end
    end
    puts "Theme selector passed: #{name}"
  end
end
puts "Theme selector browser fixtures: #{output}"
