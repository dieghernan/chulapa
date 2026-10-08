---
title: Global settings
subtitle: Learn how to set up your new site
excerpt: Setting up your new site
show_toc: true
h_min: 2
h_max: 5
---

<p class="font-weight-light font-italic lead">TL;DR</p>

Configure your site in `_config.yml`. If you use a remote theme without the
[chulapa-101 template](https://github.com/dieghernan/chulapa-101), use the
[sample configuration](https://github.com/dieghernan/chulapa/blob/main/_config.yml)
as a starting point. Adapt its site details, collections and defaults to your
site. Use `remote_theme: dieghernan/chulapa` for the default branch or append
`@TAG` to pin an existing release.

**Restart Jekyll after changing configuration.** Edits to `_config.yml` are
applied when the server restarts.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

For some variables, a default value is provided. This value is shown at the end
of the explanation **in bold**.

## A. Site settings/SEO

- `locale`: Set the `lang` attribute on the `<html>` element. Use a language
  code or `language-TERRITORY`, such as `fr`, `en-GB`, `es-MX` or `pt-BR`.
  Pages can override this with `locale`. Set `og_locale` separately when a
  language-only or script-based tag needs a territory for social metadata.
  `og_locale_alternate` lists available translated locales; see
  [Social locales and articles](./04-layouts#social-locales-and-articles).
  **Default value: en-US**.
- `title`: Site title, also used for social metadata. **GitHub repository name**.
- `subtitle`: Site tagline used in the home page browser title.
  **GitHub project tagline**.
- `title_separator`: Separator between the two parts of the browser title.
  The home page uses the site title and subtitle; other pages use the page
  title and site title. Page `seo_title` can override the complete title.
  **`|`**, with spaces added around it.
- `description`: Brief site description for Jekyll and plugins. <span class="chulapa">Chulapa</span>'s page
  metadata gives priority to page `description`, then `excerpt`, then the site
  description on the home page, then a content fallback. See
  [SEO metadata](./04-layouts#seo-metadata) for subtitle handling.
- `url` and `baseurl`: Set `url` to the site origin (for example `https://username.github.io`) and `baseurl` to its path prefix (`/repository` for a project site or an empty string for a root site). GitHub metadata can supply defaults on GitHub Pages; set these explicitly for local or custom builds so canonical links, feeds and image URLs resolve correctly. See [Clearing Up Confusion Around baseurl -- Again](https://byparker.com/blog/2014/clearing-up-confusion-around-baseurl/) by Parker Moore (Jekyll).
- `repository`: GitHub repository slug (for example
  `dieghernan/chulapa`). Set this for GitHub metadata, especially when building
  outside GitHub Pages. **Unset in the sample configuration**.
- `words_per_minute`: Used for computing the reading time of the page. **200**.
- `timezone`: Used for setting the timezone of your dates and hours. See [Jekyll Docs](https://jekyllrb.com/docs/configuration/options).

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
- `author`: Default site author, used in profiles, metadata and the footer.
  Pages can supply their own `author` mapping.
  - `name`: Author name. **GitHub owner name**, when GitHub metadata is available.
  - `avatar`: Avatar image URL or site-relative path; a small square image is
    recommended.
  - `location`: Location text linked to a Google Maps search.
  - `links`: Social links with `url`, `icon` and `label`. Use a
    [Font Awesome](https://fontawesome.com/icons?d=gallery) icon code and a
    descriptive label. For email links, supply the plain email address.

Example site author:

```yaml
author:
  name                  :      Name Surname Company
  avatar                :      https://github.com/devdhh.png
  location              :      New York, US
  links:
    - url: https://x.com/jack
      icon: "fab fa-twitter"
      label: "My personal Twitter/X"
    - url: https://www.facebook.com
      icon: "fab fa-facebook"
    - url: fake@email
      icon: far fa-envelope
      label: "My personal email"
      ...
```

**Check your sharing metadata**: <span class="chulapa">Chulapa</span> generates Open Graph and Twitter/X card
tags automatically. Set accurate titles, excerpts and image URLs, then check the
shared page with the relevant platform. Metadata does not guarantee a particular
preview or search result.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

#### Publisher

Use the optional `publisher` settings in `_config.yml` to identify the publisher
in JSON-LD structured data. The publisher is independent of the site author and
guest authors. These settings work with both remote and gem themes without
additional plugins.

For an organization with its own logo:

```yaml
publisher:
  type: Organization
  name: Example organization
  url: https://example.org/
  logo: /assets/img/logo.png
  image: /assets/img/organization.jpg
```

For a personal site:

```yaml
publisher:
  type: Person
  name: Jane Doe
  image: /assets/img/jane.jpg
```

| Setting | Default and behavior                                                                                                                                                 |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`  | `Organization`. Use exactly `Organization` or `Person`; unsupported values fall back to `Organization`.                                                              |
| `name`  | Site `author.name`, then the GitHub owner name.                                                                                                                      |
| `url`   | Site home URL. An explicit publisher URL takes precedence.                                                                                                           |
| `logo`  | For `Organization`, uses `og_image`, then `author.avatar`, then the GitHub avatar when omitted. Ignored for `Person`.                                                |
| `image` | For `Person`, uses `author.avatar`, then the GitHub avatar when omitted. Omitted if none is available. For `Organization`, included only when explicitly configured. |

Relative publisher URLs, logos and images resolve using the site's `url` and
`baseurl`. Absolute URLs remain unchanged. Missing or empty settings use the
defaults above. Without publisher settings, the existing organization publisher
and its logo fallbacks are preserved.

Configuring a publisher does not change article authors, social metadata or author profiles. The separate site author profile is described as "Site author" when any publisher setting is supplied. A `Person` publisher uses `image` instead of `logo`, following [Schema.org](https://schema.org/publisher). These settings describe the publishing entity; they do not guarantee additional [Google rich results](https://developers.google.com/search/docs/appearance/structured-data/article).

### Font Awesome

<span class="chulapa">Chulapa</span> loads Font Awesome 6 by default. Set `fa_version: 5` to use version 5.
Set `fa_kit_code` to load a Font Awesome kit instead of the hosted stylesheet.
The legacy setting `fa5_kit_code` remains supported and takes precedence when
both are set. Remove it when migrating to `fa_kit_code`.
{: .alert .alert-warning .p-3 .mx-2 .mb-3}

To enable v4 support, set `fa_v4_support: true`.

### Google Analytics

- `gtag_id`: Set your Google Analytics 4 measurement ID, such as `G-XXXXXXXXXX`,
  to load the Google tag.
- `analytics_id`: Retained for legacy Universal Analytics snippets. Universal Analytics has been retired, so use `gtag_id` for new setups. See [Google's migration guide](https://support.google.com/analytics/answer/10089681).

Leave unused IDs empty. If both are set, the theme loads both snippets.
{: .alert .alert-warning .p-3 .mx-2 .mb-3}

### Search engines

Set `search.provider` and create a page using `layout: search`. Its `permalink`
must match `search.landing_page`, which defaults to `/search`. Selecting a
provider adds the navbar link but does not create the search page.

**Create the search page separately.** Setting `search.provider` alone adds a
navbar link; it does not generate a page at `search.landing_page`.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

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
  - `lunr_maxwords`: **Deprecated**, use `maxwords`. Remove the old setting when
    migrating: if both are set, `lunr_maxwords` takes precedence for Lunr.
  - `maxwords`: Maximum number of content words per indexed document for
    `simplesearch`, `fusejs` and `lunr`. Other indexed fields are separate. **30**.
    Provider-specific `simplesearch_maxwords` and `fusejs_maxwords` also take
    precedence over `maxwords` when set. Prefer `maxwords` for a shared limit.
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

The theme uses `jekyll-algolia` to upload its search index. See the plugin's
[setup documentation](https://github.com/algolia/jekyll-algolia/blob/main/docs-src/src/getting-started.md)
and [configuration reference](https://github.com/algolia/jekyll-algolia/blob/main/docs-src/src/options.md).
The browser search requires these settings:

- `algolia`:
  - `application_id`: App id on Algolia.
  - `index_name`: Name of the index to search.
  - `search_only_api_key`: Public search-only API key used in browser requests.

Index uploads require a separate indexing key supplied through the
`ALGOLIA_API_KEY` environment variable. Keep that key in your build environment
or GitHub Actions secrets; do not put it in the public configuration.
{: .alert .alert-warning .p-3 .mx-2 .mb-3}

Recommended additional options are:

```yaml
algolia:
  application_id: your id
  index_name: your name
  search_only_api_key: your apikey
  extensions_to_index:
    - html
    - md
  searchableAttributes:
    - title
    - headings
    - unordered(content)
    - unordered(subtitle)
    - unordered(categories)
    - unordered(collection)
    - unordered(tags)
  customRanking:
    - desc(include_on_search)
    - desc(title)
    - desc(content)
    - desc(subtitle)
```

If you are deploying your site with GitHub Pages, I recommend using this [GitHub Action](https://github.com/marketplace/actions/algolia-jekyll-action) to create and update your Algolia index after every commit automatically.

### Comments

Set `comments.provider` and enable `show_comments: true` on pages or in front
matter defaults for layouts that display comments. Configure the selected
provider as described below. The theme includes integrations for:

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
  - `disqus_shortname`: Disqus only. Add your site id, on `https://DISQUS_SHORTNAME.disqus.com/admin/`.
  - `cusdis_app_id`: Cusdis application ID, shown as `data-app-id` in its embed
    code.
  - `cusdis_host`: Cusdis only. If you are self-hosting Cusdis use this field.
  - `cactus_shortname`: Cactus only. The name you used to register this site
    with Cactus.
  - `website_id`: Welcomments site id.

Configure **giscus** using its setup instructions and paste the generated
script into `_includes/custom/giscus.html` in your site repository.

In development after v2.1.0, the Cactus script and stylesheet load only on
pages with `show_comments: true`. Selecting the provider alone no longer loads
these resources on every page.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

When setting up **Welcomments**, review any generated pull request before
merging it. Use its `website_id`, but retain the customized templates supplied
by <span class="chulapa">Chulapa</span> rather than overwriting them.
{: .alert .alert-warning .p-3 .mx-2 .mb-3}

## B. Navigation

### Navbar

The navbar supports links and one level of child links. Choose a classic
sticky-top navbar, `fab` for an animated floating action button or `dual` to
switch from a floating button to a classic navbar at the configured breakpoint.

In development after v2.1.0, the floating button works with Enter and Space.
Opening it focuses the first menu link; Escape closes it and returns focus to
the button. Closed floating-menu links are excluded from Tab navigation.
The lateral TOC is a separate component and retains its existing Tab behavior.

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
     ... more levels
```

### Footer

To set social links to be displayed on your footer, configure this section:

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

Use `footer.copyright` to supply custom text or HTML. When omitted, the footer
shows the build year and site author name, falling back to the GitHub owner name:

```yaml
footer:
  copyright: "&copy; 2021 <span class='chulapa'>Chulapa</span> developers"
```

<h2 id="theming"> C. Theming <span class="chulapa">Chulapa</span></h2>

Configure fonts, skins, syntax highlighting and color overrides using
`googlefonts` and `chulapa-skin`. See the [theming reference](./03-theming)
for the available settings in <span class="chulapa">Chulapa</span>.

## D. Jekyll defaults and collections

Configure collections, pagination and front matter defaults for your site. See
the Jekyll documentation on
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

Keep the required `jekyll-include-cache` plugin enabled. Adjust other Jekyll
settings, plugins and exclusions to suit your site.
{: .alert .alert-warning .p-3 .mx-2 .mb-3}

The sample configuration
includes this repository's demo collections and pagination settings; these are
examples rather than requirements for every site.
