require "jekyll"
require "jekyll-include-cache"
require "fileutils"
require "nokogiri"
require "tmpdir"

def check(condition, message)
  raise message unless condition
end

root = File.expand_path("..", __dir__)
output = ENV["CITATION_OUTPUT"]
Dir.mktmpdir("chulapa-citation-") do |source|
  %w[_includes _layouts _data].each { |dir| FileUtils.cp_r(File.join(root, dir), source) }
  %w[_sass assets].each { |dir| FileUtils.cp_r(File.join(root, dir), source) } if output
  FileUtils.mkdir_p(File.join(source, "_posts"))
  fixtures = {
    "web" => {
      "citation" => true, "google-scholar" => true, "canonical_url" => "/original/",
      "title" => '<span class="chulapa">Terrain</span> &amp; *maps*'
    },
    "journal" => {
      "google-scholar" => true,
      "citation" => {
        "type" => "article-journal", "id" => "Hill:2022", "title" => "Hillshade & *{R}*",
        "author" => [
          { "name" => { "given" => "Ana María", "family" => "García López" } },
          { "name" => { "literal" => "Maps & More" } }
        ],
        "issued" => "2022-03", "container-title" => "Terrain Studies", "volume" => 4,
        "issue" => 2, "page" => "15–21", "doi" => "10.1234/hills",
        "url" => "https://journal.example/article?a=1&b=2"
      }
    },
    "journal-no-container" => { "citation" => { "type" => "article-journal" } },
    "minimal" => { "layout" => "minimal", "citation" => true, "google-scholar" => true },
    "web-override" => { "citation" => { "type" => "webpage", "author" => "Plain Name", "issued" => "2022" } },
    "unknown" => { "citation" => { "type" => "book", "author" => [" ", ""] }, "author" => {} },
    "off" => { "citation" => false, "google-scholar" => true },
    "absent" => { "google-scholar" => true },
    "bad-switch" => { "citation" => "true", "google-scholar" => true }
  }
  fixtures.each do |name, values|
    metadata = {
      "layout" => "default", "title" => "Terrain & maps", "permalink" => "/#{name}.html",
      "author" => { "name" => "Post Author" }
    }.merge(values)
    File.write(File.join(source, "_posts/2024-01-02-#{name}.md"), metadata.to_yaml + "---\nAn article.\n")
  end
  File.write(File.join(source, "undated.md"), "---\nlayout: default\ntitle: Undated\ncitation: true\ngoogle-scholar: true\n---\n")
  destination = output ? File.expand_path(output) : File.join(source, "_site")
  config = Jekyll.configuration(
    "source" => source, "destination" => destination, "url" => "https://example.com",
    "baseurl" => "/project", "title" => "**Terrain** &amp; <i>Maps</i>", "quiet" => true,
    "compress_html" => { "clippings" => "all", "blanklines" => true },
    "chulapa-skin" => { "skin" => "gitdev", "highlight" => "github" }
  )
  Dir.chdir(source) { Jekyll::Site.new(config.merge("author" => { "name" => "Site Author" })).process }
  read = ->(name) { Nokogiri::HTML5(File.read(File.join(destination, "#{name}.html"), encoding: "UTF-8")) }
  bib = ->(doc) { doc.at_css(".post-citation details pre code").text }
  scholar = ->(doc) { doc.css('head meta[name^="citation_"]').group_by { |tag| tag["name"] }.transform_values { |tags| tags.map { |tag| tag["content"] } } }

  web = read.call("web")
  check(web.at_css(".post-citation .citation-text").text.include?("Post Author."), "Page author fallback")
  check(web.at_css(".post-citation a")["href"] == "https://example.com/project/original/", "Canonical fallback")
  check(bib.call(web).start_with?("@misc{post20240102-web,\n"), "Date and slug key")
  check(bib.call(web).include?("month = jan,"), "Full date exports month")
  check(web.at_css(".citation-text cite").text == "Terrain & maps", "Plain APA title")
  check(web.at_css(".citation-text em").text == "Terrain & Maps", "Plain APA site name")
  check(bib.call(web).include?('title = {Terrain \& maps},'), "Plain BibTeX title")
  check(bib.call(web).include?('howpublished = {Terrain \& Maps},'), "Plain BibTeX site name")
  check(scholar.call(web) == {
    "citation_title" => ["Terrain & maps"], "citation_author" => ["Post Author"],
    "citation_publication_date" => ["2024-01-02"],
    "citation_fulltext_html_url" => ["https://example.com/project/original/"]
  }, "Web scholarly metadata")

  journal = read.call("journal")
  check(journal.errors.empty?, "HTML parser repairs: #{journal.errors}")
  citation = journal.at_css("#maincontent > .post-citation")
  check(citation["lang"] == "en" && citation.at_css("details > summary").text == "BibTeX", "Citation semantics")
  check(!journal.at_css(".e-content .post-citation, .post-citation .p-author, .post-citation .u-url, .post-citation .dt-published"), "Citation changed entry microformats")
  check(journal.at_css('meta[name="author"]')["content"] == "Post Author", "Citation changed the HTML author")
  check(scholar.call(journal) == {
    "citation_title" => ["Hillshade & {R}"], "citation_author" => ["Ana María García López", "Maps & More"],
    "citation_publication_date" => ["2022-03"],
    "citation_fulltext_html_url" => ["https://journal.example/article?a=1&b=2"],
    "citation_journal_title" => ["Terrain Studies"], "citation_volume" => ["4"],
    "citation_issue" => ["2"], "citation_doi" => ["10.1234/hills"],
    "citation_firstpage" => ["15"], "citation_lastpage" => ["21"]
  }, "Journal scholarly metadata")
  check(citation.at_css(".citation-text").text.include?("García López, A. M. & Maps & More."), "APA initials")
  check(citation.at_css("a")["href"] == "https://doi.org/10.1234/hills", "DOI preferred in APA")
  exported = bib.call(journal)
  check(exported.start_with?("@article{Hill:2022,\n"), "Explicit key or type lost")
  check(exported.include?('author = {García López, Ana María and {Maps \& More}}'), "Full names in BibTeX")
  check(exported.include?('title = {Hillshade \& \{R\}}'), "BibTeX title escaping")
  check(exported.include?("year = {2022},") && exported.include?("month = mar,") && !exported.include?("day ="), "Partial date")
  check(exported.include?("journal = {Terrain Studies},") && exported.include?("pages = {15--21},"), "Journal fields")
  check(exported.include?("url = {https://journal.example/article?a=1&b=2},"), "URL lost or altered")

  check(!bib.call(read.call("journal-no-container")).include?("journal ="), "Invented journal name")
  web_override = read.call("web-override")
  check(web_override.at_css(".citation-text").text.split.join(" ").start_with?("Plain Name. (2022)."), "Plain author or year-only date")
  check(bib.call(web_override).start_with?("@misc{") && !bib.call(web_override).include?("month ="), "Web type or year precision")
  check(bib.call(read.call("unknown")).include?("author = {Site Author},"), "Site author fallback")
  %w[off absent bad-switch].each { |name| check(!read.call(name).at_css(".post-citation"), "Unexpected citation for #{name}") }
  %w[off absent bad-switch unknown web-override minimal].each do |name|
    check(scholar.call(read.call(name)).empty?, "Unexpected scholarly metadata for #{name}")
  end
  Dir.chdir(source) { Jekyll::Site.new(config).process }
  undated = read.call("undated")
  check(undated.at_css(".citation-text").text.split.join(" ").start_with?("Undated. (n.d.)."), "Missing author/date format")
  check(!bib.call(undated).match?(/(?:author|year|month) =/), "Invented BibTeX fields")
  check(scholar.call(undated).keys.sort == %w[citation_fulltext_html_url citation_title], "Invented scholarly fields")
end
puts "Citation checks passed on Jekyll #{Jekyll::VERSION}."
