---
id: 56
title: Fool-Proof @font-face
date: 2014-07-17T18:17:46+00:00
author: danya
layout: post
published: false
categories:
  - 'html &amp; css'
---

I found this snippet essential:

```css
@font-face {
		font-family: 'fontname';
		src: url('fonts/fontname.eot'); /* IE9 Compat Modes */
		src: url('fonts/fontname.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
		     url('fonts/fontname.woff') format('woff'), /* Modern Browsers */
		     url('fonts/fontname.ttf')  format('truetype'), /* Safari, Android, iOS */
		     url('fonts/fontname.svg#svgFontName') format('svg'); /* Legacy iOS */
		}
```


<!--more-->

[These guys](http://css-tricks.com/snippets/css/using-font-face/) have figured it out.

IE-6 ONLY

```css
* html #div {
    height: 300px;
}
```


IE-7 ONLY

```css
*+html #div {
    height: 300px;
}
```


IE-8 ONLY

```css
#div {
  height: 300px\0/;
}
```


IE-7 & IE-8

```css
#div {
  height: 300px\9;
}
```


NON IE-7 ONLY:

```css
#div {
   _height: 300px;
}
```


Hide from IE 6 and LOWER:

```css
#div {
   height/**/: 300px;
}
html > body #div {
      height: 300px;
}
```
