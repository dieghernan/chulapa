---
title: "Layouts & Snippets"
subtitle: Add your content
excerpt: Learn how to start adding your content to your new site
mathjax: true
show_toc: true
h_max: 4
---

Once that you have set your site and you are happy with the look, you can start creating your content.

It is assumed that you are familiar with [Markdown](https://markdown-it.github.io/) and [Jekyll](https://jekyllrb.com/docs/), so this would not be covered on this page. Instead, we focus on the Layouts and Snippets installed on <span class="chulapa">Chulapa</span>.

You can check some demos on [this section](https://dieghernan.github.io/chulapa/demo).

## A. Layouts

### All purposes

#### Default

The core layout of this theme. You may use it for any page, i.e. posts, pages, collections, etc. The `default` layout is shipped with several optional components that you can enable via the front matter. To enable it:

```yaml

# On a specific page 

---
layout: default
---

```

You can avoid typing this on each page by setting this layout as the default layout for all the pages via `_config` and [front matter defaults](https://jekyllrb.com/docs/configuration/front-matter-defaults/):

```yaml

defaults:
  -
    scope:
      path: ""
    values:
      layout: "default"

```

##### Options

Additional options you can set on the front matter or via defaults:

- `title`, `subtitle`: Content-related.
- `date`, `last_modified_at`: Date of the page and last modification date. See [here](https://jekyllrb.com/docs/variables/#page-variables) to learn the accepted format of dates.
- `excerpt`: Brief description of the content. If not provided <span class="chulapa">Chulapa</span> would create it as the first paragraph of the content. Note that in the case of documents under `posts` Jekyll allows [additional options](https://jekyllrb.com/docs/posts/#post-excerpts).
- `mathjax`: Would activate $$MathJax$$ on the page. 
- `og_image`: OpenGraph image displayed on the web and social networks when sharing the page. This image would not be displayed on the page.
- `header_type`: Choose between four different headers: `base`, `post`, `hero`, `splash` or no header with any other option.
- `header_img`: Image to be displayed on the header. If `og_image` is not set, this would be also the image to be displayed when sharing the page.

**Heads up!** Some social networks would not show the image on sharing if it doesn't meet some criteria (i.e. Whatsapp doesn't display images with a size greater than 300Kb). On that cases you may prefer to set a high resolution image on `header_img` and a miniature on `og_image`.
{: .alert .alert-info .p-3 .mx-2}

- `project_links`: If you want to embed buttons as links on your header this option would do it for you. Typical example could be a page on your site that refers to an external project hosted on a different environment. An example of use:

```yaml
---
title: External project
project_links:
    - url: https://github.com/XXX # url1
      icon: fab fa-github         # Fontawesome icon code1
      label: View on Github       # Label on button 1
    - url: https://colab.research.google.com/XXX #url2
      icon: fab fa-python   # Fontawesome icon code2
      label: Open in Colab  # Label on button 2
---
```
- `show_date`: This would display the date of the page and the last modified date, if provided.
- `show_sociallinks`: This option would display a navbar with sharing links to Facebook, Twitter, Whatsapp and LinkedIn.
- `show_author`: Set it to `true` to display the author of the page. By default it would display the `author` set on your [global settings](https://dieghernan.github.io/chulapa/docs/02-config), but you can override it via the page front matter:

```yaml
---
title: "Plain post 2"
subtitle: "Example 2"
author:
  name: Another name
  location: Santiago de Compostela
  avatar: http://github.com/devdieghernan.png
  links:
    - url: https://twitter.com/jack2
      icon: "fab fa-twitter"
---
```

- `show_toc`: Would display a table of contents of the page (thanks to [@allejo](https://github.com/allejo/jekyll-toc)). 

**A technical note** Only headings with `id` would be displayed. If you are including headers via markdown (`### Title`) you don't have to worry, as **kramdown** would do it for you. However if you are using `html` (`<h1 id="aa>My heading</h1>`) don't forget to include the `id`.
{: .alert .alert-info .p-3 .mx-2}


- `h_min` and `h_max`: Minimum and maximum heading level to be included in the table of contents. **min: 2, max:  4**.

- `show_bottomnavs`: Would display navigation buttons on the bottom of the page for easily navigate to the next and previous page.

- `show_categories` and `show_tags` would display badges at the bottom with the `categories` and `tags` set for the page. This badges could be set as links to a cloud tag page, with the landing page url defined on `cloudtag_url` and `cloudcategory_url`. See [Cloud tags](#cloud-tags-and-categories) layouts.
- `include_on_search`: This would prevent the page to be indexed by `lunr` search engine. If you use `algolia` this would downgrade the page rank, but it would still appear on the search results. Refer to [the Algolia docs](https://community.algolia.com/jekyll-algolia/options.html#files-to-exclude) to see how to exclude a specific page.

- `include_on_feed`: Include on your feed this page.

**Note that** the page would be included on the feed if this option is set to `true` **and** there is a `date` set. Post on Jekyll needs a date already present in the name of the file, but pages and collections don't, so set a `date` value for those. Also, you must have a copy of [this file](https://raw.githubusercontent.com/dieghernan/chulapa/master/docs/rss.xml)  on the root of your repo (where your `_config` file is hosted) named `rss.xml`.
{: .alert .alert-warning .p-3 .mx-2}

- `show_comments`: Activates comments on the page.


#### Landing page

This is a version of the `default` layout that uses your `primary` as the body color. You can fine-tune this color by using `hero-chulapa-bg-color`. 
```yaml
---
layout: landingpage
---
```

The options available are exactly the same than the described on the [`default`](#default) layout.

#### Minimal

Minimal layout including only the navbar and the footer. Available options are:
`title, subtitle, date, excerpt, mathjax, og_image, include_on_search, include_on_feed, show_comments`.

```yaml
---
layout: minimal
---
```

### Specific purpose

All these layouts are meant to be used for specific purposes rather than for overall content. These layouts are linked to the `default` layout, so all the options described above also apply.

#### Archive

This layout creates an historic archive of your content. See an example [here](https://dieghernan.github.io/chulapa/demo/archive). Currently you can include any collection (including `_posts`) or select some. This allows you to have specific archives by collection and an overall archive for all your content.

Options available:
- `include_collection`: Name of the collection or collection (separated by `,` to be included on the page.  If not provided, **all the documents of all the collections would be included**.
- `include_missdates`: Set it to `true` if you want to include also those pages without a date.

```yaml
---
layout: archive
---
```


#### Cloud tags and categories

There are two layouts you can use to create clouds of tags and categories:

```yaml
---
layout: cloudtag
---

OR

---
layout: cloudcategory
---
```

For setting up the clouds you may perform two steps:

**1. Set the url were the tag cloud would be host**

This could be easily done on your `_config` file via [defaults](https://jekyllrb.com/docs/configuration/front-matter-defaults/). This example would show how to set this for a specific collection [NAME OF YOUR COLLECTION]:

```yaml
  -
    scope:
      path: ""
      type: "[NAME OF YOUR COLLECTION]"
    values:
      layout: "default"
      header_type: "base"
      cloudtag_url        : "[URL_CLOUDTAG]"
      cloudcategory_url   : "[URL_CLOUDCATEGORY]"
```


**2. Create the page and host it in that `url` using this layout**

The front matter of your cloud page:

```yaml
---
layout: cloudtag #OR cloudcategory
permalink: [URL_CLOUDTAG] # OR [URL_CLOUDCATEGORY]
include_collection: [NAME OF YOUR COLLECTION]
---
```

The `include_collection` is optional, see [Archive](#archive) layout.

See a working example of the cloud tag on a list of collections [here]({{"./demo/tags" | absolute_url }}).


#### Index category

This layout creates an index of pages of a specific collection with a [card layout](https://getbootstrap.com/docs/4.5/components/card/):

```yaml
---
layout: indexcategory
---
```

Optional arguments:
- `include_collection`: see [Archive](#archive) layout.
- `index_sort`: Sorting variable extracted from the front matter, as `title`, `date` or any custom variable. **name of the file**.
- `index_sort_asc`: Set it to `true` if yo want to have the cards sorted in ascending order.
- `page.index_items`: Limit the number of items to be displayed. **10**.

See a working example [here](https://dieghernan.github.io/chulapa/demo).

**Note that** for `posts` you have a better option provided by [`jekyll-paginate`](https://jekyllrb.com/docs/pagination/#enable-pagination). If you go for this option, copy [this file](https://github.com/dieghernan/chulapa/blob/master/docs/blog/index.html) and use it on your site, according to your `paginate_path`.
{: .alert .alert-info .p-3 .mx-2}


## B. Snippets

Snippets are small pieces of code that are available for you and may be useful for specific contents, as dates or images.

### Masonry gallery

If you want to create a [masonry-like gallery](https://masonry.desandro.com/) you can include this snippet in any part of your site.

You can use it with external or internal pages, see a small sample with external images:

{% raw %}
```
{% assign externalgallery = "
https://picsum.photos/seed/10/600/1200,
https://picsum.photos/seed/20/800/500,
https://picsum.photos/seed/30/900/1200,
https://picsum.photos/seed/40/900/1300,
https://picsum.photos/seed/50/750/325,
https://picsum.photos/seed/60/600,
https://picsum.photos/seed/70/700/500" %}

{% include_cached snippets/masonry.html external=externalgallery %}
```
{% endraw %}

That would produce this results:

{% assign externalgallery = "
https://picsum.photos/seed/10/600/1200,
https://picsum.photos/seed/20/800/500,
https://picsum.photos/seed/30/900/1200,
https://picsum.photos/seed/40/900/1300,
https://picsum.photos/seed/50/750/325,
https://picsum.photos/seed/60/600,
https://picsum.photos/seed/70/700/500" %}

{% include_cached snippets/masonry.html external=externalgallery %}

For use it with internal images you may set first a [front matter on your desired path](https://jekyllrb.com/docs/static-files/#add-front-matter-to-static-files). As an example, these docs has an external gallery on `./assets/img/gallery`:

```yaml
  -
    scope:
      path: "assets/img/gallery"
    values:
      image_col         : gallery
```

Then just copy the following snippet:

{% raw %}
```
{% include_cached snippets/masonry.html internal="gallery" %}
```
{% endraw %}

{% include_cached snippets/masonry.html internal="gallery" %}

### Video support

This snippet has been taken from [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/docs/helpers/#responsive-video-embed), so you may want to check its docs. Providers available are Youtube, Vimeo, videos hosted on Google Drive and bilibili.


{% raw %}
```
{% include snippets/video.html id="XSq82im-Zkk" provider="youtube" %}
```
{% endraw %}

{% include snippets/video.html id="XSq82im-Zkk" provider="youtube" %}


### Localization of dates

Overall <span class="Chulapa">Chulapa</span> has been designed bearing in mind localization. For that reason, no fixed text are provided by the theme in any layout, and some options (as Search labels) could be modified via `_config`.

When dealing with dates, I have designed a snippet that would try to translate months and weekdays to the language set on your `locale` variable on `_config`. As this moment, **english (default)**, french, spanish and german are supported. To use it.

**Date formatting** in Liquid is quite flexible. You can have a look to the [Jekyll documents](https://jekyllrb.com/docs/liquid/filters/) and the [official Liquid page](https://shopify.github.io/liquid/filters/date/)
{: .alert .alert-info .p-3 .mx-2}

Note that in the next examples you can skip the `lang` parameter, as by default your locale will be used.


{% raw %}
```
{%- assign formatdate = "2020-02-14" | date: "%A %d, %B %Y" %}

Raw date output is {{ formatdate }}

Without parameter: {% include snippets/datetranslate.html  date=formatdate  %}

In spanish: {% include snippets/datetranslate.html  date=formatdate lang="es-ES" %}

In german: {% include snippets/datetranslate.html  date=formatdate lang="de" %}

In french: {% include snippets/datetranslate.html  date=formatdate lang="fr" %}

Any other value in english: {% include snippets/datetranslate.html  date=formatdate lang="it" %}

```
{% endraw %}


{%- assign formatdate = "2020-02-14" | date: "%A %d, %B %Y" %}

Raw date output is {{ formatdate }}

Without parameter: {% include snippets/datetranslate.html  date=formatdate  %}

In spanish: {% include snippets/datetranslate.html  date=formatdate lang="es-ES" %}

In german: {% include snippets/datetranslate.html  date=formatdate lang="de" %}

In french: {% include snippets/datetranslate.html  date=formatdate lang="fr" %}

Any other value in english: {% include snippets/datetranslate.html  date=formatdate lang="it" %}



**Contribute** via PR and help us expand this feature.
{: .alert .alert-info .p-3 .mx-2}


