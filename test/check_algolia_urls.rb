# Run from the repository root: bundle exec ruby test/check_algolia_urls.rb
require "jekyll"
require "tmpdir"
require "fileutils"
require "open3"

root = File.expand_path("..", __dir__)
Dir.mktmpdir("chulapa-algolia-urls-") do |source|
  FileUtils.cp(File.join(root, "assets/js/algolia/algolia-search.js"), source)
  ["", "/chulapa", "/chulapa/"].each do |baseurl|
    config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"), "url" => "https://example.com", "baseurl" => baseurl, "quiet" => true)
    Jekyll::Site.new(config).process
    script = File.read(File.join(config["destination"], "algolia-search.js"))
    assertions = <<~JS
      const assert = require('node:assert/strict');
      const prefix = #{("https://example.com" + baseurl.sub(%r{/$}, "")).inspect};
      for (const [path, suffix] of [['/post/', '/post/'], ['post/', '/post/'], ['/', '/'], ['/post/?q=a%2Fb#part', '/post/?q=a%2Fb#part']]) {
        const expected = prefix + suffix;
        assert.equal(resultUrl(path), expected);
        for (const image of [undefined, '/image.png']) {
          const hit = {url: path, title: 'Post', header_img: image, _highlightResult: {title: {value: 'Post'}}};
          const links = [...hitTemplate(hit).matchAll(/href="([^"]+)"/g)].map(match => match[1]);
          assert.equal(links.length, image ? 2 : 1);
          for (const link of links) assert.equal(link, expected);
        }
      }
      assert.equal(resultUrl('https://other.example/post/'), 'https://other.example/post/');
      assert.equal(resultUrl('//other.example/post/'), '//other.example/post/');
    JS
    # Exercise the generated helper and both result templates without the hosted API.
    functions = script[script.index("function imgurl")...script.index("search.addWidgets")]
    output, status = Open3.capture2e("node", stdin_data: functions + assertions)
    raise "Algolia URL checks failed for #{baseurl.inspect}: #{output}" unless status.success?
  end
end
puts "Algolia URL checks passed (root, repository path, trailing slash and external URLs)."
