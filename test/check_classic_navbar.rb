require 'jekyll'
require 'jekyll-include-cache'
require 'nokogiri'
require 'tmpdir'
require 'fileutils'

root = File.expand_path('..', __dir__)
Dir.mktmpdir('chulapa-classic-navbar-') do |source|
  %w[_includes _layouts].each { |dir| FileUtils.cp_r(File.join(root, dir), source) }
  FileUtils.cp(File.join(root, 'docs/_pages/demo_classicnavbar.html'), File.join(source, 'demo.html'))
  File.write(File.join(source, 'standard.html'), "---\nlayout: null\n---\n{% include navbar.html pageurl='/demo/classic-navbar' %}")
  File.write(File.join(source, '_includes/custom/custom_bottomscripts.html'), '<script id="custom-bottom">/* custom hook */</script>')
  ['', '/project'].each do |baseurl|
    [nil, 'sm', 'lg', 'xl', 'always', 'never'].each do |expand|
      navbar = {'brand' => {'title' => 'Home'}, 'expand' => expand,
        'nav' => [{'title' => 'Home', 'url' => '/'}, {'title' => 'Demos', 'child' => [{'title' => 'Classic', 'url' => '/demo/classic-navbar'}]}]}
      config = Jekyll.configuration('source' => source, 'destination' => File.join(source, '_site'),
        'url' => 'https://example.com', 'baseurl' => baseurl, 'quiet' => true,
        'navbar' => navbar, 'search' => {'provider' => 'fusejs', 'landing_page' => '/find'})
      Jekyll::Site.new(config).process
      read = ->(file) { Nokogiri::HTML(File.read(File.join(config['destination'], file))) }
      standard = read.call('standard.html').at_css('nav.navbar')
      [nil, 'fab', 'dual'].each do |style|
        config['navbar']['style'] = style
        Jekyll::Site.new(config).process
        demo = read.call('demo/classic-navbar.html')
        nav = demo.at_css('nav.navbar')
        normalize = ->(node) { node.to_html.gsub(/>\s+</, '><').gsub(/\s+/, ' ').strip }
        raise "Demo and real classic navbar differ: #{expand}/#{style}/#{baseurl}\n#{normalize.call(nav)}\n#{normalize.call(standard)}" unless normalize.call(nav) == normalize.call(standard)
        raise 'Floating navbar leaked into demo' unless demo.css('#navi-toggle').empty?
        expected = expand == 'always' ? 'navbar-expand' : expand == 'never' ? nil : "navbar-expand-#{expand || 'md'}"
        classes = nav['class'].split.grep(/^navbar-expand/)
        raise 'Wrong expansion breakpoint' unless classes == [expected].compact
        raise 'Dropdown is not a native button' unless nav.at_css('button.dropdown-toggle[type=button]')
        current = nav.at_css('a[aria-current=page]')
        raise 'Current link incorrect' unless current && current['href'] == "https://example.com#{baseurl}/demo/classic-navbar"
        raise 'Search destination incorrect' unless nav.css('a').any? { |a| a['href'] == "https://example.com#{baseurl}/find" }
        %w[jquery popper bootstrap].each do |library|
          raise "Duplicate/missing #{library}" unless demo.css('script[src]').count { |s| s['src'].include?(library) } == 1
        end
        raise 'Custom hook duplicated' unless demo.css('#custom-bottom').size == 1
        raise 'Theme script missing' unless demo.at_css("script[src='#{baseurl}/assets/js/chulapa_script.js']")
      end
    end
  end
end
puts 'Classic navbar parity passed: theme/demo, root/project, breakpoints, style isolation, active/search links and shared scripts.'
