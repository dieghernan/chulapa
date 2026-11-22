# Exercise real provider templates while sharing the fixed footer cache.
require "jekyll"
require "jekyll-include-cache"
require "nokogiri"

root = File.expand_path("..", __dir__)
site = Jekyll::Site.new(Jekyll.configuration("source" => root, "quiet" => true, "plugins" => [], "theme" => nil, "remote_theme" => nil, "url" => "https://example.com", "baseurl" => ""))
template = Liquid::Template.parse('{% include_cached footer.html show_comments=page.show_comments pageurl=page.url pageid=page.id pagetitle=page.title %}')
selectors = {"disqus" => "#disqus_thread", "cusdis" => "#cusdis_thread", "cactus" => "#comment-section", "welcomments" => "#welcomments__form"}
selectors.each do |provider, selector|
  JekyllIncludeCache.reset
  values = {"url" => "https://example.com", "title" => "Site", "data" => {}, "comments" => {"provider" => provider, "disqus_shortname" => "test", "cusdis_app_id" => "test", "cactus_shortname" => "test", "website_id" => "test"}, "footer" => {"copyright" => "Shared copyright"}}
  [false, true].each do |enabled|
    %w[first second].each do |name|
      title = %(Title "#{name}" & more)
      page = {"show_comments" => enabled, "url" => "/#{name}_page", "id" => "id-#{name}", "title" => title, "slug" => name}
      html = Nokogiri::HTML5.fragment(template.render!({"site" => values, "page" => page}, filters: [Jekyll::Filters], registers: {site: site}), max_errors: 100)
      raise "#{provider}: invalid footer HTML5: #{html.errors.join("\n")}" unless html.errors.empty?
      raise "#{provider}: disabled comments leaked from cache" unless html.css(selector).size == (enabled ? 1 : 0)
      raise "#{provider}: fixed footer content disappeared" unless html.at_css(".mt-2.mb-3").text == "Shared copyright"
      next unless enabled

      case provider
      when "disqus"
        script = html.css("script").map(&:text).join
        raise "Disqus page URL or ID leaked" unless script.include?("https://example.com/#{name}_page") && script.include?("id-#{name}")
      when "cusdis"
        thread = html.at_css(selector)
        expected = ["id-#{name}", "https://example.com/#{name}_page", title]
        raise "Cusdis page inputs leaked" unless %w[data-page-id data-page-url data-page-title].map { |attribute| thread[attribute] } == expected
      when "cactus"
        script = html.css("script").map(&:text).join
        raise "Cactus page URL leaked" unless script.include?("commentSectionId: \"%2F#{name}%5Fpage\"")
      when "welcomments"
        raise "Welcomments page URL leaked" unless html.at_css('input[name="permalink"]')["value"] == "https://example.com/#{name}_page"
        raise "Welcomments page slug leaked" unless html.at_css('input[name="page-slug"]')["value"] == name
      end
    end
  end
end

project_site = Jekyll::Site.new(site.config.merge("baseurl" => "/project"))
%w[disqus cusdis].each do |provider|
  JekyllIncludeCache.reset
  credentials = {"disqus_shortname" => "forum", "cusdis_app_id" => "app"}
  values = {"comments" => credentials.merge("provider" => provider, "cusdis_host" => "https://comments.example.com")}
  %w[first second].each do |name|
    page = {"show_comments" => true, "url" => "/#{name}.html", "title" => name}
    html = Nokogiri::HTML.fragment(template.render!({"site" => values, "page" => page}, filters: [Jekyll::Filters], registers: {site: project_site}))
    url = "https://example.com/project/#{name}.html"
    if provider == "disqus"
      script = html.css("script").map(&:text).join
      raise "Disqus did not keep the project URL for #{name}" unless script.include?(%(this.page.url = "#{url}";))
      raise "Disqus emitted an identifier for an ordinary page" if script.include?("this.page.identifier")
    else
      thread = html.at_css("#cusdis_thread")
      raise "Cusdis did not isolate the thread for #{name}" unless thread["data-page-id"] == url && thread["data-page-url"] == url
      raise "Cusdis did not keep the self-hosted endpoint" unless thread["data-host"] == "https://comments.example.com"
    end
  end
  JekyllIncludeCache.reset
  values["comments"].merge!("disqus_shortname" => "  ", "cusdis_app_id" => "  ")
  page = {"show_comments" => true, "url" => "/unconfigured.html"}
  html = Nokogiri::HTML.fragment(template.render!({"site" => values, "page" => page}, filters: [Jekyll::Filters], registers: {site: project_site}))
  raise "#{provider}: blank credential still loaded the adapter" if html.at_css(selectors.fetch(provider)) || html.at_css("script")
end

JekyllIncludeCache.reset
values = {"url" => "https://example.com", "comments" => {"provider" => "cusdis", "cusdis_app_id" => "test"}}
%w[original edited].each do |revision|
  page = {"show_comments" => true, "url" => "/same-page", "id" => "#{revision}-id", "title" => "#{revision} title"}
  html = Nokogiri::HTML.fragment(template.render!({"site" => values, "page" => page}, filters: [Jekyll::Filters], registers: {site: site}))
  thread = html.at_css("#cusdis_thread")
  raise "Footer ID stayed cached for the same URL" unless thread["data-page-id"] == "#{revision}-id"
  raise "Footer title stayed cached for the same URL" unless thread["data-page-title"] == "#{revision} title"
end
puts "Cached footer preserves Disqus, Cusdis, Cactus and Welcomments page inputs and comment gating."
