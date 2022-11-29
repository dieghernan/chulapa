---
layout: minimal
title: Layout minimal
subtitle: A blank canvas for you
excerpt: Use the layout minimal with html to unleash your creativity
categories: [demo,layout]
header_type: splash
header_img: /assets/img/gallery/city-spain-dense-17658.jpg
tags: [layout-minimal,header-splash, image, project-links, bootstrap]
project_links:
    - url: https://startbootstrap.com/previews/one-page-wonder/
      label: Adapted from Start Bootstrap
---

{% include components/headers.html headertype= page.header_type imghero=page.header_img projects=page.project_links %}

<section>
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-6 order-lg-2">
        <div class="p-5">
          <img class="img-fluid rounded-circle" src="https://picsum.photos/seed/ch1/700/700.jpg" alt="">
        </div>
      </div>
      <div class="col-lg-6 order-lg-1">
        <div class="p-5">
          <h2 class="display-4 text-center te t-lg-left">Use any Bootstrap Template!</h2>
          <p>Some examples on <a href="https://getbootstrap.com/docs/4.5/examples/">Bootstrap Documentation</a>, <a href="https://startbootstrap.com/">StartBootstrap</a> or  <a href="https://www.google.com/search?q=%22Bootstrap+Templates%22">just Google it!</a> </p>
        </div>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-6">
        <div class="p-5">
          <img class="img-fluid rounded-circle" src="https://picsum.photos/seed/ch2/700/700.jpg" alt="">
        </div>
      </div>
      <div class="col-lg-6">
        <div class="p-5">
          <h2 class="display-4 text-center te t-lg-left">Just use HTML</h2>
          <p>Markdown files support also <code>html</code> code. Just copy and paste</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-6 order-lg-2">
        <div class="p-5">
          <img class="img-fluid rounded-circle" src="https://picsum.photos/seed/ch3/700/700.jpg" alt="">
        </div>
      </div>
      <div class="col-lg-6 order-lg-1">
        <div class="p-5">
          <h2 class="display-4 text-center te t-lg-left">Let there be rock!</h2>
          <p><span class="chulapa">Chulapa</span> and Bootstrap FTW!</p>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="container-lg my-1">
  <div class="row">
    <div class="col-lg-8 offset-lg-2 col" markdown="1">
```yaml
---
layout: minimal
title: Layout minimal
subtitle: A blank canvas for you
excerpt: Use the layout minimal with html to unleash your creativity
categories: [demo,layout]
header_type: splash
header_img: /assets/img/gallery/city-spain-dense-17658.jpg
tags: [layout-minimal,header-splash, image, project-links, bootstrap]
project_links:
    - url: https://startbootstrap.com/previews/one-page-wonder/
      label: Adapted from Start Bootstrap
---
```

  </div>
</div>

{%- include components/navbeforeafter.html -%}
