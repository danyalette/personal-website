---
id: 996
title: Pure Scss Slideshow
date: 2017-02-19T01:40:50+00:00
author: danya
layout: post
categories:
  - animation
  - 'html &amp; css'
---
The performance of this snippet is not great in chrome, but nonetheless&#8230;

Here you go!

 <a href="https://gist.github.com/danyalette/0c32184b9a86a31e061c785e114f2528" target="_blank">gist</a>|<a href="https://codepen.io/danyalette/pen/RKmXGQ" target="_blank">codepen</a>

<!--more-->

```scss
$images: "/images/fun.jpg", "/images/yay.jpg",  "/images/wow.jpg";
$slide_duration: 1s;

//preload images
body:before {
  $urls: url('');
  @each $image in $images {
    $urls: $urls + url(#{$image}) ;
  }
  display: none;
  content: $urls;
}

@keyframes slideshow {
  $current_percentage: 0;
  $increment: 100/length($images);
  @each $image in $images {
    #{$current_percentage}% { background-image: url($image); }
    $current_percentage: $current_percentage + $increment;
  }
}

.slideshow-image {
  animation-name: slideshow;
  animation-timing-function: step-end;
  animation-fill-mode: forwards;
  animation-duration: $slide_duration * length($images);
  animation-iteration-count: infinite;

  background-size: cover;
  background-position: center;
}
```
