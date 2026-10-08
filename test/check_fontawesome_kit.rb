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
    [{}, nil],
    [{"fa_kit_code" => "current-kit"}, "current-kit"],
    [{"fa5_kit_code" => "legacy-kit"}, "legacy-kit"],
    [{"fa_kit_code" => "current-kit", "fa5_kit_code" => "legacy-kit"}, "legacy-kit"],
    [{"fa_kit_code" => "current-kit", "fa5_kit_code" => ""}, "current-kit"]
  ]
  cases.each do |settings, expected|
    config = Jekyll.configuration({"source" => source, "destination" => File.join(source, "_site"), "quiet" => true}.merge(settings))
    Jekyll::Site.new(config).process
    html = File.read(File.join(config["destination"], "index.html"))
    kit = html.scan(%r{https://kit\.fontawesome\.com/([^"/]+)\.js}).flatten
    raise "Unexpected kit for #{settings}: #{kit}" unless kit == (expected ? [expected] : [])
    hosted = html.include?("@fortawesome/fontawesome-free@6/css/all.min.css")
    raise "Unexpected stylesheet for #{settings}" unless hosted == expected.nil?
  end
end
puts "Font Awesome kit checks passed."
