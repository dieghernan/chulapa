# Run from test: bundle exec ruby check_compress_html.rb
require "jekyll"

root = File.expand_path("..", __dir__)
source = File.read(File.join(root, "_layouts/compress.html")).sub(/\A---.*?---\s*/m, "")
fixtures = [
  ["<div>one</div>\n\n \t\r\n<p>two  words</p>\n", "<div>one</div>\n<p>two  words</p>\n"],
  ["<pre class='code'>  a\n\n b\t</pre>\n\n<p>x</p>", "<pre class='code'>  a\n\n b\t</pre>\n<p>x</p>\n"],
  ["<div>\0</div>\n\0\n", "<div>\0</div>\n\0\n"]
]
fixtures.each do |content, expected|
  output = Liquid::Template.parse(source).render!(
    {"content" => content, "site" => {"compress_html" => {"blanklines" => true, "clippings" => "all"}}}
  )
  raise "Compression changed meaningful whitespace: #{output.inspect}" unless output == expected
  ignored = Liquid::Template.parse(source).render!(
    {"content" => content, "site" => {"compress_html" => {"ignore" => {"envs" => "all"}}}}
  )
  raise "Ignored compression changed content" unless ignored == content + "\n"
end
puts "HTML compression whitespace and preformatted content checks passed."
