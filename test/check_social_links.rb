require "jekyll"
require "jekyll-include-cache"
require "nokogiri"
require "fileutils"
require "tmpdir"
require "uri"
require "yaml"

Dir.mktmpdir("chulapa-sharing-") do |source|
  FileUtils.cp_r(File.expand_path("../_includes", __dir__), source)
  FileUtils.mkdir_p(File.join(source, "_layouts"))
  File.write(File.join(source, "_layouts", "sharing.html"), <<~LIQUID)
    <!doctype html>
    <html><body>
    {% include components/breadcrumbdatesocial.html %}
    {% include components/footer-content.html %}
    {{ content }}
    </body></html>
  LIQUID

  title = "Café & **té** #1"
  tags = ["R-maps", "Málaga & más"]
  pages = {
    "article" => {"tags" => tags},
    "canonical" => {"canonical_url" => "/original/?q=R%2Bstats&filter=a%26b%3Dc&exact=%252B#section", "tags" => tags},
    "external" => {"canonical_url" => "https://example.net/café maps/?q=R%2Bstats&exact=%252B"},
    "no-tags" => {},
    "disabled" => {"show_sociallinks" => false}
  }
  pages.each do |name, options|
    data = {"layout" => "sharing", "title" => title, "show_sociallinks" => true}.merge(options)
    File.write(File.join(source, "#{name}.md"), "#{data.to_yaml}---\nContent.\n")
  end
  footer_links = [
    {"url" => "https://social.example/@reader", "label" => "Profile", "icon" => "fab fa-github"},
    {"url" => "/contact/", "label" => "Contact", "icon" => "fa fa-link"},
    {"url" => "reader@example.com", "label" => "Email", "icon" => "fa fa-envelope"}
  ]
  ["", "/subdir"].each do |baseurl|
    root_url = "https://example.com#{baseurl}"
    config = Jekyll.configuration(
      "source" => source, "destination" => File.join(source, "_site"),
      "url" => "https://example.com", "baseurl" => baseurl, "title" => "Maps & data",
      "twitter_site" => "maps", "footer" => {"links" => footer_links}, "quiet" => true,
      "fa_version" => baseurl.empty? ? 5 : "5"
    )
    Jekyll::Site.new(config).process
    pages.each do |name, options|
      output = File.join(config["destination"], "#{name}.html")
      doc = Nokogiri::HTML(File.read(output, encoding: "UTF-8"))
      links = doc.css('a[aria-label^="Share on"]')
      if name == "disabled"
        raise "Disabled share links rendered" unless links.empty?
        next
      end

      canonical = {
        "canonical" => "#{root_url}/original/?q=R%2Bstats&filter=a%26b%3Dc&exact=%252B",
        "external" => "https://example.net/caf%C3%A9%20maps/?q=R%2Bstats&exact=%252B"
      }.fetch(name, "#{root_url}/#{name}.html")
      share_title = "Café & té #1"
      share_text = "#{share_title} #{canonical}"
      bluesky_text = options["tags"] ? "#{share_text} #Rmaps #Málaga&más" : share_text
      expected = {
        "Share on X" => ["twitter.com", {"url" => canonical, "text" => share_title, "via" => "maps"}],
        "Share on Bluesky" => ["bsky.app", {"text" => bluesky_text}],
        "Share on Facebook" => ["www.facebook.com", {"u" => canonical}],
        "Share on WhatsApp" => ["api.whatsapp.com", {"text" => share_text}],
        "Share on LinkedIn" => ["www.linkedin.com", {"url" => canonical, "title" => share_title}]
      }
      expected["Share on X"].last["hashtags"] = "Rmaps,Málaga&más" if options["tags"]
      actual = links.to_h do |link|
        url = URI.parse(link["href"])
        raise "Share URL unexpectedly contains a fragment: #{url}" if url.fragment
        [link["aria-label"], [url.host, URI.decode_www_form(url.query).to_h]]
      end
      raise "Share links in #{name} at #{root_url}: #{actual.inspect}" unless actual == expected
      raise "Bluesky text missing with Font Awesome 5" unless links[1].text.strip == "Bluesky"
      raise "X icon missing its Font Awesome 5 class" unless links[0].at_css("i.fab.fa-twitter-square")

      footer = doc.css('.chulapa-footer-sociallink').to_h { |link| [link.at_css(".sr-only").text, link["href"]] }
      expected_footer = {
        "Profile" => "https://social.example/@reader",
        "Contact" => "#{root_url}/contact/",
        "Email" => "mailto:reader@example.com?subject=Maps%20%26%20data%20web%20contact"
      }
      raise "Footer links in #{name} at #{root_url}: #{footer.inspect}" unless footer == expected_footer
    end
  end
end

puts "Social link checks passed on Jekyll #{Jekyll::VERSION}."
