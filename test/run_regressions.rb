# Each check runs in its own process to isolate Liquid filters and include caches.
require "open3"
require "rbconfig"
require "jekyll"

checks = Dir.glob(File.join(__dir__, "check_*.rb")).sort.reject do |path|
  # Packaging needs a freshly built gem and an installation-only bundle.
  File.basename(path) == "check_theme_installation.rb"
end
abort "No regression checks found" if checks.empty?
failed = []
checks.each do |path|
  name = File.basename(path)
  output, status = Open3.capture2e(RbConfig.ruby, path, chdir: __dir__)
  if status.success?
    puts "PASS #{name}"
  else
    failed << name
    warn "FAIL #{name}\n#{output}"
  end
end
abort "Failed checks: #{failed.join(', ')}" unless failed.empty?
puts "All #{checks.size} Ruby regression checks passed on Jekyll #{Gem.loaded_specs.fetch('jekyll').version}."
