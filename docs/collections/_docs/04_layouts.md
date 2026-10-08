---
title: "Layouts and snippets"
subtitle: Add your content
excerpt: Learn how to start adding your content to your new site
mathjax: true
show_toc: true
h_max: 4
---

Once you have configured your site and you are happy with the look, you can
start creating your content.

It is assumed that you are familiar with [Markdown](https://markdown-it.github.io/) and [Jekyll](https://jekyllrb.com/docs/), so this would not be covered on this page. Instead, we focus on the layouts and snippets included on <span class="chulapa">Chulapa</span>.

You can check some demos on [this section](https://dieghernan.github.io/chulapa/demo).

## A. Layouts

### General purpose

#### Default

The core layout of this theme. You may use it for any page, i.e. posts, pages,
collections, etc. The `default` layout is shipped with several optional
components that you can enable via the front matter. To enable it:

```yaml

# On a specific page

---
layout: default
---

```

You can avoid typing this on each page by setting this layout as the default layout for all the pages via `_config.yml` and [front matter defaults](https://jekyllrb.com/docs/configuration/front-matter-defaults/):

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
- `og_image`: Open Graph image displayed on the web and social networks when
  sharing the page. This image would not be displayed on the page.
- `schema_image`: A representative image URL or list of image URLs for a post's
  `BlogPosting` JSON-LD. It overrides the article image without changing Open
  Graph, Twitter cards or the visible header. See [Article
  images](#article-images).
- `robots`: Search crawler directives for the page, post or collection document.
  The default is `index, follow`; missing, empty or whitespace-only values use
  this default. For example, set this in a page's front matter:

```yaml
---
title: My page
robots: "noindex, follow"
---
```

You can also set `robots` through front matter defaults in `_config.yml`:

```yaml
defaults:
  - scope:
      path: "private-pages"
    values:
      robots: "noindex, follow"
```

An explicit page value overrides these defaults. Crawlers must be able to access the page to read its robots metadata; blocking the page in `robots.txt` prevents them from reading `noindex`. This option controls only the HTML metadata and does not change HTTP status codes, `robots.txt` or sitemap entries. The theme does not automatically apply `noindex` to error pages, search pages, tags, archives or pagination. See [Google's robots metadata documentation](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag).

- `header_type`: Choose `base`, `post`, `hero`, `image` or `splash`. Leave it
  unset or use an unrecognized value for no header.
- `header_img`: Image to be displayed on the header. If `og_image` is not set,
  this would be also the image to be displayed when sharing the page.

**Image previews** depend on each social platform's requirements. Use an
accessible image URL and check the resulting preview. You can use a
high-resolution image for `header_img` and a smaller sharing image for
`og_image`.
{: .alert .alert-info .p-3 .mx-2}

- `project_links`: If you want to embed buttons as links on your header this
  option would do it for you. Typical example could be a page on your site that
  refers to an external project hosted on a different environment. An example of
  use:

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
- `show_date`: This would display the date of the page and the last modified
  date, if provided.
- `show_sociallinks`: This option would display a navbar with sharing links to
  Facebook, Twitter, Whatsapp and LinkedIn.
- `show_author`: Set it to `true` to display the author of the page. By default it would display the `author` set on your [global settings](https://dieghernan.github.io/chulapa/docs/02-config), but you can override it via the page front matter:

```yaml
---
title: "Plain post 2"
subtitle: "Example 2"
author:
  name: Another name
  location: Santiago de Compostela
  avatar: https://github.com/devdieghernan.png
  links:
    - url: https://twitter.com/jack2
      icon: "fab fa-twitter"
      label: "Twitter"
---
```

- `show_toc`: Would display a table of contents of the page (thanks to [@allejo](https://github.com/allejo/jekyll-toc)).

- `show_sidetoc`: Alternative implementation of `show_toc` where the table of
  contents is displayed on an sliding off-canvas sidebar. You would notice a new
  button <button class="btn btn-primary btn-sm rounded-right bs-canvas-anim
  chulapa-btn-nofocus chulapa-fa-static" aria-label="Example button"
  style="opacity:0.4;border-top-left-radius: 0;
  border-bottom-left-radius: 0;">
		<i class="fa-solid fa-plus"></i><span class="sr-only">Example button</span>
	</button> on the left side of your page, click it to expand the sidebar table of contents. See the implementation on the [Current skin](https://dieghernan.github.io/chulapa/skins/current).

**A technical note** Only headings with `id` would be displayed. If you are
including headers via markdown (`### Title`) you don't have to worry, as
**kramdown** would do it for you. However if you are using `html` (`<h1
id="aa">My heading</h1>`) don't forget to include the `id`.
{: .alert .alert-info .p-3 .mx-2}

- `h_min` and `h_max`: Minimum and maximum heading level to be included in the
  table of contents. **min: 2, max: 4**.

- `show_related`: Display up to three related collection documents, excluding
  the current page. Candidates must share at least two tags if they are in the
  same collection or at least three tags otherwise. More matches rank first,
  with newer dates used within each score.

- `show_random`: Display up to three randomly selected documents from the same
  candidate pool as `show_related`. Selection happens at build time, so the
  cards do not change on every page load.

- `related_label` and `random_label`: Insert a text just before the related
  pages. You can use html code.

- `show_bottomnavs`: Would display navigation buttons on the bottom of the page
  for easily navigate to the next and previous page.

- `show_categories` and `show_tags` would display badges at the bottom with the
  `categories` and `tags` set for the page. These badges could be set as links
  to a cloud tag page, with the landing page url defined on `cloudtag_url` and
  `cloudcategory_url`. See [Cloud tags](#cloud-tags-and-categories) layouts.
- `include_on_search`: Set to `false` to exclude a page from the Lunr, Fuse.js and Simple-Jekyll-Search indexes. Pages are included unless this value is explicitly `false`. For Algolia, this setting affects ranking only when configured in `customRanking`; it does not exclude records. Use [Algolia's `files_to_exclude`](https://github.com/algolia/jekyll-algolia/blob/main/docs-src/src/options.md#files_to_exclude) to exclude files. This option does not control external search crawlers; use `robots` for crawler directives.

- `include_on_feed`: Include on your feed this page.

**Note that** the page would be included on the feed if this option is set to `true` **and** there is a `date` set. Posts in Jekyll need a date already present in the name of the file, but pages and collections don't, so set a `date` value for those. You have two feeds available: Atom feed at `https://yoururl/atom.xml` (preferred) and RSS 2.0 at `https://yoururl/rss.xml`.
{: .alert .alert-warning .p-3 .mx-2}

To enable feeds for all posts or use `jekyll-feed` instead, see the
[feed configuration FAQ](./05-faq#use-jekyll-feed-instead-of-chulapas-feeds).

- `show_comments`: Display the comment widget when a supported
  `comments.provider` is configured.
- `show_breadcrumb`: Shows breadcrumb navigation on a page. Use with
  `breadcrumb_list`.
- `breadcrumb_list`: A list with breadcrumbs. It is a good practice to set this
  on your defaults.

```yaml
---
title: "Plain post 3"
show_breadcrumb: true
breadcrumb_list:
  - label: Home
    url: /
  - label: Demo
    url: /demo
---
```

See an example [here](https://dieghernan.github.io/chulapa/demo/archive).

Even if you don't want to show the breadcrumb, you can still specify the paths. The theme generates breadcrumb JSON-LD independently of `show_breadcrumb`. Without a list, non-home pages use a home/current-page breadcrumb. Structured data does not guarantee rich results. More information [here](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb) and test tool [here](https://search.google.com/test/rich-results).
{: .alert .alert-info .p-3 .mx-2}

##### Article images

For posts, use `schema_image` in front matter to identify images that represent
the article. A single URL or a YAML list is accepted. Relative URLs resolve
using the site's `url` and `baseurl`; absolute URLs remain unchanged.

```yaml
---
title: My article
schema_image: /assets/img/article.jpg
---
```

For several images, provide actual files appropriate for the article:

```yaml
schema_image:
  - /assets/img/article-16x9.jpg
  - /assets/img/article-4x3.jpg
  - /assets/img/article-1x1.jpg
```

The theme emits the URLs as a JSON-LD `image` array. It does not create crops, check image dimensions or verify that the files exist. Google recommends relevant, crawlable images and multiple high-resolution aspect ratios when available; see the [article structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/article).

The fallback order is `schema_image`, page `og_image`, then page `header_img`.
Missing values, empty strings and empty lists use the next fallback.
Whitespace-only URLs and blank entries in lists are omitted after selection; a
whitespace-only value or a nonempty list containing only blanks therefore omits
`image` rather than trying the next fallback. If no article image is available,
`image` is omitted from `BlogPosting`; the site banner, publisher logo and
author avatar are not used as article illustrations. Open Graph and Twitter
cards retain their existing site-level image fallbacks.

This option applies to posts rendered as `BlogPosting`, including values supplied through front matter defaults. Other pages keep their existing image metadata. The [Welcome post]({{ '/blog/20200515_welcome' | absolute_url }}) demonstrates an explicit `schema_image` using its existing header photograph.

### Landing page

This is a version of the `default` layout that uses a dedicated background and
text color. The background defaults to `hero-chulapa-bg-color`, which defaults
to the navbar background color. Set `landingpage-chulapa-bg-color` and
`landingpage-chulapa-text-color` through `chulapa-skin.vars` to customize it.
```yaml
---
layout: landingpage
---
```

The options available are the same as those described on the
[`default`](#default) layout.

#### Minimal

Minimal layout with the navbar, footer and an optional header. Available options are:
`title`, `subtitle`, `date`, `last_modified_at`, `excerpt`, `mathjax`,
`og_image`,
`schema_image` (for posts), `robots`, `author`, `include_on_search`,
`include_on_feed` and `show_comments`. Content is rendered directly between
the navbar and footer; author panels and tables of contents are not
added automatically.

```yaml
---
layout: minimal
---
```

##### Optional header

Minimal pages remain headerless by default, even when `header_type` is set through global defaults. To reuse a theme header while keeping the content area unrestricted, set the Boolean `show_header: true`:

```yaml
---
layout: minimal
title: My wide page
subtitle: Custom content with a theme header
show_header: true
header_type: hero
header_img: /assets/img/banner.jpg
---
```

Use the existing header types (`base`, `post`, `hero`, `image` or `splash`) and `project_links` options. A missing or unsupported `header_type`, including `none`, produces no header. Set `show_header: false` to disable the optional header on a minimal page, including when overriding front matter defaults. The option does not add a content container; your HTML controls the width and spacing. See the [minimal header demo]({{ '/demo/minimal-header' | absolute_url }}).

`show_header` controls the optional header in `minimal` and custom layouts that inherit from it. The existing headers in `default` and `landingpage` retain their behavior and render only once. To hide those headers, keep using `header_type: none`.

If a custom layout already includes its own header, add `header_in_content: true` to that layout's front matter before enabling `show_header`. This prevents the parent `minimal` layout from adding another header. Custom layouts without an existing header can use `show_header: true` directly.

### Specific purpose

All these layouts are meant to be used for specific purposes rather than for
overall content. These layouts are linked to the `default` layout, so all the
options described above also apply.

#### Archive

This layout creates a chronological archive of your content. See an example [here](https://dieghernan.github.io/chulapa/demo/archive). Currently you can include any collection (including `_posts`) or select some. This allows you to have specific archives by collection and an overall archive for all your content.

Options available:
- `include_collection`: Collection name or comma-separated collection names,
  such as `posts,demo`. Use names without leading underscores and omit spaces
  around commas. If unset, **documents from all collections are included**.
  Standalone pages are not included.
- `include_missdates`: Set it to `true` if you want to include also those pages
  without a date.

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

To set up a tag or category cloud, follow these two steps:

**1. Set the URL where the tag cloud will be hosted**

This could be easily done on your `_config.yml` file via [defaults](https://jekyllrb.com/docs/configuration/front-matter-defaults/). This example would show how to set this for a specific collection [NAME OF YOUR COLLECTION]:

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
layout: cloudtag # Use cloudcategory for categories.
permalink: [URL_CLOUDTAG] # OR [URL_CLOUDCATEGORY]
include_collection: [NAME OF YOUR COLLECTION]
---
```

Use `cloudtag` and `cloudcategory` with Jekyll 3 or 4. The old `cloudtag2` and
`cloudcategory2` layouts are compatibility aliases; no `grouptag.rb` plugin is
required.

`include_collection` is optional; see the [Archive](#archive) layout.

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
- `index_sort`: Sorting variable extracted from the front matter, as `title`,
  `date` or any custom variable. **name of the file**.
- `index_sort_asc`: Set it to `true` if you want to have the cards sorted in
  ascending order.
- `index_items`: Limit the number of items to be displayed. **10**.

See a working example [here](https://dieghernan.github.io/chulapa/demo).

**Note that** for `posts` you have a better option provided by [`jekyll-paginate`](https://jekyllrb.com/docs/pagination/#enable-pagination). If you go for this option, copy [this file](https://github.com/dieghernan/chulapa/blob/main/docs/blog/index.html) and use it on your site, according to your `paginate_path`. See a live demo on [chulapa-101](https://dieghernan.github.io/chulapa-101/blog/).
{: .alert .alert-info .p-3 .mx-2}

#### Search layout

The only purpose of this layout is to create a search page. You may not use it
in other contexts.

On the page front matter, set `permalink:` to the same value of `search:
landing_page:` you set on your `_config.yml` file, otherwise the link on the
navbar would be broken.

### Layout structure and components

A technical note about the layout structure of <span
class="chulapa">Chulapa</span>.

```
# Layout structure
#All purposes
compress   #http://jch.penibelst.de/
   |
   ├── minimal   <──├ head
                    ├ navbar
          ├──────>  ├ PAGE CONTENT
          |         ├ footer   <── components/disqus    
          |         └ custom_bottomscripts
          |
          └── default    <──├ components/headers
            /landingpage    ├ components/breadcrumbdatesocial
                            ├ components/author
                            ├ components/toc
         ├────────────>     ├ PAGE CONTENT
         |                  ├ components/navbeforeafter
         |                  ├ components/categories
         |                  └ components/tags
         |                
#Specific purpose
# default layout only
         |
         └──├ archive
            ├ cloudcategory
            ├ cloudtag
            └ indexcategory <- components/indexcards

```

`components` are designed as bricks that build up your page. The options
described above would activate the components on your page, but they can also be
used on a standalone basis. For example, to include an index of two posts you
can simply add this line to your page:

{% raw %}
```
{% include_cached components/indexcards.html cacheddocs=site.posts  cachedlimit=2 %}
```
{% endraw %}

{% include_cached components/indexcards.html cacheddocs=site.posts  cachedlimit=2 %}

### A note on defaults

[Front Matter Defaults](https://jekyllrb.com/docs/configuration/front-matter-defaults/) is a great way to avoid repeating yourself. You can inject fixed front matters to any file, collection or even static files all at once. A potential Front Matter Defaults configuration is proposed below:

```yaml
defaults:
  -
    scope:
      path: ""
    values:
      layout: "default"
      header_type         : "base"
      include_on_search   : false
      cloudtag_url        : "/tags"
      cloudcategory_url   : "/categories"
  -
    scope:
      path: ""
      type: "posts"
    values:
      header_type       : "post"
      include_on_search : true
      include_on_feed   : true
      show_date         : true
      show_bottomnavs   : true
      show_sociallinks  : true
      show_comments     : true
      show_tags         : true
      show_categories   : true
      show_author       : true
      show_toc          : false
  -
    scope:
      path: ""
      type: "YOUR COLLECTION NAME"
    values:
      header_type       : "hero"
      include_on_search : true
      show_bottomnavs   : true
      show_tags         : true
```

By doing this, you won't need to write those values on each file. Anyway, you
can override defaults on specific pages by setting a different value on its
front matter.

## B. Snippets

Snippets are small pieces of code that are available for you and may be useful
for specific contents, as dates or images.

### Masonry gallery

If you want to create a [masonry-like gallery](https://masonry.desandro.com/) you can include this snippet in any part of your site.

You can use it with external or internal pages, see a small sample with external
images:

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

This produces the following gallery:

{% assign externalgallery = "
https://picsum.photos/seed/10/600/1200,
https://picsum.photos/seed/20/800/500,
https://picsum.photos/seed/30/900/1200,
https://picsum.photos/seed/40/900/1300,
https://picsum.photos/seed/50/750/325,
https://picsum.photos/seed/60/600,
https://picsum.photos/seed/70/700/500" %}

{% include_cached snippets/masonry.html external=externalgallery %}

To use it with internal images, first set a [front matter on your desired path](https://jekyllrb.com/docs/static-files/#add-front-matter-to-static-files). As an example, these docs have an internal gallery on `./assets/img/gallery`:

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

There are four optional parameters that you can use for controlling the output:

- `index_sort`: *(internal galleries only)* See [Index category](#index-category). Note that static files, such as images, have a [limited set of variables](https://jekyllrb.com/docs/static-files/). **modified_time**.
- `index_sort_asc`: *(internal galleries only)* See [Index
  category](#index-category).
- `index_items`: See [Index category](#index-category). **100**.
- `random`: Set to `true` to shuffle images at build time. This overrides
  `index_sort`. Omit it or pass the boolean `false` to preserve the order.
  Avoid the string `"false"`, which Liquid treats as true.

{% raw %}
```
{% include_cached snippets/masonry.html internal="gallery" index_sort="basename" index_sort_asc="true" index_items=5 %}
```
{% endraw %}

{% include_cached snippets/masonry.html internal="gallery" index_sort="basename" index_sort_asc="true" index_items=5 %}

If you need further control of your output, you can just pass your internal
gallery as external:

{% raw %}
```
{% assign externalgallery = "
./assets/img/gallery/mario-gutierrez-dH7GC5QqO7Y-unsplash.jpg,
https://picsum.photos/seed/70/700/500,
./assets/img/gallery/patri-k5C0uJ6AIvo-unsplash.jpg,
./assets/img/gallery/city-spain-dense-17658.jpg,
./assets/img/gallery/fran-velasco-2OZrVix-nek-unsplash.jpg" %}

{% include_cached snippets/masonry.html external=externalgallery %}
```
{% endraw %}

{% assign externalgallery = "
./assets/img/gallery/mario-gutierrez-dH7GC5QqO7Y-unsplash.jpg,
https://picsum.photos/seed/70/700/500,
./assets/img/gallery/patri-k5C0uJ6AIvo-unsplash.jpg,
./assets/img/gallery/city-spain-dense-17658.jpg,
./assets/img/gallery/fran-velasco-2OZrVix-nek-unsplash.jpg" %}

{% include_cached snippets/masonry.html external=externalgallery %}

### Bootstrap carousel

This theme has an implementation of the [Bootstrap 4.x Carousel](https://getbootstrap.com/docs/4.4/components/carousel/). The use is similar to the Masonry component with three additional parameters:

- `interval`: The amount of time to delay between automatically cycling an item
  (ms). **5000**.
- `indicators`: Show slide indicators. **false**.

- `controls`: Show previous and next controls. **false**.

You can control the color of the indicators through your `_config.yml` file:

```yaml
chulapa-skin:
  vars:
    carousel-control-color: black
    carousel-indicator-active-bg: black

```

See a full blown example here:

{% raw %}
```
{% include_cached snippets/carousel.html internal="gallery" interval=2000 random="true" controls="true" indicators="true" %}
```
{% endraw %}

{% include_cached snippets/carousel.html internal="gallery" interval=2000 random="true" controls="true" indicators="true" %}

### Video support

This snippet has been taken from [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/docs/helpers/#responsive-video-embed), so you may want to check its docs. Providers available are `youtube`, `vimeo`, `dailymotion`, videos hosted on Google Drive (`google-drive`) and `bilibili`.

{% raw %}
```
{% include snippets/video.html id="1hXYuWTWVww" provider="youtube" %}
```
{% endraw %}

{% include snippets/video.html id="1hXYuWTWVww" provider="youtube" %}

That snippet has been extended and you can also display videos loaded via `url`:

{% raw %}
```
**Hosted on this repo**

{% include snippets/video.html fileurl="./assets/mp4/sample.mp4" %}


**publicdomainmovie.net**

{% include snippets/video.html fileurl="https://archive.org/download/bb_and_grampy/bb_and_grampy_512kb.mp4" %}


```
{% endraw %}

**Hosted on this repo**

{% include snippets/video.html fileurl="./assets/mp4/sample.mp4" %}

**publicdomainmovie.net**

{% include snippets/video.html fileurl="https://archive.org/download/bb_and_grampy/bb_and_grampy_512kb.mp4" %}

For `fileurl`, use a browser-supported format such as MP4, Ogg or WebM.
Playback also depends on the codec and browser; a supported extension alone
does not guarantee playback.
{: .alert .alert-warning .p-3 .mx-2}

#### Deferred (lazy) loading of YouTube videos

YouTube videos are lazy deferred. This means that
initially a YouTube video is displayed as the image preview and the actual video
is loaded when the user clicks on the image. This implementation intends to
improve
page speed. See also [chulapa/issues/11](https://github.com/dieghernan/chulapa/issues/11).

You can opt out of this behavior by using `nolazy` option:

{% raw %}
```
{% include snippets/video.html id="1hXYuWTWVww" provider="youtube" nolazy="true" %}
```
{% endraw %}

{% include snippets/video.html id="1hXYuWTWVww" provider="youtube" nolazy="true" %}

On lazy mode, the snippet tries to load the preview from YouTube using the
option `maxresdefault`.
This preview may not be available for a particular video. If this is happening
to you,
try loading another image using another option by using the `video_res`
parameter
(see [here](https://stackoverflow.com/a/2068371/7877917) for possible values).

{% raw %}
```
{% include snippets/video.html id="1hXYuWTWVww" provider="youtube" video_res="hq2" %}
```
{% endraw %}

{% include snippets/video.html id="1hXYuWTWVww" provider="youtube" video_res="hq2" %}

Thanks to @SCP-017 for the suggestion.

#### Optional video metadata

Both `snippets/video.html` and `snippets/youtube.html` accept these optional
inputs for the embedded video's microdata:

| Input | Property | Value |
| --- | --- | --- |
| `name` | `name` | The video's actual title. |
| `thumbnail_url` | `thumbnailUrl` | A representative, accessible image URL. Relative URLs use the site's URL and `baseurl`. |
| `upload_date` | `uploadDate` | The video's original publication date in ISO 8601 format, preferably with time and time zone. |
| `description` | `description` | A description of the video. |
| `duration` | `duration` | An ISO 8601 duration, such as `PT1M30S` for 90 seconds. |

Pass metadata per include, so several videos on the same page can have different
values. Missing, empty or whitespace-only inputs are omitted. Dates and durations
are emitted as supplied; the snippets do not validate or infer them from the
containing page. Existing calls continue to work.

These illustrative examples use placeholder metadata. Replace every value with
accurate information about your video before publishing:

{% raw %}
```liquid
{% include snippets/video.html provider="youtube" id="YOUR_VIDEO_ID" nolazy=true
   name="Your video's title" thumbnail_url="/assets/img/your-video.jpg"
   upload_date="2024-01-02T10:00:00+01:00"
   description="What your video shows." duration="PT1M30S" %}

{% include snippets/video.html fileurl="/assets/mp4/your-video.mp4"
   name="Your video's title" thumbnail_url="/assets/img/your-video.jpg"
   upload_date="2024-01-02T10:00:00+01:00" %}
```
{% endraw %}

The same inputs work with the other supported providers and with deferred
YouTube embeds. Metadata stays outside the deferred player, so it is available
before a click and remains after playback starts. `thumbnail_url` supplies
structured data only; it does not change the player, its preview or its poster.

#### Video structured data limitations

The video snippets expose the known file or player URL in microdata. Deferred
YouTube embeds also expose the preview URL before playback. The default
`maxresdefault` preview may not exist for every video; use `video_res` to choose
an available preview.

An explicit `thumbnail_url` overrides the deferred YouTube thumbnail metadata.
Without it, deferred YouTube embeds retain their existing preview URL; other
embeds require an explicit thumbnail. The snippets do not generate images or
fetch metadata from providers. Check that the image exists and represents the
video. Google requires `name`, `thumbnailUrl` and `uploadDate`; missing values
can leave the markup incomplete for Google's video features. See the
[video structured data requirements](https://developers.google.com/search/docs/appearance/structured-data/video).

Correct microdata alone does not guarantee video indexing. Google also recommends loading the player without visitor interaction and using a page whose main purpose is watching the video. Deferred YouTube embeds wait for a click. For a dedicated video page, consider `nolazy="true"`, while still checking the metadata and [video indexing requirements](https://developers.google.com/search/docs/appearance/video).

### Localization of dates

<span class="chulapa">Chulapa</span> supports localization of dates and configurable labels such as
`search.label`, `related_label` and `random_label`. Some interface and
accessibility labels remain in English; `locale` does not translate the entire
interface.

When dealing with dates, I have designed a snippet that would try to translate
months and weekdays to the language set on your `locale` variable on
`_config.yml`. Currently, **English (default)**, French, Spanish, German and
Italian are supported. The snippet lowercases the supplied date string, replaces
English month and weekday names and uses the first two characters of `lang` or
`site.locale`. Unsupported languages retain English names in lowercase.

**Date formatting** in Liquid is quite flexible. You can see the [Jekyll documents](https://jekyllrb.com/docs/liquid/filters/) and the [official Liquid page](https://shopify.github.io/liquid/filters/date/)
{: .alert .alert-info .p-3 .mx-2}

Note that in the next examples you can skip the `lang` parameter, as by default
your locale will be used.

{% raw %}
```
{%- assign formatdate = "2020-02-14" | date: "%A %d, %B %Y" %}

- Raw date output is {{ formatdate }}

- Without parameter: {% include snippets/datetranslate.html  date=formatdate  %}

- In spanish: {% include snippets/datetranslate.html  date=formatdate lang="es-ES" %}

- In german: {% include snippets/datetranslate.html  date=formatdate lang="de" %}

- In french: {% include snippets/datetranslate.html  date=formatdate lang="fr" %}

- In italian: {% include snippets/datetranslate.html  date=formatdate lang="it" %}

- Any other value in english: {% include snippets/datetranslate.html  date=formatdate lang="zh" %}

```
{% endraw %}

{%- assign formatdate = "2020-02-14" | date: "%A %d, %B %Y" %}

- Raw date output is {{ formatdate }}

- Without parameter: {% include snippets/datetranslate.html date=formatdate %}

- In spanish: {% include snippets/datetranslate.html date=formatdate lang="es-ES" %}

- In german: {% include snippets/datetranslate.html date=formatdate lang="de" %}

- In french: {% include snippets/datetranslate.html date=formatdate lang="fr" %}

- In italian: {% include snippets/datetranslate.html date=formatdate lang="it" %}

- Any other value in english: {% include snippets/datetranslate.html date=formatdate lang="zh" %}

**Contribute** via PR and help us expand this feature.
{: .alert .alert-info .p-3 .mx-2}
