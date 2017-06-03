---
id: 506
title: SVG Arc Command Parameters
date: 2014-11-09T00:12:22+00:00
author: danya
excerpt: 'I made a few animations to explain the role of the parameters of the "arc" (<code>a</code>) command. '
layout: post
categories:
  - animation
  - svg
---
An SVG `<path>` element&#8217;s &#8220;arc&#8221; command (denoted `a` or `A`) has 7 parameters:

```html
<path d='a {rx} {ry} {x-axis-rotation} {large-arc-flag} {sweepflag} {x} {y}' />
```

That's quite a lot of params for one command, and the names of the params are not exactly enlightening. Here's the deal:

<!--more-->

# Background

### SVG Commands

There are a number of commands available for use in the `d` attribute of a `<path>` element, such as moveto (`m`) and lineto (`l`).

E.g.  `<path d='M100 100L200 200" />`.

This command moves the pen to coordinates `(100,100)` and then draws a line to coordinates `(200,200)`.

### Command Parameters

Each command has a number of parameters. For the most part, these specify coordinates. Each command has an origin and a destination coordinate (i.e. where you want the pen to begin drawing and where you want it to &#8220;end up&#8221;). The origin is always inferred and the destination is generally explicit.

E.g.`M100 100L200 200L300 300Z`

The first lineto command (`l200 200`) has an inferred origin of `(100,100)` and an explicit destination of `(200,200)`. the second lineto command (`l300 300`) has an inferred origin of `(200,200)` &#8211; where the pen ended up after the last command &#8211; and an explicit destination of `(300,300)`. The closepath command (`Z`) has an inferred origin (`(300,300)`)_and_ and inferred destination (`(100,100)`).

There are a number of other parameters used by other SVG commands. Each Bézier command (`t`, `q`, `s`, or `c`) has one or two control points, which are either inferred or explicit.

Though Bézier curves &#8211; the basis of Adobe Illustrator&#8217;s &#8220;pen tool&#8221; &#8211; are famously difficult to intuit, the &#8216;arc&#8217; command (`a`) is, to me, the most mysterious.

Its parameters are:

- `rx,ry`
- `x-axis-rotation`
- `large-arc-flag`
- `sweepflag`
- `x,y`

# The Arc Command

The effects of the arc&#8217;s parameters are not completely intuitive. Here a few animations to clarify:

## rx,ry

An arc is a portion of an ellipse. To understand the way an arc is drawn in SVG, you have to both understand _which ellipse_ is being drawn and _which portion_ of that ellipse is being selected.

Unless the `x-axis-rotation` is specified, the major and minor axes of the ellipse are strictly horizontal and vertical. Thus, `rx` is one half of the length of the horizontal axis and `ry` is one half of the length of the vertical axis of the ellipse.

**For the path `M 0 0 a {rx} {ry} 0 1 1 100 50`:**

<iframe src="/assets/iframes/arc_rx_ry.html" width="400" height="280" frameborder="0"></iframe>

Note that there are lower limits on the values of {rx} and {ry} in relation to the values of {x} and {y}. For instance, `M 0 0 a 10 10 0 1 1 100 50` looks the same as `M 0 0 a 50 50 0 1 1 100 50`. In addition, the curve appears to behave erratically when one of {rx} or {ry} is made very small:

**For the path `M 0 0 a {rx} {ry} 0 1 1 100 50`:**

<iframe src="/assets/iframes/arc_rx_ry_marginal.html" width="400" height="280" frameborder="0"></iframe>

## x-axis-rotation

Though the ellipse appears to be moving left/right and up/down, this is merely a side-effect of the actual function of this parameter. In fact, it simply rotates the ellipse&#8217;s horizontal axis (which, in this animation, is its _major_ axis) by {x-axis-rotation} degrees clockwise.

**For the path `M 0 0 a 180 80 {x-axis-rotation} 1 1 100 50`:**

<iframe src="/assets/iframes/arc_rotation.html" width="400" height="280" frameborder="0"></iframe>

## large-arc-flag & sweep-flag

So, now that it&#8217;s clear enough what _shape_ the ellipse is going to be, we have to determine:

1 &#8211; {sweepflag}: which of the two possible _points of origin_ the ellipse will have, and

2 &#8211; {large-arc-flag}: which of the two possible _halves_ of the resultant ellipse will be represented.

To demonstrate the 4 possible outcomes,

**For the path `M 0 0 a 180 80 0 {large-arc-flag} {sweepflag} 100 50`:**

<iframe src="/assets/iframes/arc_flags.html" width="400" height="280" frameborder="0"></iframe>

## and they all lived

happily ever after.
