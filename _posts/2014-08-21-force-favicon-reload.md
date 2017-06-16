---
id: 154
title: Force Favicon Reload
date: 2014-08-21T18:00:32+00:00
author: danya
layout: post
categories:
  - 'html'
---
```html
<link rel="shortcut icon" href="http://website.com/favicon.ico?v=2" />
```

Favicons are cached pretty hard by most browsers. This can be an annoyance. Fortunately, there's a meta tag you can put in your `<head>` to specify the location of the favicon. Force the browser to grab a new one by appending `?` + any string to the url of the favicon.
