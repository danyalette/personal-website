---
id: 429
title: SCSS Mixin For @font-face
date: 2014-09-17T19:28:28+00:00
author: danya
layout: post
categories:
  - 'html &amp; css'
---

## define it

```scss
@mixin font-face($fontname){
  $filepath: "fonts/" + $fontname + "/" + $fontname;
  @font-face {
    font-family: $fontname;
    src: url($filepath + ".eot");
    src: url($filepath + ".eot?#iefix") format('embedded-opentype'), url($filepath + ".woff") format('woff'), url($filepath + ".ttf") format('truetype'), url($filepath + ".svg#" + $fontname + "") format('svg');
  }
}
```

## use it

```scss
$font1: helvetica;
@include font-face($font1);
p{ font-family: $font1; };
```
