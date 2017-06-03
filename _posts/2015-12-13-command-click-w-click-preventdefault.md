---
id: 886
title: Command-Click Prevent Default
date: 2015-12-13T05:02:06+00:00
author: danya
layout: post
categories:
  - javascript
---
I often command-click links in order to open them in a new tab. I find it very irritating when a site&#8217;s JS usurps that functionality.

It turns out that click events have a boolean attribute &#8211; `event.metaKey` &#8211; that is `true` on command-click. So, you can `event.preventDefault()` your heart out and still easily retain the expected command-click behaviour.

```javascript
$(".something").click(function(event){
    if (!event.metaKey) {
        event.preventDefault();
        // etc
    } else {
        //other stuff
    }
})
```
