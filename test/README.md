# Test site

This directory contains a Jekyll demo site and regression checks for the theme.
Run the checks from the repository root after `bundle install`:

```sh
bundle exec ruby test/check_head_metadata.rb
bundle exec ruby test/check_article_images.rb
bundle exec ruby test/check_microdata.rb
node test/check_chulapa_script.js
```

The Ruby checks build temporary fixtures with the local theme includes and
verify generated metadata. The JavaScript check exercises the theme script.
They do not require deployment of the demo site.
