---
id: 674
title: Bug in Vertical Alignment?
date: 2014-12-16T21:24:37+00:00
author: danya
layout: post
categories:
  - 'html &amp; css'
---
I was having trouble applying styles to inline-block elements such that they are rendered consistently across browsers (incl. the latest versions of Firefox, Chrome and Safari). It turns out that they have different default values for `vertical-align`.

To fix this issue, make sure you normalize this value, e.g.:

```css
vertical-align: bottom;
```
