---
id: 278
title: Circle w/ Cubic Bézier
date: 2014-09-03T18:14:57+00:00
author: danya
layout: post
categories:
  - math
  - svg
---

<iframe src="/assets/iframes/bezier-circle.html" height="150" width="170" frameBorder="0"></iframe>
<div>&nbsp;</div>

[This paper](http://spencermortensen.com/articles/bezier-circle/) demonstrates an extremely accurate approximation of a circle using cubic bezier curves.

It takes 4 curves, one for each 90° circle arc.
As you can see above, I've implemented that approximation. The black dots represent the start (`P_0`) and end (`P_3`) of each segment, and the red dots represent the control points (`P_1` & `P_2`).

<!--more-->

```javascript
c = 0.551915024494

// curve 1
P_0 = (0,1), P_1 = (c,1), P_2 = (1,c), P_3 = (1,0)
// curve 2
P_0 = (1,0), P_1 = (1,-c), P_2 = (c,-1), P_3 = (0,-1)
// curve 3
P_0 = (0,-1), P_1 = (-c,-1), P_3 = (-1,-c), P_4 = (-1,0)
// curve 4
P_0 = (-1,0), P_1 = (-1,c), P_2 = (-c,1), P_3 = (0,1)
```

For a circle with a radius of 100, those relationships result in the following SVG path:

```javascript
d ="M0 100C55.1915 100 100 55.1915 100 0C100 -55.1915 55.1915 -100 0 -100C-55.1915 -100 -100 -55.1915 -100 0C-100 55.1915 -55.1915 100 0 100"
```

Note that the resultant circle is centered around `[0,0]`. So, if you're planning on using this yourself, you&#8217;ll have to translate your path or modify your svg viewport in order to be able to see the segments that are in the negative quadrants. For instance, you might simply apply `transform="translate(100,100)` to your `<path>` elem.
