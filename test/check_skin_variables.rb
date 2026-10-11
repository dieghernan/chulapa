# Regression coverage for closed issues #19 and #41 using compiled CSS.
require "jekyll"
require "nokogiri"
require "tmpdir"
require "fileutils"

root = File.expand_path("..", __dir__)
Dir.mktmpdir("chulapa-skin-vars-") do |source|
  FileUtils.cp_r(File.join(root, "_sass"), source)
  FileUtils.cp_r(File.join(root, "_includes"), source)
  FileUtils.mkdir_p(File.join(source, "assets/css"))
  FileUtils.cp(File.join(root, "assets/css/main.scss"), File.join(source, "assets/css/main.scss"))
  File.write(File.join(source, "index.html"), "---\n---\n{% include components/indexcards.html cacheddocs=site.documents cachedlimit=10 %}")
  FileUtils.mkdir_p(File.join(source, "_entries"))
  File.write(File.join(source, "_entries/item.md"), "---\ntitle: Card\ndate: 2024-01-01\n---\nCard summary.")
  [
    {"footer-chulapa-link-color" => "#123456", "footer-chulapa-hover-color" => "#654321", "footer-chulapa-text-color" => "#abcdef", "card-bg" => "#202122", "body-color" => "#fafbfc", "indexcards-chulapa-border-color" => "#456789"},
    {"footer-chulapa-link-color" => "#765432", "footer-chulapa-hover-color" => "#234567", "footer-chulapa-text-color" => "#fedcba", "card-bg" => "#ecebea", "body-color" => "#101112", "indexcards-chulapa-border-color" => "#987654"}
  ].product(%w[none navi gitdev-dark], [false, true]).each do |vars, skin, autothemer|
    vars = vars.merge("primary" => "#e04080")
    config = Jekyll.configuration("source" => source, "destination" => File.join(source, "_site"), "quiet" => true, "plugins" => [], "theme" => nil, "collections" => {"entries" => {"output" => true}}, "chulapa-skin" => {"skin" => skin, "autothemer" => autothemer, "vars" => vars}, "sass" => {"style" => "expanded", "quiet_deps" => true, "silence_deprecations" => %w[import global-builtin color-functions if-function]})
    Jekyll::Site.new(config).process
    css = File.read(File.join(config["destination"], "assets/css/main.css"))
    declarations = lambda do |selector|
      css.scan(/([^{}]+)\{([^{}]*)\}/).select { |selectors, _| selectors.split(",").map(&:strip).include?(selector) }.map(&:last).join("\n")
    end
    {
      ".footer-chulapa a" => ["color", vars["footer-chulapa-link-color"]],
      ".footer-chulapa a:hover" => ["color", vars["footer-chulapa-hover-color"]],
      ".footer-chulapa a:focus" => ["color", vars["footer-chulapa-hover-color"]],
      ".card" => ["background-color", vars["card-bg"]],
      ".chulapa-text-body-color" => ["color", vars["body-color"]],
      ".chulapa-border-card-index" => ["border-color", vars["indexcards-chulapa-border-color"]]
    }.each do |selector, (property, color)|
      raise "Custom skin variable ignored: #{skin}/#{autothemer}/#{selector}/#{property}" unless declarations.call(selector).match?(/(?:\A|;)\s*#{Regexp.escape(property)}:\s*#{Regexp.escape(color)}\s*(?:!important\s*)?;/)
    end
    if skin == "none"
      # An unset palette color changes only when autothemer is enabled;
      # explicit YAML colors above must remain intact in either mode.
      light = autothemer ? [247.25, 207.25, 223.25] : [248, 249, 250]
      color = declarations.call(".btn-light")[/background-color:\s*([^;]+);/, 1]
      # Dart Sass preserves fractional RGB channels; SassC rounds to hex.
      channels = if color&.match?(/\A#[0-9a-f]{6}\z/i)
        color.delete_prefix("#").scan(/../).map { |channel| channel.to_i(16) }
      elsif color&.start_with?("rgb(")
        color.scan(/[\d.]+%?/).map { |channel| channel.end_with?("%") ? channel.to_f * 255 / 100 : channel.to_f }
      else
        []
      end
      raise "Autothemer option ignored (#{autothemer}): #{color}" unless channels.size == 3 && channels.zip(light).all? { |actual, expected| (actual - expected).abs <= 0.51 }
    end
    html = Nokogiri::HTML(File.read(File.join(config["destination"], "index.html")))
    raise "Index card lost its theme classes" unless html.at_css(".card.chulapa-border-card-index .card-body .card-title")
  end
end
puts "Custom footer/card colors and autothemer passed on none, Navi and GitDev Dark skins (#19, #41)."
