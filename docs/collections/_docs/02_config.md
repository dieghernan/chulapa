---
title: Global settings
subtitle: Learn how to set up your new site
excerpt: Setting up your new site
show_toc: true
h_min: 2
h_max: 5
---

<p class="font-weight-light font-italic lead">TL;DR</p>

Learn how to modify your `_config.yml` file. If you are using the remote method and you didn't fork the [chulapa-101 repo](https://github.com/dieghernan/chulapa-101), you can use [this file](https://github.com/dieghernan/chulapa/blob/main/_config.yml) as a starting point. Add `remote_theme: dieghernan/chulapa` for the default branch or append `@TAG` to pin an existing release tag.

For some variables, a default value is provided. This value is shown at the end
of the explanation **in bold**.

## A. Site settings/SEO

- `locale`: Set the `lang` attribute on the `<html>` element. Use a language
  code or `language-TERRITORY`, such as `fr`, `en-GB`, `es-MX` or `pt-BR`.
  **Default value: en-US**.
- `title`, `title_separator` and `subtitle`: Set several `<meta>` tags and
  define the browser tab title. **repository_name \| project_tagline**.
- `description`: Brief site description for Jekyll and plugins. <span class="chulapa">Chulapa</span>'s page
  description metadata uses the page `excerpt` or a content fallback, with the
  page `subtitle` prepended when present.
- `url` and `baseurl`: Set `url` to the site origin (for example `https://username.github.io`) and `baseurl` to its path prefix (`/repository` for a project site or an empty string for a root site). GitHub metadata can supply defaults on GitHub Pages; set these explicitly for local or custom builds so canonical links, feeds and image URLs resolve correctly. See [Clearing Up Confusion Around baseurl -- Again](https://byparker.com/blog/2014/clearing-up-confusion-around-baseurl/) by Parker Moore (Jekyll).
- `repository`: Set as the slug of your repo on GitHub (e.g.
  `dieghernan/chulapa`). **This value is unset and must be provided by the
  user**.
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
- `author` of the site:
  - `name` of the author, it will be injected on several parts of your site, as
    the footer or different `<meta>` tags. **github username** for metadata.
  - `avatar`: The avatar of the author, should be a small square image
    preferably.
  - `location`: As a nice touch, this would link to Google Maps 😉.
  - `links`: A list of social links. You may set a URL and a [Font Awesome](https://fontawesome.com/icons?d=gallery) code for each social link. You can also include an email address on this list.

See below a full example for an `author`:

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
{: .alert .alert-success .p-3 .mx-2 mb-3}

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
To load a Font Awesome kit, the current implementation reads `fa_kit_code`.

To enable v4 support, set `fa_v4_support: true`.

### Google Analytics

- `gtag_id`: Set your Google Analytics 4 measurement ID, such as `G-XXXXXXXXXX`,
  to load the Google tag.
- `analytics_id`: Retained for legacy Universal Analytics snippets. Universal Analytics has been retired, so use `gtag_id` for new setups. See [Google's migration guide](https://support.google.com/analytics/answer/10089681).

Leave unused IDs empty. If both are set, the theme loads both snippets.

### Search engines

Set `search.provider` and create a page using `layout: search`. Its `permalink`
must match `search.landing_page`, which defaults to `/search`. Selecting a
provider adds the navbar link but does not create the search page.
The following engines are available:

- [Lunr.js](https://lunrjs.com/)
- [Fuse.js](https://www.fusejs.io/)
- [Simple-Jekyll-Search](https://github.com/christian-fei/Simple-Jekyll-Search)
- [Algolia](https://www.algolia.com/)
- [Google Custom Search](https://developers.google.com/custom-search)

While Lunr, Fuse.js and Simple-Jekyll-Search are fully integrated on the theme,
for
Algolia and Google CSE you may need to create an account and perform some
additional steps.

- `search`:
  - `provider`: Select a search provider: `lunr`, `algolia`, `google`,
    `simplesearch`, `fusejs`.
  - `label`: Text to be displayed on the navbar when enabled. Useful for
    localization (i.e. you can set it as Búsqueda or Ricerca). **Search**.
  - `landing_page`: url of your search page, useful for localization.
    **"/search"**.
  - `lunr_maxwords`: **Deprecated**, use `maxwords`. Remove the old setting when
    migrating: if both are set, `lunr_maxwords` takes precedence for Lunr.
  - `maxwords`: `simplesearch`, `fusejs`, `lunr` only, number of words to be
    included in the index. **30**.
  - `show_attrib`: Show attributions/logo on search engine **true**.
  - `algolia_logo`: Controls the Algolia logo alongside `show_attrib`. Check
    your Algolia plan's attribution requirements before hiding it.

- `google_cse_id`: Your Google Custom Search id, available on _cse.google.com >
  Your search engine > Settings_.

The `jekyll-algolia` plugin is deprecated and no longer maintained by Algolia.
Its archived documentation remains available in the upstream repository.
Algolia is implemented via the `jekyll-algolia` plugin [(docs)](https://github.com/algolia/jekyll-algolia/blob/main/docs-src/src/getting-started.md), and needs a [specific configuration syntax](https://github.com/algolia/jekyll-algolia/blob/main/docs-src/src/options.md), the minimum settings are:

- `algolia`:
  - `application_id`: App id on Algolia.
  - `index_name`: Name of the index to search.
  - `search_only_api_key` : Your **public** key.

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

You can add a comment feature to a page. Currently the following services are
supported:

- [Disqus](https://disqus.com/), one of the most known comment providers for static sites,
- [Cusdis](https://github.com/djyde/cusdis), a lightweight comment system whose
  upstream project is deprecated and archived. The original hosted service is
  unavailable; check your own deployment before selecting this provider.
- [giscus](https://giscus.app/), A comments system powered by [GitHub Discussions](https://docs.github.com/en/discussions)
- [Cactus](https://cactus.chat/), a federated comment system for the web, based on the Matrix protocol
- [Welcomments](https://welcomments.io/), lightweight, fast, and SEO-friendly comment sections for your site

- `comments`:
  - `provider`: Use `disqus`, `cusdis`, `giscus`, `cactus` or `welcomments` to
    enable it.
  - `disqus_shortname`: Disqus only. Add your site id, on `https://DISQUS_SHORTNAME.disqus.com/admin/`.
  - `cusdis_app_id`: Cusdis only, the app id of your service. On cusdis see
    **Embed code** and
    use `data-app-id="THIS_IS_THE_APP_ID"`.
  - `cusdis_host`: Cusdis only. If you are self-hosting Cusdis use this field.
  - `cactus_shortname`: Cactus only. The name you used to register this site
    with Cactus.
  - `website_id`: Welcomments site id.

Configure **giscus** following their instructions and paste the resulting script
on a file hosted on your GitHub repo with path _./\_includes/custom/giscus.html_.

When setting up **Welcomments**, you may receive a pull request on your site. My
suggestion is that you ignore it (except for the `website_id`), since <span
class="chulapa">Chulapa</span> has some customized templates that would be
overridden by the files on the PR.

## B. Navigation

### Navbar

Configure the navbar and footer of your site. This theme supports a two-level
navigation structure, and features **three different navbar styles**: `fab`, as
a floating action button with animation, a **classic sticky-top navbar** or
`dual` that would display as `fab` on small devices and as a classic navbar on
bigger devices.

Check this [live demo]({{ "/demo/classic-navbar" | absolute_url }}) of the classic navbar style.

- `navbar`:
  - `style`: `fab` value would display your navbar as a [floating action button](https://material.io/components/buttons-floating-action-button). `dual` option also available. **classic**.
  - `expand`: Only affects the classical navbar. Defines on which devices the links of the navbar would expand. Values are `sm, md, lg, xl` for small, medium, large and extra-large devices, `always` or `never`. See [Bootstrap docs](https://getbootstrap.com/docs/4.5/layout/overview/) on breakpoints to understand each value. **md**.
  - `brand`:
    - `title` : Text to be displayed as the title of your navbar.
    - `img`: An icon (ideally 30px x 30 px) displayed together with the
      `title`.
    - `url`: The brand would link to this value. **your root url**.
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
    - `url`: url of the link
  - ...

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

You can also customize the copyright on the footer:

```yaml
footer:
  copyright: "&copy; 2021 <span class='chulapa'>Chulapa</span> developers"
```

<h2 id="theming"> C. Theming <span class="chulapa">Chulapa</span></h2>

This is the core feature of <span class="chulapa">Chulapa</span>, please find
the full reference [here](./03-theming), or just navigate to the next page.

## D. Jekyll defaults and collections

Please refer to Jekyll Documentation on [Collections](https://jekyllrb.com/docs/step-by-step/09-collections/), [Pagination](https://jekyllrb.com/docs/pagination/#enable-pagination) and [Front Matter Defaults](https://jekyllrb.com/docs/configuration/front-matter-defaults/), as this part would depend on the purpose and setup of your site.

The only specific parameter of <span class="chulapa">Chulapa</span> on this
section is:

- `paginator_maxnum`: This parameter would affect only if you are using the <a href="https://github.com/dieghernan/chulapa/blob/main/docs/blog/index.html"><span class="chulapa">Chulapa</span> template for pagination</a>. This parameter would define the maximum number of pagination elements to be shown. **3**.

See a sample defaults configuration [here](https://dieghernan.github.io/chulapa/docs/04-layouts#a-note-on-defaults).

## XX. Other settings

Keep the required `jekyll-include-cache` plugin enabled. Adjust other Jekyll
settings, plugins and exclusions to suit your site. The sample configuration
includes this repository's demo collections and pagination settings; these are
examples rather than requirements for every site.
