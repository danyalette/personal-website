---
layout: page
title: Categories
permalink: /category/
exclude_from_nav: true
---
{% for category in site.categories %}
   {% assign category_name = category | first | strip_html %}
   {% assign category_handle = category_name | regexreplace: ' &.+; |[^a-zA-Z-]+', '-' %}
   - <a href="/category/{{ category_handle}}">{{ category_name }}</a>
{% endfor %}
