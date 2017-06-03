---
id: 94
title: 'Texturized Text'
date: 2014-07-25T17:43:10+00:00
author: danya
layout: post
categories:
  - 'html &amp; css'
---
<div>&nbsp;</div>
<iframe src="/assets/iframes/cliptext.html" height="160" width="650" frameborder="0"></iframe>
```css
.class {
 color: red;
 -webkit-text-fill-color: transparent;
 background: -webkit-linear-gradient(transparent, transparent),
             url(path/to/bg/image) repeat;
 background: -o-linear-gradient(transparent, transparent);
 -webkit-background-clip: text;
}
```

<!--more-->

# ~textual feelings~

`background-clip:text` is a handy CSS property but is only currently supported by webkit; when it falls through the results are pretty disastrous i.e. you will not see any text, only an image. This is because the text colour must be set to `transparent` in order for the newly text-clipped background to be visible through the text.

Luckily, [this person](http://nimbupani.com/using-background-clip-for-text-with-css-fallback.html) figured out how to use `background-clip:text` while retaining a usable fallback.
