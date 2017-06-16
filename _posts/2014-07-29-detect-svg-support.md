---
id: 108
title: Detect SVG Support
date: 2014-07-29T04:26:25+00:00
author: danya
layout: post
published: false
categories:
  - javascript
  - svg
---
<pre>function supportsSVG() {
    return !!document.createElementNS &#038;&#038; !!document.createElementNS('http://www.w3.org/2000/svg', "svg").createSVGRect;
  }
</pre>

from [these guys](http://modernizr.com/)
