---
title: Global settings
subtitle: Learn how to set up your new site
excerpt: Setting up your new site
show_toc: true
h_min: 2
h_max: 5
---

<p class="font-weight-light font-italic lead">TL;DR</p>

Learn how to modify your `_config.yml` file. If you are using the remote method and you didn't fork the [chulapa-101 repo](https://github.com/dieghernan/chulapa-101), you can use [this file](https://github.com/dieghernan/chulapa/blob/master/_config.yml) as a starting point. Don't forget to add also `remote_theme: dieghernan/chulapa@[version]` to your file.

For some variables, a default value is provided. This value is shown at the end of the explanation **on bold**.


## A. Site settings/SEO

- `locale`: Set the `lang` on the `<head>` of your site. Use the format `language-TERRITORY` , e.g fr, en-GB, es-MX, pt-BR. **Default value: en-US**.
- `title`, `title_separator` and `subtitle`: Set several `<meta>` tags and defines the text to be displayed on top of the browsers. **repository_name \| project_tagline**.
- `description`:  Brief description of your site. **project_tagline**.
- `url` and `baseurl`: If you are deploying on Github just ignore these pesky two. You may (or may not) want to read [Clearing Up Confusion Around baseurl -- Again](https://byparker.com/blog/2014/clearing-up-confusion-around-baseurl/) by Parker Moore (Jekyll).
- `repository`: Set as the slug of your repo on Github (e.g. `dieghernan/chulapa`). **This value is unset and must be provided by the user**-
- `words_per_minute`: Used for computing the reading time of the page. **200**.
- `timezone`: Used for setting the timezone of your dates and hours. See [Jekyll Docs](https://jekyllrb.com/docs/configuration/options).

### SEO

**Search Engine Optimization** is important (obviously) for any site. Some of the previous options would affect to SEO, however <span class="chulapa">Chulapa</span> has a specific focus on that (check also [our PageSpeed Results](https://dieghernan.github.io/chulapa/pagespeed)):

- `og_image`: The default image to be displayed  when a page of your site is shared on any of the major social networks (Facebook, Twitter/X, etc.). If `header_img` or `og_image` are set on  the front matter of a page those images would be used instead. **Author avatar (if set, see below) or your Github avatar**.
- `twitter_site`: The twitter/X username **without @!** of the owner of the site. Useful when sharing on Twitter/X.
- `author` of the site:
  - `name` of the author, it will be injected on several parts of your site, as the footer or different `<meta>` tags. **github username** for metadata.
  - `avatar`:  The avatar of the author, should be a small square image      preferably.
  - `location`: As a nice touch, this would link to Google Maps 😉.
  - `links`: A list of social links. You may set an url and a [Fontawesome 5](https://fontawesome.com/icons?d=gallery) code for each social link. You can also include an email address on this list. 

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

**Your pages would look awesome on social networks**: You don't have to set anything, the theme already shipped this for you. Twitter Cards, LinkedIn Post Inspector, Facebook Validator, WhatsApp and some structured data! Every page shared would look awesome.
{: .alert .alert-success .p-3 .mx-2 mb-3}

### Fontawesome

<span class="chulapa">Chulapa</span> has its own installation of Fontawesome 6, so you don't need to set anything. However, if you want to use your own kit, jump to your Fontawesome account and grab the kitcode. Implement this kitcode after `fa_kit_code:`.

To enable v4 support, set `fa_v4_support: true`.

### Google Analytics

- `gtag_id` and `analytics_id`: Use either your gtag (recommended) or your Google Analytics tracking code. [Learn more](https://developers.google.com/analytics/devguides/collection/gtagjs).

### Search engines

When enabled, this theme would install an internal search capability of your site. 
The following engines are available:

- [Lunr.js](https://lunrjs.com/)
- [Fuse.js](https://www.fusejs.io/)
- [Simple-Jekyll-Search](https://github.com/christian-fei/Simple-Jekyll-Search)
- [Algolia](https://www.algolia.com/)
- [Google Custom Search](https://developers.google.com/custom-search)

While Lunr, Fuse.js and Simple-Jekyll-Search are fully integrated on the theme, for 
Algolia and Google CSE you may need to create an account and perform some additional steps.

- `search`:
  - `provider`: Select a provider for enable search: `lunr`, `algolia`, `google`, `simplesearch`, `fusejs`.
  - `label`: Text to be displayed on the navbar when enabled. Useful for localization (i.e. you can set it as Búsqueda or Ricerca). **Search**.
  - `landing_page`:  url of your search page, useful for localization. **"/search"**.
  - `lunr_maxwords`: **DEPRECATED**, use `maxwords`.
  - `maxwords`: `simplesearch`, `fusejs`, `lunr` only, number of words to be
     included in the index. **30**.
  - `show_attrib`: Show attributions/logo on search engine **true**.
  - `algolia_logo`: Your must set it as `true` if your are on a Community (Free) Algolia plan.  

- `google_cse_id`: Your Google Custom Search id, available on *cse.google.com > Your search engine > Settings*.

Algolia is implemented via the `jekyll-algolia` plugin [(docs)](https://community.algolia.com/jekyll-algolia/getting-started.html), and needs a [specific configuration syntax](https://community.algolia.com/jekyll-algolia/options.html), the minimal requirement are:

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

If you are deploying your site with Github Pages, I recommend using this [GitHub Action](https://github.com/marketplace/actions/algolia-jekyll-action) to create and update your Algolia index after every commit automatically.

### Comments

You can add a comment feature to a page. Currently the following services are supported:
  
  - [Disqus](https://disqus.com/), one of the most known comment providers for static sites,
  - [cusdis](https://cusdis.com/), a lightweight, privacy-first, open-source comment system,
  - [giscus](https://giscus.app/),  A comments system powered by [GitHub Discussions](https://docs.github.com/en/discussions)
  - [Cactus](https://cactus.chat/), a federated comment system for the web, based on the Matrix protocol
  - [Welcomments](https://welcomments.io/), lightweight, fast, and SEO-friendly comment sections for your site


- `comments`:
  - `provider`: Use `disqus`, `cusdis`, `giscus`, `cactus` or `welcomments` to enable it.
  - `disqus_shortname`: Disqus only. Add your site id, on `https://DISQUS_SHORTNAME.disqus.com/admin/`.
  - `cusdis_app_id`:  Cusdis only, the app id of your service. On cusdis see **Embed code** and
      use `data-app-id="THIS_IS_THE_APP_ID"`.
  - `cusdis_host`: Cusdis only. If you are self-hosting Cusdis use this field.
  - `cactus_shortname`: Cactus only. The name of the name that you use for registering this site
      with Cactus.
  - `website_id`: Welcomments site id.

Configure **giscus** following their instructions and paste the resulting script on a file hosted on your GitHub repo with path *./_includes/custom/giscus.html*.

When setting up **Welcomments**, you may receive a pull request on your site. My suggestion is that you ignore it (except for the `website_id`), since <span class="chulapa">Chulapa</span> has some customised templates that would be overridden by the files on the PR.

## B. Navigation

### Navbar
Configure the navbar and footer of your site. This theme supports a two-level navigation structure, and features **three different navbar styles**: `fab`, as a floating action button with animation, a **classic sticky-top navbar** or `dual` that would display as `fab` on small devices and as a classic navbar on bigger devices. 

Check this [live demo]({{ "/demo/classic-navbar" | absolute_url }}) of the classic navbar style.

- `navbar`:
  - `style`:  `fab` value would display your navbar as a [floating action button](https://material.io/components/buttons-floating-action-button). `dual` option also available.  **classic**.
  - `expand`: Only affects the classical navbar. Defines on which devices the links of the navbar would expand. Values are `sm, md, lg, xl` for small, medium, large and extra-large devices, `always` or `never`. See [Bootstrap docs](https://getbootstrap.com/docs/4.5/layout/overview/) on breakpoints to understand each value. **md**.
  - `brand`:
     - `title` :  Text to be displayed as the title of your navbar.
     - `img`: An icon (ideally 30px x 30 px) displayed together with the `title`.
     - `url`: The brand would link to this value. **your root url**.
  - `nav`: Links on your navbar. See the example to learn how to set one-level and two-level links:
  
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
    - `icon`: Fontawesome icon code.
    - `url`: url of the link
  - ...
    
```yaml
footer:
  links:
    - label: "RSS"
      icon: "fa fa-rss"
      url:  "./atom.xml"
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

This is the core feature of <span class="chulapa">Chulapa</span>, please find the full reference [here](./03-theming), or just navigate to the next page.

## D. Jekyll Defaults and collections

Please refer to Jekyll Documentation  on [Collections](https://jekyllrb.com/docs/step-by-step/09-collections/), [Pagination](https://jekyllrb.com/docs/pagination/#enable-pagination) and [Front Matter Defaults](https://jekyllrb.com/docs/configuration/front-matter-defaults/), as this part would depend on the purpose and setup of your site. 

The only specific parameter of <span class="chulapa">Chulapa</span> on this section is:
- `paginator_maxnum`: This parameter would affect only if you are using the <a href="https://github.com/dieghernan/chulapa/blob/master/docs/blog/index.html"><span class="chulapa">Chulapa</span> template for pagination</a>. This parameter would define the maximum number of pagination elements to be shown. **3**.

Have a look to a potential Default configuration [here](https://dieghernan.github.io/chulapa/docs/04-layouts#a-note-on-defaults).


## XX. Other settings.

You don't need to modify anything on that section, but obviously you can.

