---
id: 727
title: Transition-Timing-Function
date: 2015-01-10T19:42:37+00:00
author: danya
layout: post
categories:
  - animation
  - 'html &amp; css'
---
So, obviously

```css
transition: all 1s ease;
```

and

```css
transition: all 1s linear;
```

but did you know

```css
transition: all 1s cubic-bezier(0.42,0,0.58,1);
```

???

<!--more-->

The property `transition-timing-function` (used to determine the rate of change of the transitioned attribute, as a function of time) can take the following values:

```
ease
linear
ease-in
ease-out
ease-in-out
cubic-bezier(n,n,n,n)
initial
inherit
```

where

```
linear       is   cubic-bezier(0,0,1,1);
ease         is   cubic-bezier(0.25,0.1,0.25,1);
ease-in      is   cubic-bezier(0.42,0,1,1);
ease-out     is   cubic-bezier(0,0,0.58,1);
ease-in-out  is   cubic-bezier(0.42,0,0.58,1);
```

Try using the value

```css
transition-timing-function: cubic-bezier(0,0.6,1,0);
```

That one should be called&#8230;static-friction.
