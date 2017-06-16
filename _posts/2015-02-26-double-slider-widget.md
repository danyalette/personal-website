---
id: 771
title: Double Slider Widget
date: 2015-02-26T01:04:25+00:00
author: danya
layout: post
categories:
  - 'css'
  - javascript
---

<iframe src="/assets/iframes/double-slider.html" frameborder="0" height="110" width="500"></iframe>

<!--more-->

#### 1 &#8211; include these files:

```html
<script src='double-slider/utils.js'></script>
<script src='double-slider/script.js'></script>
<link href='double-slider/style.css' rel='stylesheet' />
```
[Here&#8217;s](/assets/iframes/double-slider.zip) a zip.

#### 2 &#8211; initialize your slider:

```javascript
//grab your element and create a callback function
        var element = document.getElementByClassName("double-slider")[0];
        function callback(values){
             var min = values.min;
             var max = values.max;
             console.log("min: " + min + ", max: " + max);
        }

        //create the double-slider
	slider = new DoubleSlider(element, callback);
```

#### 3 &#8211; set values

```javascript
slider.moveTo(0.3,0.7);
```

#### 4 &#8211; get values

```javascript
var max = slider.getMax();
var min = slider.getMin();

//or grab the values using the callback function
//which is executed whenever slider values change
```
