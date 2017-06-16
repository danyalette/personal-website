---
id: 1084
title: ThreeJS Terraforming Tool
date: 2017-03-16T18:23:51+00:00
author: danya
layout: post
categories:
  - threejs 
---
So, somewhat accidentally, I made a terraforming tool in threejs! Check it out:
<!--more-->
Basically, when you mouse over, a raycaster is set from the camera position and the mouse position. The raycaster returns the face of the plane that it has intersected. The position of each vertex of the face is incremented by 0.5 on the z axis. Then, the plane geometry is updated (as are the face normals and vertex normals, in order to maintain the smooth appearance).
<script async src="//jsfiddle.net/danyalette/xpynzxpo/13/embed/result,js,css/"></script
</p>
