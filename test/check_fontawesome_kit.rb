# Run from the repository root: bundle exec ruby test/check_fontawesome_kit.rb
require "jekyll"
require "tmpdir"
require "fileutils"

root = File.expand_path("..", __dir__)
Dir.mktmpdir("chulapa-fontawesome-") do |source|
  FileUtils.cp_r(File.join(root, "_includes"), source)
  FileUtils.mkdir_p(File.join(source, "_layouts"))
  File.write(File.join(source, "_layouts/head.html"), "{% include head.html %}{{ content }}")
  File.write(File.join(source, "index.md"), "---\nlayout: head\ntitle: Kit test\n---\n")
  cases = [
    [{}, nil, 7],
    [{"fa_v4_support" => true}, nil, 7],
    [{"fa_version" => 6, "fa_v4_support" => true}, nil, 6],
    [{"fa_version" => 5, "fa_v4_support" => true}, nil, 5],
    [{"fa_kit_code" => "current-kit", "fa_v4_support" => true}, "current-kit", nil],
    [{"fa5_kit_code" => "legacy-kit"}, "legacy-kit", nil],
    [{"fa_kit_code" => "current-kit", "fa5_kit_code" => "legacy-kit"}, "legacy-kit", nil],
    [{"fa_kit_code" => "current-kit", "fa5_kit_code" => ""}, "current-kit", nil]
  ]
  cases.each do |settings, expected_kit, version|
    config = Jekyll.configuration({"source" => source, "destination" => File.join(source, "_site"), "quiet" => true}.merge(settings))
    Jekyll::Site.new(config).process
    html = File.read(File.join(config["destination"], "index.html"))
    kit = html.scan(%r{https://kit\.fontawesome\.com/([^"/]+)\.js}).flatten
    raise "Unexpected kit for #{settings}: #{kit}" unless kit == Array(expected_kit)
    hosted = html.scan(%r{@fortawesome/fontawesome-free@([^"]+)})
    expected_styles = version ? ["#{version}/css/all.min.css"] : []
    expected_styles << "#{version}/css/v4-shims.min.css" if version && settings["fa_v4_support"]
    raise "Unexpected stylesheets for #{settings}: #{hosted}" unless hosted.flatten == expected_styles
  end
end
puts "Font Awesome kit checks passed."
