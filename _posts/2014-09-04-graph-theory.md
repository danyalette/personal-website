---
id: 297
title: Graph Theory
date: 2014-09-04T00:45:12+00:00
author: danya
layout: post
categories:
  - animation
  - javascript
  - math
  - svg
---
<div>&nbsp;</div>
<iframe src='/assets/iframes/graph.html' width='400' scale='0.5' height='200' style='text-align:center;margin:auto;overflow:hidden' frameBorder='0'></iframe>
<div>&nbsp;</div>
I&#8217;m currently reading a book on graph theory.

A graph, in the mathematical sense, is a completely abstract object made up of sets. However, it definitely lends itself to visual representation, so I'm having a bit of fun making visualizations of some of the concepts.

<!--more-->

## Math Lite

A graph (an abstract object &#8211; not to be confused with a representation of a graph!) is made up of two sets:

```javascript
vertices = {v1, v2 ...}
edges = {e1,e2,..}
```

However, the edge set may be empty.
Each edge is incident to exactly two vertices.

Any two graphs are isomorphic if their vertex sets have a one-to-one relationship that _preserves vertex adjacency_. In other words, they may be represented differently but in the abstract they are the same.

## The Animation

I made the above animation to demonstrate that some very different looking graphs are in fact equal &#8211; you can see that no connections are ever forged or broken. Graph theory aside, it's also interesting that some of the transitions I've animated appear to be taking place in 3 dimensions. I think this is especially true of transitions that cause edges to briefly take on dramatic angles, such as
<img src="/assets/images/uploads/2017/06/graph-angle.png" style="max-width:200px;"/>

### SVG

The graph is created using `svg`, with one `path` element and five `circle` elements &#8211; one circle for each vertex. The segments of the path are all cubic bézier curves, à la `M0 100C55.2 100 100 55.2 100 0`, which I animated using javascript's `requestAnimationFrame`.



### Javascript

I animate the graph by calling the following:

```javascript
animate({start: shape1, end: shape2, total_frames:100});
```

where `total_frames` is the number of frames I would like that animation to last, and `shape1/shape2` are arrays of coordinates, of the form `shape1 = [[67, 43], [64, -55],....]` etc.

Here&#8217;s the meat of that function:

```javascript
function animate(object){
	//`start` and `end` are both arrays of coordinates
	var start = object.start;
	var end = object.end;
	var total_frames = object.total_frames;

	var delta = determineDelta(start, end, total_frames);
	startAnimationLoop(start, delta, total_frames);

}
```

which calls

```javascript
function startAnimationLoop(start, delta, max_count){
	var currentPosition = start;
	var count = 0;
	function loop(){
		draw(currentPosition);
		setVertices(currentPosition);
		currentPosition = getNextPosition(currentPosition, delta);
		frame = requestAnimationFrame(loop);
		if(count > max_count) cancelAnimationFrame(frame);
		count++;
	}
	requestAnimationFrame(loop);
}
```

and

```javascript
function determineDelta(start, end, total_frames){
	var deltas = [];
	for(i=0; i < start.length; i++){
		deltas[i] = [];
		deltas[i][0] = -(start[i][0] - end[i][0])/total_frames;
		deltas[i][1] = -(start[i][1] - end[i][1])/total_frames;
	}
	return deltas;
}
```

which is simply determining which value to add to each point at each frame.
The resultant value is the total change in position of each point (from start to end) divided by number of frames I want the animation to last. The function returns an array of values &#8211; one `delta[i] = [deltaX, deltaY]` for each point of the graph (including control points for cubic bézier curves).

The rest isn&#8217;t too interesting. The function `draw(array)` simply turns the coordinates array into proper svg path syntax and then sets the &#8220;d&#8221; attribute of a path element; `getNextPosition(array,delta)` increments the values of the coordinates by the amount determined for each point in `determineDelta(start, end, total_frames)`.

## That Circle

If you're curious about how a perfect-seeming circle was represented using cubic bézier curves, check out [this post](/blog/circle-w-cubic-bezier).
