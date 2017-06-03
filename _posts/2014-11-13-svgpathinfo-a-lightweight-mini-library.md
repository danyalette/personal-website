---
id: 599
title: 'SVGPathInfo.js'
date: 2014-11-13T21:25:21+00:00
author: danya
layout: post
categories:
  - javascript
  - svg
---

<iframe src="/assets/iframes/SVGPathInfo-demo.html" height="380" width="400" frameborder="0"></iframe>

I made a little Javascript library to quickly get info on an SVG path element. Check it out:

 <a href='https://github.com/danyalette/SVGPathInfo' target='_blank'>github</a> | <a href='https://danyalette.com/SVGPathInfo' target='_blank'>website</a>.

<!--more-->

## How To

The available methods are `getJSON()`, `getCommands()`, `getCommandsArray()`, `getSubPaths(deep)`, `getRelativePath()`, `getAbsolutePath()` and `getGlobalCubicBezier()`.

Once you&#8217;ve included the script in your page, here&#8217;s how you start using them:

### Begin

First, create a new `SVGPathInfo` object.

You can pass it a handle to a path element:

```javascript
var path_elem = document.getElementById('mypath');
var info1 = new SVGPathInfo(path_elem);
```

_Or_ you can pass it a path string:

```javascript
var path_string = "M0 0 L0 50L50 50M0 200L200 0";
var info2 = new SVGPathInfo(path_string);
```

Now you have access to a bunch of SVGPathInfo&#8217;s methods:

### getJSON()

```javascript
var path_json = info2.getJSON();
```

will output

```javascript
{  
   "0":{  
      "type":"M",
      "string":"M0 0",
      "x":"0",
      "y":"0"
   },
   "1":{  
      "type":"L",
      "string":"L0 50",
      "x":"0",
      "y":"50"
   },
   "2":{  
      "type":"L",
      "string":"L50 50",
      "x":"50",
      "y":"50"
   }
   "3":{  
      "type":"M",
      "string":"M0 200",
      "x":"0",
      "y":"200"
   },
   "4":{  
      "type":"L",
      "string":"L200 0",
      "x":"200",
      "y":"0"
   }
}
```

### getCommands()

```javascript
var path_commands = info2.getCommands();
```

This will return the object that is described by the above JSON string.

### getCommandsArray()

```javascript
var path_commands = info2.getCommandsArray();
```

This returns an array of command _strings_, rather than an object of command _objects_:

```javascript
["M0 0", "L0 50", "L50 50", "M0 200", "L200 0"]
```

### getSubPaths(deep)

```javascript
var subpaths = info2.getSubPaths(true);
//OR
var subpaths = info2.getSubPaths(); //default: false
```

This breaks down the path into subpaths, breaking wherever a moveto (`M`/`m`) command occurs.

The argument `deep` is by default `false`. If `deep` is `false`, it returns an array of subpath strings:

```javascript
["M0 0L0 50L50 50", "M0 200L200 0"]
```

If `deep` is `true`, it returns an array of subpath arrays:

```javascript
[["M0 0","L0 50","L50 50"], ["M0 200","L200 0"]]
```

### getAbsolutePath()

```javascript
var abs_path = info2.getAbsolutePath();
```

Wherever the lowercase form of a command is used, the coordinates that follow the command are _relative_ &#8211; their location is specified relative to location of the pen, and not specified absolutely i.e. relative _to the point of origin_ of the svg element (the top left corner).

This function converts the path to the absolute form and returns a string. (Note: my example path is already absolute.)

### getRelativePath()

```javascript
var rel_path = info2.getRelativePath();
```

This does the opposite of getAbsolutePath() &#8211; all absolute commands are modified so as to be specified in relation to the location of the pen.

```javascript
"m0 0 l0 50 l50 0 m-50 150 l200 -200"
```

### getGlobalCubicBezier()

```javascript
var gcb_path = info2.getGlobalCubicBezier();
```

This function converts each command to a cubic Bézier and returns a string.

```javascript
"M0 0C0 0 0 50 0 50C0 50 50 50 50 50M0 200C0 200 200 0 200 0"
```

### Notes:

#### Accuracy

There is approximation involved, as is the nature of dealing with Bézier curves, and of course Javascript does famously imprecise maths. However, the result is quite good:

<iframe src="/assets/iframes/SVGPathInfo-demo2.html" height="450" width="470" frameborder="0"></iframe>

This svg image is the result of generating path strings using SVGPathInfo&#8217;s various functions, and assigning the resultant strings to the &#8220;d&#8221; attribute of path elements. I made the stroke-width of the paths decrease progressively so that all the paths can be seen at once. Here is the JS:

```javascript
var info = new SVGPathInfo(path1);
document.getElementById('path2').setAttribute("d", info.getRelativePath());
document.getElementById('path3').setAttribute("d", info.getAbsolutePath());
document.getElementById('path4').setAttribute("d", info.getGlobalCubicBezier());
```

where

- `path1` has the original path (orange with `stroke-width='30'`)
- `path2` has the relative path (grey with `stroke-width='18'`)
- `path3` has the absolute path (pink with `stroke-width='10'`)   
- `path4` has the cubic Bézier path (yellow with `stroke-width='3'`)

#### Validitity

This library does not check the path&#8217;s validity. It will likely throw an error or behave unexpectedly if it is provided with an invalid path.

#### To Do

I have not yet implemented a conversion from the arc command (`A`,`a`) to cubic Bézier.
