# Run from test: bundle exec ruby check_compress_html.rb
require "jekyll"

root = File.expand_path("..", __dir__)
source = File.read(File.join(root, "_layouts/compress.html")).sub(/\A---.*?---\s*/m, "")
fixtures = [
  ["<div>one</div>\n\n \t\r\n<p>two  words</p>\n", "<div>one</div>\n<p>two  words</p>\n"],
  ["<pre class='code'>  a\n\n b\t</pre>\n\n<p>x</p>", "<pre class='code'>  a\n\n b\t</pre>\n<p>x</p>\n"],
  ["<div>\0</div>\n\0\n", "<div>\0</div>\n\0\n"],
  ["<head>\n    <meta charset='utf-8'>\n    <link href='style.css'>\n</head>\n <div>x</div>", "<head>\n    <meta charset='utf-8'>\n    <link href='style.css'>\n</head>\n<div>x</div>\n"]
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

footer = "  <footer class=\"footer-chulapa text-center\">\n    <div class=\"container\">\n\n      <p>Two  words and <span>inline text</span>.</p>\n    </div>\n  </footer>"
content = "  <main>\n    <p>Body text.</p>\n  </main>\n#{footer}\n"
readable = Liquid::Template.parse(source).render!({"content" => content, "site" => {"compress_html" => {"blanklines" => true, "clippings" => "all"}}})
expected = " <main>\n   <p>Body text.</p>\n </main>\n#{footer.sub("\n\n", "\n")}\n"
raise "Footer indentation lost or body clipping changed: #{readable.inspect}" unless readable == expected
[nil, [], %w[div p]].each do |clippings|
  output = Liquid::Template.parse(source).render!({"content" => content, "site" => {"compress_html" => {"blanklines" => true, "clippings" => clippings}}})
  raise "Footer indentation changed with clippings=#{clippings.inspect}" unless output.include?(footer.sub("\n\n", "\n"))
end
compact = Liquid::Template.parse(source).render!({"content" => content, "site" => {"compress_html" => {"clippings" => "all"}}})
raise "Full compression unexpectedly preserves indentation" if compact.include?("\n    <div")
puts "Readable footer indentation and explicit full compression passed."
