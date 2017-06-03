---
id: 51
title: "JS's HTMLCollection is a Pseudo-Array"
date: 2014-07-12T16:54:10+00:00
author: danya
layout: post
categories:
  - javascript
---

```javascript
var realArray = Array.prototype.slice.call(document.getElementsByClassName('classname'), 0);
```

<!--more-->

Or, if you want to get cute about it (which i always do)

```javascript
var realArray = [].slice.call(document.getElementsByClassName('classname'), 0);
```

The class selectors for javascript&#8217;s dom api &#8211; getElementsByClass and getElementsByClassName &#8211; don&#8217;t return arrays but rather pseudo-arrays called HTMLCollections. This came as a surprise to me after I started switching from using jquery to using pure js.

An HTMLCollection has some methods associated with it, and you can still grab a handler to your desired element via index, i.e. you can

```javascript
var myElement = document.getElementsByClassName('classname')[1];
```

but there are [lots of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) super handy array methods you might wanna access. i use &#8216;forEach&#8217; a fair bit so i always convert my HTMLCollections to a true array.

<small>note: IE pre-9 <a href='http://stackoverflow.com/questions/16813469/javascript-method-foreach-not-supported-from-internet-explorer'>doesn&#8217;t support</a> forEach. but you can manually add the method to the array constructor:</p>

```javascript
// from stackoverflow user Kishor Subedi:
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(fn, scope) {
        for(var i = 0, len = this.length; i &lt; len; ++i) {
            fn.call(scope, this[i], i, this);
        }
    }
}
```
