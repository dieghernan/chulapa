---
title: Installation
subtitle: How to use <span class="chulapa">Chulapa</span>
excerpt: Install Chulapa on your Github repo
---

<span class="chulapa">Chulapa</span> was developed in and for Github. There are two tested possible ways to use <span class="chulapa">Chulapa</span>:



## 1. Remote theme method <i class="fas fa-thumbs-up fa-xs"></i>

This is the **recommended option**. You can use the `jekyll-remote-theme` method with this theme. Create a Github account, go to [chulapa-101 repo](https://github.com/dieghernan/chulapa-101), fork it and quickstart your site!

If you prefer not to fork the dedicated repo, follow these steps:

  - Create a new GitHub repository or go to an existing one
  - Add  this line to your `_config.yml` and make sure to remove any previous theme or remote theme parameter:
  
```yaml

remote_theme: dieghernan/chulapa@[releasetag]

... more config options

```
    
Be sure that you replace `@[releasetag]` with the desired release tag, or just use `dieghernan/chulapa` if you want to use the `master` branch version of the theme (on active development).

**Latest release:** `dieghernan/chulapa@{{ site.github.releases[0].tag_name }}` 
{: .alert .alert-info .p-3 .mx-2}


<div markdown="1" class="alert alert-warning p-3 mx-2">
**Don't forget to deploy your site:**

  - On your Github repo, go to *Setting > Github Pages* and publish your site.
  - Add your content.
</div>

By using `jekyll-remote-theme` your repo would have remote access to the content of these folders:

- `chulapa/assets`
- `chulapa/_layouts`
- `chulapa/_includes`
- `chulapa/_sass`

Note that making copies of theme files will prevent you from receiving any theme updates on those files.

Please read the rest of the docs for further adjustments.

## 2. Fork this repository

You can fork [the current repo](https://github.com/dieghernan/chulapa/generate) and modify it. However, the site would be frozen at the moment of forking and it would make harder for you to get potential new features and upgrades.

The minimal files and folders you need are:
 
- `chulapa/assets`
- `chulapa/_layouts`
- `chulapa/_includes`
- `chulapa/_sass`
- `Gemfile`
- `_config.yml`

You may need also to keep `.travis.yml` if you want to use Algolia as [your search engine](https://dieghernan.github.io/chulapa/docs/02-config#search-engines).

You can safely remove any other content of the repo.

<i class="fas fa-exclamation-triangle"></i> The current repo is deployed from the `docs` folder, please be aware of that when setting your `_config.yml`.
{: .alert .alert-warning .p-3 .mx-2 mb-3}


<h2 class="text-muted" id="gem-based">Gem-based method</h2>

This theme has not been developed as a gem-based theme, so this option has been not explored yet.


**Potentially:** After the first stable release.
{: .alert .alert-info .p-3 .mx-2}
