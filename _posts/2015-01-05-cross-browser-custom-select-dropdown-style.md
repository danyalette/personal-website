---
id: 678
title: Cross-Browser Custom Dropdown
date: 2015-01-05T17:44:11+00:00
author: danya
layout: post
categories:
  - 'html &amp; css'
---
<div>&nbsp;</div>
<iframe height="60" width="350" src="/assets/iframes/dropdown.html" frameborder="0"></iframe>

I&#8217;ve read a number of recommendations for customizing the appearance of dropdowns.
This is the closest I&#8217;ve come to finding a cross-browser solution:

<!--more-->
<small>Note: In the following CSS I&#8217;ve prepended the relatively inessential features with <code>*</code></small>

```css
.select-div{
  *font-family:helvetica;
  height: 32px;
  overflow: hidden;
  background: url("dropdown-arrow.png") no-repeat right #E6E6D1;
  background-size:34px;
  *outline:none;
  *margin-bottom:5px;
  *width:300px;
  *cursor:pointer;
}
.select-div select{
  background: transparent;
  *outline:none;
  width:110%;
  *font-size: 16px;
  *padding:5px;
  *line-height: 1;
  *border: 0;
  *border-radius: 0;
  height: 32px;
  -webkit-appearance: none;
  -moz-appearance:none;
  text-overflow:'';
  text-indent:0.01px;
  *color:#fa814b;
}
.select-div select::-ms-expand {
  display: none;
}
```
