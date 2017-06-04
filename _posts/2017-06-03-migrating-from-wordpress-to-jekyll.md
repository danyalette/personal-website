---
layout: post
title:  "Migrating From Wordpress To Jekyll"
date:   2017-06-03 04:05:00 -0400
published: false
---

* TOC
{:toc}

## Export Your Data From Wordpress

- featured images
- plugin to export
- read more tag
- static homepage
- permalinks: set them in `_config.yml`, in file itself, and in filename

- deploying
  - code deployment
  - build for urls
  - \_site dir?
  - htaccess?

- useful commands

```bash
  open $(bundle show jekyll-swiss)
  bundle install
  bundle exec jekyll serve
  jekyll build
```
