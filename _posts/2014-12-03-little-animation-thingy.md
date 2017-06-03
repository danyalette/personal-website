---
id: 659
title: Little Animation Thingy
date: 2014-12-03T18:10:55+00:00
author: danya
layout: post
categories:
  - neither hither nor thither
---

<iframe src='/assets/iframes/anim.html' height='450' width='500' frameBorder='0'></iframe>

I&#8217;m working on an animation library which specializes in animating between paths whose commands are different in number and type. Essentially, from a given set of paths, all paths&#8217; commands are converted to cubic Bézier and then the paths with fewer subpaths or fewer commands are padded (with &#8217;empty&#8217; paths or commands e.g. `m0 0c0 0 0 0 0 0`).

The interesting part is the way in which the padding is interleaved with the preexisting commands. I&#8217;d like to eventually include several parameters to create fine grained control over the style of interleaving. I also think that adding some &#8220;noise&#8221; or an arc trajectory to the motion of the control points would produce an interesting result. We&#8217;ll see!
