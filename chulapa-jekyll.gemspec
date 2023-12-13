# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "chulapa-jekyll"
  spec.version       = "1.1.0"
  spec.authors       = ["Diego H."]
  spec.email         = ["diego.hernangomezherrero@gmail.com"]

  spec.summary       = "A full flexible Jekyll theme for Github Pages."
  spec.homepage      = "https://github.com/dieghernan/chulapa"
  spec.license       = "MIT"
  spec.metadata["plugin_type"] = "theme"

  spec.files                   = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r{^(assets|_(data|includes|layouts|sass)/|(LICENSE|README|CHANGELOG)((\.(txt|md|markdown)|$)))}i)
  end

  spec.add_runtime_dependency "jekyll", ">= 3.7", "< 5.0"
  spec.add_runtime_dependency "jekyll-paginate", "~> 1.1"
  spec.add_runtime_dependency "jekyll-include-cache", "~> 0.1"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.3"

end
