---
layout: minimal
title: Blog
subtitle: 'News and updates'
excerpt: Latest news
og_image: /assets/img/site/banner-blog.png
---
<!-- Chulapa template for pagination -->
{%- include components/headers.html headertype= page.header_type imghero=page.header_img -%}
<main class="container-lg pb-3 flex-fill">
  <div class="row pt-2 mt-3">
    <section class="col-md-8 offset-md-2">
    {% include_cached components/indexcards.html cacheddocs=paginator.posts  cachedlimit=site.paginate %}
    </section>
  </div>
</main>
{%- assign max_per_page = site.paginator_maxnum | 
                         default: 3 | at_least: 2 | 
                         at_most : paginator.total_pages -%}
                         
{%- assign prelast = paginator.total_pages | minus: 1 -%}

{%- if paginator.page < max_per_page -%}
  {%- assign init= 1 -%}
  {%- assign end= max_per_page -%}
{%- elsif paginator.page == paginator.total_pages  -%}
  {%- assign init= paginator.total_pages |
                          minus: max_per_page | plus: 1 -%}
  {%- assign end= paginator.total_pages -%}
{%- else -%}
  {%- assign init= paginator.page | minus: max_per_page | plus: 2 -%}
  {%- assign end= paginator.page | plus: 1 -%}
{%- endif -%}
{%- if paginator.total_pages > 1 -%}
	{%- if paginator.page == 1 -%}
		{%- assign prevclass = "invisible" -%}
		{%- assign firstclass = "invisible" -%}
	{%- elsif paginator.page == paginator.total_pages -%}
		{%- assign nextclass = "invisible" -%}
		{%- assign lastclass ="invisible" -%}
	{%- elsif paginator.page == 2 -%}
			{%- assign firstclass = "invisible" -%}
	{%- elsif paginator.page == prelast -%}
			{%- assign lastclass ="invisible" -%}
  {%- else -%}
	{%- endif -%}
	            <nav aria-label="Page navigation example" class="container-lg mt-4 chulapa-pagination text-center">
                <ul class="col-md-8 offset-md-2 pagination justify-content-around ">
                    <li class="page-item {{ firstclass }} ">
                        <a class="page-link border-0 px-3 px-sm-4" href="{{- site.paginate_path | relative_url | replace: '/page:num/', '' -}}" tabindex="-1">
                            <i class="fa fa-step-backward" aria-hidden="true"></i><span class="sr-only">First</span>
                        </a>
                    </li>
                    <li class="page-item {{ prevclass }}">
                        <a class="page-link border-0 px-3 px-sm-4" href="{{- paginator.previous_page_path | relative_url -}}">
                            <i class="fa fa-chevron-left" aria-hidden="true"></i><span class="sr-only">Previous</span>
                        </a>
                    </li>
                    <li class="d-flex flex-grow-1">
                    <ul class="list-unstyled d-flex flex-grow-1 justify-content-center chulapa-pagination-inner">
                      {% for num in (init..end) -%}
                      
                        <li class="page-item {% if num== paginator.page %} active {%- endif -%}">
                          <a class="page-link border-0 rounded-0" href="{%- if num == 1 -%}{{- site.paginate_path | relative_url | replace: '/page:num/', '' -}}
                          {%- else  -%}{{- site.paginate_path | relative_url | replace: ':num', num -}}{%- endif -%}
                          ">{{- num -}}</a></li>
                      {%- endfor %}
                    </ul>
                    </li>
                    <li class="page-item {{ nextclass }}">
                        <a class="page-link border-0 px-3 px-sm-4" href="{{- paginator.next_page_path | relative_url -}}">
                            <i class="fa fa-chevron-right" aria-hidden="true"></i><span class="sr-only">Next</span></a>
                    </li>
                    <li class="page-item {{ lastclass }}">
                        <a class="page-link border-0 px-3 px-sm-4" href="{{- site.paginate_path | relative_url | replace: ':num', paginator.total_pages -}}">
                            <i class="fa fa-step-forward" aria-hidden="true"></i><span class="sr-only">Last</span></a>
                    </li>
                </ul>
            </nav>
{%- endif %}
