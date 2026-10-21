# Build every named skin and the real GitDev catalog entry points.
require 'jekyll'
require 'jekyll-include-cache'
require 'fileutils'
require 'tmpdir'
require 'json'
root = File.expand_path('..', __dir__)
output = File.expand_path(ARGV.fetch(0))
Dir.mktmpdir('chulapa-font-source-') do |source|
  %w[_includes _layouts _sass].each { |dir| FileUtils.cp_r(File.join(root, dir), source) }
  FileUtils.mkdir_p(File.join(source, 'assets/css/dark'))
  FileUtils.mkdir_p(File.join(source, 'assets/fonts/Chulapa'))
  FileUtils.cp(File.join(root, 'assets/fonts/Chulapa/Chulapa-Bold_vmod.otf'), File.join(source, 'assets/fonts/Chulapa'))
  %w[main.scss dark/main.scss highlighter.scss dark/highlighter.scss].each do |file|
    FileUtils.cp(File.join(root, 'assets/css', file), File.join(source, 'assets/css', file))
  end
  File.write(File.join(source, 'index.html'), "---\n---\n<!doctype html><html><head>{% include theme-styles.html %}</head><body><h1>Font probe</h1><p>Fallback text</p>{% include components/theme-selector.html %}</body></html>")
  skins = Dir.glob(File.join(root, '_sass/skins/*.scss')).map { |file| File.basename(file, '.scss') } - %w[dark-bg]
  config = {'source' => source, 'quiet' => true, 'plugins' => ['jekyll-include-cache'],
    'chulapa-skin' => {'skin' => 'none', 'highlight' => 'cran'}}
  skins.each do |skin|
    config.merge!('destination' => File.join(output, skin), 'baseurl' => "/#{skin}",
      'chulapa-skin-dark' => {'skin' => skin, 'highlight' => 'github.dark'})
    Jekyll::Site.new(Jekyll.configuration(config)).process
  end
  FileUtils.mkdir_p(output)
  File.write(File.join(output, 'skins.json'), JSON.generate(skins))
  # The catalog uses Navi globally and selects GitDev via page.skin/custom head.
  FileUtils.mkdir_p(File.join(source, 'collections/_skins'))
  FileUtils.mkdir_p(File.join(source, 'assets/css/skins'))
  FileUtils.cp(File.join(root, 'docs/_includes/custom/custom_head.html'), File.join(source, '_includes/custom/custom_head.html'))
  FileUtils.cp_r(File.join(root, 'docs/_includes/skins'), File.join(source, '_includes'))
  %w[gitdev gitdev-dark].each do |skin|
    FileUtils.cp(File.join(root, "docs/collections/_skins/#{skin}.md"), File.join(source, 'collections/_skins'))
    FileUtils.cp(File.join(root, "docs/assets/css/skins/#{skin}.scss"), File.join(source, 'assets/css/skins'))
  end
  config.merge!('destination' => File.join(output, 'catalog'), 'baseurl' => '/catalog',
    'url' => 'http://catalog.localhost', 'collections_dir' => 'collections',
    'collections' => {'skins' => {'output' => true}}, 'chulapa-skin' => {'skin' => 'navi', 'highlight' => 'cran'},
    'chulapa-skin-dark' => nil)
  Jekyll::Site.new(Jekyll.configuration(config)).process
  %w[gitdev gitdev-dark].each do |skin|
    css = File.read(File.join(output, "catalog/assets/css/skins/#{skin}.css"))
    raise "Standalone font import missing: #{skin}" unless css.match?(/@import\s+url\(/)
  end
  puts "Built #{skins.size} skin font fixtures and both GitDev catalog previews: #{output}"
end
