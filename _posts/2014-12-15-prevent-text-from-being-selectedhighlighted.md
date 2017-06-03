---
id: 670
title: Prevent Text Selection
date: 2014-12-15T22:36:09+00:00
author: danya
layout: post
categories:
  - 'html &amp; css'
---
utility class:
```css
.noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
```
scss mixin:
```scss
@mixin noselect() {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.item { @include noselect(); }
```

<small>from <a href='http://stackoverflow.com/questions/826782/css-rule-to-disable-text-selection-highlighting'>SO</a></small>
