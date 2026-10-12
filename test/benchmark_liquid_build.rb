# Run from test: bundle exec ruby benchmark_liquid_build.rb [THEME_PATH ...]
require 'jekyll'
require 'jekyll-include-cache'
require 'tmpdir'
require 'fileutils'
require 'benchmark'
require 'json'
root = File.expand_path('..', __dir__)
variants = (ARGV.empty? ? [root] : ARGV).to_h { |path| [path, File.expand_path(path)] }
results = {}
variants.each do |name, theme|
  Dir.mktmpdir('chulapa-bench-') do |source|
    %w[_includes _layouts].each { |dir| FileUtils.cp_r(File.join(theme, dir), source) }
    File.write(File.join(source, '_layouts/default.html'), '{{ content }}')
    File.write(File.join(source, '_layouts/footer-test.html'), '{% include_cached footer.html pageurl=page.url pageid=page.id pagetitle=page.title %}')
    FileUtils.mkdir_p(File.join(source, '_entries'))
    100.times do |i|
      File.write(File.join(source, "_entries/entry#{i}.md"), "---\ntitle: Entry **#{i}**\nsubtitle: A *subtitle*\ndate: 2024-01-01\ntags: [tag0, tag1, tag2, tag3, tag4, tag5, tag6, tag7, tag8, tag9, tag10, tag11, tag12, tag13, tag14, tag15, tag16, tag17, tag18, tag19]\ncategories: [one, two, three]\n---\n" + 'word ' * 1000)
      File.write(File.join(source, "footer#{i}.html"), "---\nlayout: footer-test\ntitle: Page #{i}\n---\n")
    end
    %w[cloudtag cloudcategory].each { |layout| File.write(File.join(source, "#{layout}.html"), "---\nlayout: #{layout}\n---\n") }
    config = Jekyll.configuration('source' => source, 'destination' => File.join(source, '_site'), 'theme' => nil, 'remote_theme' => nil, 'plugins' => ['jekyll-include-cache'], 'collections' => {'entries' => {'output' => false}}, 'chulapa-skin' => {'skin' => 'navi'}, 'footer' => {'links' => [{'url' => '/link', 'label' => 'Link', 'icon' => 'fa fa-link'}]}, 'quiet' => true)
    site = Jekyll::Site.new(config)
    site.process # Warm up parsers and Ruby; include caches reset at each build.
    times = 3.times.map { Benchmark.realtime { site.process } }
    results[name] = {'seconds' => times, 'median' => times.sort[1]}
  end
end
puts JSON.pretty_generate(results)
