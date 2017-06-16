---
id: 767
title: 'CSS Hack: Fixed Width-To-Height Ratio'
date: 2015-02-13T19:06:32+00:00
author: danya
layout: post
categories:
  - 'css'
---
Somehow I only just heard about this hack. But now it seems so obvious!

Set a fixed width-to-height ratio on a css element by including a tiny img in that element and setting the image&#8217;s width to 100%.

If my image is 10 pixels wide and 5 pixels high, the element that contains it will also maintain that 2:1 ratio!
