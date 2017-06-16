---
id: 817
title: Delaunay Triangulation in JS
date: 2015-10-05T03:31:40+00:00
author: danya
layout: post
categories:
  - javascript
  - math
  - svg
---
<div>
  &nbsp;
</div>

My initial goal was to make a dynamically generated triangle pattern for a site, like so:

### <a href='https://danyalette.com/delaunay/basic.html'  target="_blank">The pattern.</a>

That site will generate a new pattern on each visit.

<a href='https://danyalette.com/delaunay/basic.html' target="_blank"><img style='width:100%' src="/assets/images/uploads/2015/10/Screen-Shot-2015-10-04-at-9.38.43-PM-1024x596.png" width="550" height="320" class="alignnone size-large wp-image-820" /></a>

Here you see a set of points, randomly generated, that has been triangulated. In other words, every generated point has become the vertex of a triangle and all triangles are non-overlapping.

### <a href='https://danyalette.com/delaunay'  target="_blank">The demo.</a>

<a href='https://danyalette.com/delaunay' target="_blank"><img class="alignnone size-large wp-image-818" style="width:100%" src="/assets/images/uploads/2015/10/Screen-Shot-2015-10-04-at-9.32.01-PM-1024x565.png" width="550" height="303" /></a>

In the demo, drag points to see the triangulation recalculate.

<!--more-->

This geometric solution to that problem is called Delaunay Triangulation.

Having made the pattern generator, I wanted to play around a bit more so I added support for dragging the points/vertices, recalculating the Delaunay Triangulation, and generating a fresh batch of points of a variable number.

If you dragged some points around in the demo and you found yourself wondering about the recalculations, you might be interested to know that, as per <a href="https://en.wikipedia.org/wiki/Delaunay_triangulation" target="_blank">wikipedia</a>, &#8220;Delaunay triangulations maximize the minimum angle of all the angles of the triangles in the triangulation; they tend to avoid skinny triangles.&#8221;

### Factoids:

1. The demo generates points that have a normal distribution, with a mean of width/2 and a std deviation of width/5, so that the generated points cluster around the center &#8211; I find that a bit more aesthetically pleasing.

2. I&#8217;m using <a href='http://raphaeljs.com/' target='_blank'>Raphael.js</a> to ease the SVG JS process.

3. I&#8217;m using the <a href='https://jakearchibald.com/2013/animated-line-drawing-svg/' target="_blank">stroke-dashoffset trick</a> for the initial line-drawing animation.

4. The calculation of the Delaunay Triangulation is accomplished by <a href='https://github.com/ironwallaby/delaunay' target='_blank'>this</a> Javascript port of <a href='http://paulbourke.net/papers/triangulate/' target='_blank'>this</a> C implementation.
