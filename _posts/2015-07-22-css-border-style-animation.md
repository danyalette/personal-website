---
id: 793
title: CSS Border-Style Animation
date: 2015-07-22T15:31:34+00:00
author: danya
layout: post
categories:
  - animation
  - 'html &amp; css'
---
You can&#8217;t use CSS to animate between a solid and a dotted border style, which makes sense because the change is non-numerical. But you _can_ use CSS to achieve the following effect:

<style>.demo{color:#333;font-size:20px;letter-spacing:2px;font-weight:bold;text-transform:uppercase;padding-top:20px}.dotted_anim{position:relative;cursor:pointer}@keyframes a_border_shrink {
    from {width: 100%;}
    to {width: 0%;}
}@keyframes a_border_grow{
    from {width: 0%;}
    to {width: 100%;}
}.dotted_anim:before{content:"";display:inline-block;position:absolute;left:0;width:100%;height:100%;border-bottom:1px solid #333;animation:a_border_shrink .3s linear 0s forwards}.dotted_anim:after{content:"";display:inline-block;position:absolute;right:0;width:0%;height:100%;border-bottom:1px dotted #333;animation:a_border_grow .3s linear 0s forwards}.dotted_anim:hover:after{animation:a_border_shrink .3s linear 0s forwards}.dotted_anim:hover:before{animation:a_border_grow .3s linear 0s forwards}.demo a{color:inherit;padding-bottom:5px}.demo a:hover{color:inherit;text-decoration:none}</style>
<div class="demo">
  <a class='dotted_anim'>Hover over me!</a>
</div>
<!--more-->

```scss
.dotted_anim{
  position:relative;
}
@keyframes a_border_shrink {
  from {width: 100%;}
  to {width: 0%;}
}
@keyframes a_border_grow{
  from {width: 0%;}
  to {width: 100%;}
}
.dotted_anim:before {
  content: "";
  display:inline-block;
  position:absolute;
  left:0;
  width:100%;
  height:100%;
  border-bottom: 1px solid #333;
  animation:a_border_shrink 0.3s linear 0s forwards;
}
.dotted_anim:after {
  content: "";
  display:inline-block;
  position:absolute;
  right:0;
  width:0%;
  height:100%;
  border-bottom: 1px dotted #333;
  animation:a_border_grow 0.3s linear 0s forwards;
}
.dotted_anim:hover:after{
  animation:a_border_shrink 0.3s linear 0s forwards;
}
.dotted_anim:hover:before{
  animation:a_border_grow 0.3s linear 0s forwards;
}
```

Just give your element the class `dotted_anim` or, to apply the style to all `<a>` tags, replace all instances of `.dotted_anim` in the above css with `a`.
