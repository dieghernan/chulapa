---
title: Global settings
subtitle: Site-wide options, defaults and integration settings
excerpt: Reference for site identity, navigation, integrations and Jekyll settings.
show_toc: true
h_min: 2
h_max: 5
tags: [docs, analytics, navigation]
show_tags: true
cloudtag_url: /docs/tags
---

For editing procedures, use [Change your site's name and author](./14-site-details),
[Add or change a menu link](./10-edit-menu) or [Edit footer links](./11-edit-footer).
The sections below describe site-wide options, defaults and integration settings.

Switching themes? Follow the [migration guide](./07-migration). For a new site,
start with [the browser tutorial](./00-start).

Appearance fields (`googlefonts` and `chulapa-skin`) have a separate
[theming reference](./03-theming).

## Start with your site details

Site identity uses `title`, `description`, `locale`, `repository`, `url`, `baseurl`
and the `author` mapping. The [site-details how-to](./14-site-details) covers editing;
the tables below list the fields and defaults. `url` is the domain without the
repository path; `baseurl` is that path, or `""` for a domain-root site.

## A. Site settings/SEO

These are the main site details. Advanced search and sharing settings appear
under [Optional features and metadata](#optional-features-and-metadata).

| Setting | What to enter | Default |
| --- | --- | --- |
| `title` | Your site's name | GitHub repository name |
| `subtitle` | A short tagline, used in the home page browser title | GitHub project tagline |
| `description` | A brief description of your site | Used as home page metadata when no page description or excerpt is set |
| `locale` | Content language, such as `en-GB`, `es` or `pt-BR` | `en-US` |
| `url` | Domain, such as `https://ana.github.io` | GitHub metadata can supply it on GitHub Pages |
| `baseurl` | Website path, such as `/my-blog`, or `""` at the domain root | Supplied by the starter's publishing setup |
| `repository` | GitHub username and repository, such as `ana/my-blog` | Unset in the theme's sample configuration |
| `title_separator` | Separator in browser titles | `|`, with spaces around it |
| `words_per_minute` | Reading speed for the estimated reading time | `200` |
| `timezone` | Your time zone; see [Jekyll's options](https://jekyllrb.com/docs/configuration/options) | Jekyll's configured time zone |

Pages can override `locale`. For social locale settings, page description
fallbacks and `seo_title` overrides, see [SEO metadata](./04-layouts#seo-metadata)
and [Social locales and articles](./04-layouts#social-locales-and-articles).
For custom builds, set `url`, `baseurl` and `repository` explicitly so page,
image and feed addresses resolve correctly.

### Site author

`author` supplies the site-level name, profile and social links.
The [site-details how-to](./14-site-details) covers changing the name.

- `author`: Your name and profile details, shown where author information is enabled.
  Pages can supply their own `author` mapping.
  - `name`: Author name. **GitHub owner name**, when GitHub metadata is available.
  - `url`: Optional author profile URL or site-relative path, such as `/about/`.
    Use `/about/` to link to your own About page. For guest authors and
    advanced metadata rules, see [page author options](./04-layouts#options).
  - `avatar`: Avatar image URL or site-relative path; a small square image is
    recommended.
  - `location`: Location text linked to a Google Maps search.
  - `links`: Social links with `url`, `icon` and `label`. Use a
    [Font Awesome](https://fontawesome.com/icons?d=gallery) icon code and a
    descriptive label. For email links, supply the plain email address.

Example site author:

```yaml
author:
  name: "Ana"
  url: /about/
  avatar: /assets/img/ana.jpg
  location: "Madrid, Spain"
  links:
    - url: https://x.com/jack
      icon: "fab fa-twitter"
      label: "My personal Twitter/X"
    - url: https://www.facebook.com
      icon: "fab fa-facebook"
    - url: hello@example.org
      icon: far fa-envelope
      label: "My personal email"
```

## B. Navigation

### Navbar

`navbar` defines the site's menu. Entries in `navbar.nav` use `title` and `url`
for existing pages; `child` supplies one level of dropdown links. Styles are
classic (sticky top), `fab` (floating button) and `dual` (floating/classic at a breakpoint).

For an editing procedure, use [Add or change a menu link](./10-edit-menu).
The options and examples below are the configuration reference.

For keyboard behavior of the development floating menu, see
[Keyboard navigation](./06-accessibility-performance#keyboard-navigation).

Check this [live demo]({{ "/demo/classic-navbar" | absolute_url }}) of the classic navbar style.

- `navbar`:
  - `style`: Use `fab` for a floating action button or `dual` to switch styles
    at a breakpoint. Omit the setting for the classic navbar. **classic**.
  - `expand`: Breakpoint for expanding the classic navbar or switching the
    `dual` navbar from a floating button to a classic navbar. Use `sm`, `md`,
    `lg` or `xl`. For the classic navbar, `always` keeps links expanded and
    `never` keeps them collapsed. With `dual`, `always` switches at `sm` and
    `never` switches at `xl`. **md**.
  - `brand`:
    - `title` : Text to be displayed as the title of your navbar.
    - `img`: An icon (ideally 30 × 30 px) displayed together with the
      `title`.
    - `url`: Destination of the brand link. **Site root URL**.
  - `nav`: Links on your navbar. See the example to learn how to set one-level
    and two-level links:

```yaml
navbar:
  style :  fab
  brand:
    title :  Home
    img: "./assets/img/site/brand-clear.png"
    url: /someurl
  nav:
  - title: One-level link #Label
    url: /url1/  #url
  - title: Two-level link #Label
    child:
    - title: Second level first item
      url: /url2-1
    - title: Second level second item
      url: /url2-2
  - title: One-level link #Label
    url: /url1/  #url
```

### Footer

`footer.links` defines the contact, social and feed links below the page.
For an editing procedure, use [Edit footer links](./11-edit-footer).

- `footer`:
  - `links`:
    - `label`: Label of your link.
    - `icon`: Font Awesome icon code.
    - `url`: Link URL or plain email address.

```yaml
footer:
  links:
    - label: "RSS"
      icon: "fa fa-rss"
      url: "./atom.xml"
    - label: "Twitter"
      icon: "fab fa-twitter"
      url: https://twitter.com/
    - label: "Facebook"
      icon: "fab fa-facebook"
      url: https://www.facebook.com
```

`footer.copyright` supplies custom text or HTML. When omitted, the footer
shows the build year and site author name, falling back to the GitHub owner name:

```yaml
footer:
  copyright: "&copy; 2021 <span class='chulapa'>Chulapa</span> developers"
```

## Optional features and metadata

SEO (search engine optimization) and social metadata describe your pages to
search engines and sharing services; they do not change your article text.
The sections below list optional integration settings and their constraints.

### SEO

These settings control social metadata and structured data. <span class="chulapa">Chulapa</span> generates
canonical URLs and JSON-LD for the home page (`WebSite`), posts (`BlogPosting`)
and other pages (`WebPage`). Breadcrumb structured data is generated even when
visible breadcrumbs are disabled.

- `og_image`: The default image to be displayed when a page of your site is
  shared on any of the major social networks (Facebook, Twitter/X, etc.). The
  fallback order is page `og_image`, page `header_img`, site `og_image`, site
  `author.avatar`, then the GitHub avatar. Article JSON-LD uses a separate
  selection; see [Article images](./04-layouts#article-images). **Author avatar
  (if set, see below) or your GitHub avatar**.
- `twitter_site`: The Twitter/X username **without `@`** used for
  `twitter:site`. The separate `twitter:creator` value comes from a valid
  Twitter/X profile URL in `author.links`. When a page sets `author`, only that
  author's links are considered for `twitter:creator`; the site author is not
  used as a fallback. Status, sharing and other non-profile URLs do not set a
  creator.

**Check your sharing metadata**: <span class="chulapa">Chulapa</span> generates Open Graph and Twitter/X card
tags automatically. For setup and published checks, use
[Set a post's sharing text and images](./64-post-sharing). Metadata does not
guarantee a particular preview or search result.

#### Publisher

`publisher` identifies the site publisher in JSON-LD structured data,
independently of article authors. Supported since v2.1.0. For a personal-blog
editing procedure, use [Identify a personal site's publisher](./60-person-publisher).

Organization mapping specimen:

```yaml
publisher:
  type: Organization
  name: Example organization
  logo: /assets/img/logo.png
```

Person mapping specimen:

```yaml
publisher:
  type: Person
  name: Jane Doe
  image: /assets/img/jane.jpg
```

| Setting | What to enter |
| --- | --- |
| `type` | Exactly `Person` or `Organization`. Default: `Organization`; unsupported values also use it. |
| `name` | Publisher name. Defaults to the site author or GitHub owner name. |
| `url` | Optional publisher website. Defaults to your site's home page. |
| `logo` | Organization logo; ignored for `Person`. If omitted, uses the site's sharing image or avatar. |
| `image` | Person's photograph; defaults to the site author or GitHub avatar. Optional for an organization. |

Use a path such as `/assets/img/logo.png` for an uploaded image, or a complete
URL for an external one. No extra plugin is needed. These settings help describe
your site; they do not guarantee a special appearance in search results.

### Font Awesome

Icons are available by default through Font Awesome 6. Use an icon from its
[catalogue](https://fontawesome.com/icons) in your menu or footer settings.
To use your own Font Awesome kit, set `fa_kit_code` in `_config.yml`.

For older icons, `fa_version: 5` selects version 5 and `fa_v4_support: true`
enables version 4 compatibility. When updating an old configuration, replace
`fa5_kit_code` with `fa_kit_code`; the old setting takes precedence if both exist.

### Google Analytics

Setup: [Enable Google Analytics 4](./19-google-analytics).

| Setting | Value and behavior |
| --- | --- |
| `gtag_id` | GA4 measurement ID, such as `G-XXXXXXXXXX`. Omit it or leave its YAML value blank to disable its snippet. Loads when configured, including local preview. |
| `analytics_id` | Legacy Universal Analytics ID, for the retired service. Leave empty for new setups. Independent of `gtag_id`; both configured values load both snippets. |

Google Analytics and GoatCounter are independent. Setting either does not disable
the other. Custom copies of a tracker are not removed automatically.

### GoatCounter analytics

**Available v2.2.0; not in the v2.1.0 release.**

Setup: [Enable GoatCounter analytics](./18-goatcounter).

| Setting | Value and behavior |
| --- | --- |
| `goatcounter` | Complete HTTPS counting address, such as `https://YOUR-CODE.goatcounter.com/count` or a self-hosted `https://stats.example.org/count`. Empty or non-HTTPS values disable it. |

The script is `https://gc.zgo.at/count.js` and loads only when
`JEKYLL_ENV=production`. No API key or extra Jekyll plugin is required.
The counting address is external; the site's `baseurl` is not added to it.
This counts page views without cookies, a visible counter or custom-event configuration.
It does not disable the Google snippets.

#### Custom hosting and troubleshooting

See [production builds and verification](./18-goatcounter#publish-and-check)
and [missing visits](./18-goatcounter#if-no-visit-appears) for environment,
Content Security Policy and browser-blocker checks. The
[GoatCounter documentation](https://www.goatcounter.com/help/) covers the
service's own behavior.

### Search engines

`search` configures search within the site, independently of external search-engine
indexing. For crawler/sitemap/local-index exclusions, use
[Keep an auxiliary page out of search](./65-search-visibility).
The personal-blog template includes Fuse.js search. Setup instructions:
[Enable Fuse.js](./12-fusejs-search), [Lunr.js](./34-lunr-search),
[Simple-Jekyll-Search](./35-simplesearch-search),
[Google Custom Search](./36-google-search) or [Algolia](./37-algolia-search).

A search page uses `layout: search`; its `permalink` matches `search.landing_page`
(default `/search`). A provider does not create the page. In the classic navbar
and the desktop form of `dual`, the Search link also requires `navbar.nav`.
The search page remains reachable directly without that menu link.

The following engines are available:

- [Lunr.js](https://lunrjs.com/)
- [Fuse.js](https://www.fusejs.io/)
- [Simple-Jekyll-Search](https://github.com/christian-fei/Simple-Jekyll-Search)
- [Algolia](https://www.algolia.com/)
- [Google Custom Search](https://developers.google.com/custom-search)

Lunr, Fuse.js and Simple-Jekyll-Search use an index generated during the site
build. Set `include_on_search: false` on pages or in front matter defaults to
exclude them from these indexes. Algolia requires a separately uploaded index;
Google Custom Search requires a configured search engine.

- `search`:
  - `provider`: Select a search provider: `lunr`, `algolia`, `google`,
    `simplesearch`, `fusejs`.
  - `label`: Text to be displayed on the navbar when enabled. Useful for
    localization (i.e. you can set it as Búsqueda or Ricerca). **Search**.
  - `landing_page`: URL of your search page, useful for localization.
    **"/search"**.
  - `maxwords`: Maximum number of content words per indexed document for
    `simplesearch`, `fusejs` and `lunr`. Other indexed fields are separate. **30**.
  - `show_attrib`: Show attribution for Lunr, Fuse.js and Simple-Jekyll-Search.
    Set the YAML boolean `false` to hide it. **true**.
  - `algolia_logo`: Independently controls the Algolia logo. **Unset**; the
    sample configurations explicitly set it to `true`. Check
    your Algolia plan's attribution requirements before hiding it.

- `google_cse_id`: Your Google Custom Search id, available on _cse.google.com >
  Your search engine > Settings_.

The `jekyll-algolia` plugin is deprecated and no longer maintained by Algolia.
Its archived documentation remains available in the upstream repository.
{: .alert .alert-warning .p-3 .mx-2 .mb-3}

The theme uses `jekyll-algolia` for index uploads. Browser search and index
upload are separate operations; the latter requires an indexing credential.
The browser search requires these settings:

- `algolia`:
  - `application_id`: App id on Algolia.
  - `index_name`: Name of the index to search.
  - `search_only_api_key`: Public search-only API key used in browser requests.

Index uploads require a separate indexing key supplied through the
`ALGOLIA_API_KEY` environment variable. Keep that key in your build environment
or GitHub Actions secrets; do not put it in the public configuration.
{: .alert .alert-warning .p-3 .mx-2 .mb-3}

Additional Algolia indexing options in the sample configuration are
`files_to_exclude` (omit files), `extensions_to_index` (file types),
`searchableAttributes` (searchable fields) and `customRanking` (ranking rules).
They belong under `algolia`; they do not affect the local search providers.

`include_on_search` is not an Algolia exclusion: the sample `customRanking`
uses it for ranking. `algolia.files_to_exclude` controls omissions. These
settings do not restrict Google's crawler or make published files private.

Configuration specimens: [sample configuration](https://github.com/dieghernan/chulapa/blob/main/_config.yml)
and [plugin option catalog](https://github.com/algolia/jekyll-algolia/blob/main/docs-src/src/options.md).
Setup and workflow steps: [Connect Algolia search](./37-algolia-search).

Legacy `lunr_maxwords`, `simplesearch_maxwords` and `fusejs_maxwords` take
precedence over the shared `maxwords` setting when present. Without those
provider-specific keys, the shared setting applies.

With the local search providers, visitors can search while typing or press
Enter. Clearing the field clears the results.

### Comments

Comments require a supported provider's setup and `show_comments: true` on the
page or in front matter defaults for a layout that displays comments. Setup guides for one post:
[giscus](./13-giscus-comments), [Disqus](./38-disqus-comments),
[Cactus](./39-cactus-comments), [Welcomments](./40-welcomments-comments) or
[an existing self-hosted Cusdis service](./41-cusdis-comments).
Provider identifiers and compatibility constraints are listed below.

- [Disqus](https://disqus.com/), a hosted comment system.
- [Cusdis](https://github.com/djyde/cusdis), a lightweight comment system whose
  upstream project is deprecated and archived. The original hosted service is
  unavailable; check your own deployment before selecting this provider.
- [giscus](https://giscus.app/), powered by
  [GitHub Discussions](https://docs.github.com/en/discussions).
- [Cactus](https://cactus.chat/), a federated comment system based on Matrix.
- [Welcomments](https://welcomments.io/), a comment integration using generated
  comment files.

- `comments`:
  - `provider`: Use `disqus`, `cusdis`, `giscus`, `cactus` or `welcomments` to
    enable it.
  - `disqus_shortname`: Disqus site identifier in `https://DISQUS_SHORTNAME.disqus.com/admin/`, not the display name.
  - `cusdis_app_id`: Cusdis application ID, shown as `data-app-id` in its embed
    code.
  - `cusdis_host`: Cusdis HTTPS host base URL. Default: `https://cusdis.com` (the original hosted service is unavailable). Required for connecting your own deployment.
  - `cactus_shortname`: Cactus only. The name you used to register this site
    with Cactus.
  - `website_id`: Welcomments site id. Requires a separately configured integration delivering comment data under `_data/welcomments/`; setting the ID alone does not deliver data.

Cactus uses the Cactus-hosted Matrix service; there is no configurable homeserver
field in this adapter. In v2.2.0, conversation IDs URL-encode
`page.url` and encode underscores as `%5F`; they exclude the forbidden `/` and `_`.
The v2.1.0 adapter retains slashes. Its setup guide includes a legacy local
correction and migration checks: changing IDs does not move existing threads. Comment-provider selection does not migrate comments,
and thread matching depends on the provider and page identifiers/addresses.

For **giscus**, `_includes/custom/giscus.html` contains the embed script generated
by [giscus setup](https://giscus.app/), including repository and category identifiers.

In v2.2.0, the Cactus script and stylesheet load only on
pages with `show_comments: true`. Selecting the provider alone no longer loads
these resources on every page.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

In v2.2.0, the Cusdis adapter accepts resize messages only from its own
iframe and requires a finite, nonnegative numeric height. Existing provider
settings are unchanged.

**Welcomments compatibility:** in v2.2.0, form permalinks
include `baseurl`. The v2.1.0 form omits it; project sites on that release need
the local correction in the setup guide. Local `_includes/welcomments/` files override
the theme templates. Provider-generated templates can replace the customized
ones supplied by <span class="chulapa">Chulapa</span>. The
[setup guide](./40-welcomments-comments) covers reviewing those integration files.
{: .alert .alert-warning .p-3 .mx-2 .mb-3}

## D. Jekyll defaults and collections

**Advanced configuration.** A collection groups content such as portfolio
projects; defaults apply shared page settings without repeating them in each
file. The starter already configures these for a blog.

Collection, pagination and front matter default settings are defined by Jekyll:
see its documentation on
[collections](https://jekyllrb.com/docs/step-by-step/09-collections/),
[pagination](https://jekyllrb.com/docs/pagination/#enable-pagination) and
[front matter defaults](https://jekyllrb.com/docs/configuration/front-matter-defaults/).

The pagination template in <span class="chulapa">Chulapa</span> also uses:

- `paginator_maxnum`: Numbered page links in the pagination window when using
  the [blog pagination template](https://github.com/dieghernan/chulapa/blob/main/docs/blog/index.html).
  The template clamps the value to at least 2 and at most the total number of
  pages. First/last and previous/next controls are separate. **3**.

See a sample defaults configuration [here](https://dieghernan.github.io/chulapa/docs/04-layouts#a-note-on-defaults).

## XX. Other settings

The `jekyll-include-cache` plugin is required; removing it breaks includes that
use `include_cached`.
{: .alert .alert-warning .p-3 .mx-2 .mb-3}

The sample configuration
includes this repository's demo collections and pagination settings; these are
examples rather than requirements for every site.

The following settings belong to Jekyll or its plugins. Keep the starter's
values unless you need to change how files are built or published.

| Setting | Use |
| --- | --- |
| `github` | Keep `[metadata]` in the sample setup to supply GitHub repository details. |
| `theme`, `remote_theme` | Choose the gem or remote installation method; see [Installation](./01-install). |
| `plugins` | Enabled build plugins, including the required `jekyll-include-cache`. |
| `include`, `exclude` | Files or folders to explicitly publish or omit; `include: [_pages]` enables the starter's pages folder. |
| `collections` | Content groups; use `output: true` and a `permalink` pattern to publish their documents. |
| `collections_dir` | Parent folder for collections; an empty value keeps them at the site root. |
| `defaults` | Shared settings: `scope.path` and optional `scope.type` select files; `values` supplies their options. |
| `permalink` | Default address pattern for posts; individual pages can set their own address. |
| `paginate`, `paginate_path` | Posts per page and address pattern for a paginated blog index. |
| `markdown`, `highlighter` | Content converters; the sample uses `kramdown` and `rouge`. |
| `excerpt_separator` | Text marking the end of a post excerpt; the sample uses a blank line (`"\n\n"`). |
| `lsi` | Jekyll's optional related-post calculation; the sample disables it. It does not configure the theme's tag-based related cards. |
| `incremental` | Rebuild only changed files during development; the sample disables it. |
| `kramdown` | Markdown behavior, detailed below. |
| `sass` | Stylesheet build settings, detailed below. |
| `compress_html` | Optional HTML compression, detailed below. |

Under `kramdown`, the sample settings are:

| Option | Use |
| --- | --- |
| `input` | Markdown dialect (`GFM` in the sample). |
| `hard_wrap` | Whether ordinary line breaks become visible breaks. |
| `auto_ids` | Automatically name headings for links and tables of contents. |
| `footnote_nr`, `footnote_backlink` | First footnote number and the return-link symbol. |
| `entity_output` | How special characters are written in generated HTML. |
| `toc_levels` | Heading levels included by kramdown's own table of contents. |
| `smart_quotes` | Opening and closing quote characters. |
| `enable_coderay` | Legacy code-highlighter integration; disabled in the sample. |

Under `sass`, `sass_dir` names the source folder, `style` controls CSS output,
`quiet_deps` suppresses dependency warnings and `silence_deprecations` lists
warning types to suppress. The last two depend on the installed Sass converter;
they do not fix deprecated stylesheet code.

Under `compress_html`, the sample uses `clippings: all` and `blanklines: true`.
Other options are optional; leaving them unset disables the corresponding step:

| Option | Use |
| --- | --- |
| `clippings` | Trim spaces around selected HTML elements; use a list or `all`. |
| `blanklines` | Remove empty lines while retaining line breaks; otherwise whitespace is collapsed. |
| `comments` | Remove HTML comments (`all`) or comments between a pair of supplied markers. |
| `endings` | Omit selected optional closing tags; use a list or `all`. |
| `startings` | Omit selected optional opening tags; supply a list. |
| `ignore.envs` | Skip compression in listed environments, or use `all` to skip it everywhere. |
| `profile` | Display compression statistics; leave disabled on a published site. |

See [Jekyll's configuration reference](https://jekyllrb.com/docs/configuration/options/)
and the [compression guide](https://jch.penibelst.de/) for accepted values.
