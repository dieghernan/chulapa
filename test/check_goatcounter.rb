require 'jekyll'
require 'jekyll-include-cache'
require 'tmpdir'
require 'fileutils'
require 'nokogiri'
require 'json'

root = File.expand_path('..', __dir__)
original_env = ENV['JEKYLL_ENV']
layouts = %w[default minimal landingpage search]
cases = [
  ['production', nil, false], ['production', '', false], ['production', '   ', false],
  ['development', 'https://blog.goatcounter.com/count', false],
  ['production', false, false], ['production', 'https://', false], ['production', 'https:///count', false], ['production', 'javascript:alert(1)', false],
  ['production', 'http://stats.example.org/count', false],
  ['production', 'https://blog.goatcounter.com/count', true],
  ['production', '  https://stats.example.org/custom/count  ', true],
  ['production', 'https://stats.example.org/count?x="quoted"&y=<value>', true]
]
begin
  Dir.mktmpdir('chulapa-goatcounter-') do |source|
    %w[_includes _layouts].each { |dir| FileUtils.cp_r(File.join(root, dir), source) }
    layouts.each { |layout| File.write(File.join(source, "#{layout}.md"), "---\nlayout: #{layout}\ntitle: Analytics fixture\n---\nOrdinary content.") }
    config_path = File.join(source, '_config.yml')
    ['', '/subdir'].each do |baseurl|
      cases.each do |environment, endpoint, enabled|
        ENV['JEKYLL_ENV'] = environment
        config = {'plugins' => ['jekyll-include-cache'], 'theme' => nil, 'remote_theme' => nil,
          'source' => source, 'destination' => File.join(source, '_site'), 'url' => 'https://example.com',
          'baseurl' => baseurl, 'quiet' => true, 'goatcounter' => endpoint, 'gtag_id' => 'G-TEST'}
        File.write(config_path, config.to_yaml)
        Dir.chdir(source) do
          site = Jekyll::Site.new(Jekyll.configuration('config' => config_path, 'quiet' => true))
          site.process
        end
        layouts.each do |layout|
          doc = Nokogiri::HTML(File.read(File.join(config['destination'], "#{layout}.html")))
          scripts = doc.css('script[data-goatcounter]')
          raise "Wrong activation: #{environment} #{endpoint.inspect} #{layout}" unless scripts.size == (enabled ? 1 : 0)
          if enabled
            script = scripts.first
            raise 'Endpoint must be escaped and never prefixed with baseurl' unless script['data-goatcounter'] == endpoint.strip
            raise 'Official tracker URL changed' unless script['src'] == 'https://gc.zgo.at/count.js'
            raise 'Tracker must load asynchronously' unless script.key?('async')
            raise 'Tracker outside head' unless script.ancestors.any? { |node| node.name == 'head' }
          end
          raise 'Google analytics changed' unless doc.css('script[src^="https://www.googletagmanager.com/gtag/js"]').size == 1
          raise 'Endpoint created extra script markup' if doc.css('script').any? { |node| node.text.include?('alert(1)') }
          doc.css('script[type="application/ld+json"]').each { |node| JSON.parse(node.text) }
        end
      end
    end
  end
ensure
  ENV['JEKYLL_ENV'] = original_env
end
puts 'GoatCounter production gating, disabled defaults, layouts, escaping, Google coexistence and baseurl checks passed.'
