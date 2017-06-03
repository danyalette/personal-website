---
id: 380
title: Compile SCSS Automatically On Request w/ PHP
date: 2014-09-13T23:42:56+00:00
author: danya
layout: post
categories:
  - 'html &amp; css'
---
I just started playing with SCSS. It didn&#8217;t take very long to learn and, so far, I love it.

There are loads of way to compile your SCSS to CSS to serve to the client. One of the easiest ways to get up and running, if you're using php, is [scssphp](http://leafo.net/scssphp).
 The SCSS is compiled and returns plain CSS, every time a request is made by a client to your server for a page containing SCSS. (I don't recommend this in production though.)

<!--more-->

# Setup

## Start

Create a directory on your server to house your SCSS test project. Once you complete steps 1-6, your directory should be structured like this:

```
scss-test-directory/  
      style.php
      index.html
      scssphp/
          scss.inc.php
          ...
      stylesheets/
          main.scss
          ...
```

## Download

Grab and unarchive scssphp from [here](http://leafo.net/scssphp), and put it in your new directory.

## Create a file

Create a file and call it `style.php`. Add the following:

```php
<?php
$directory = "./stylesheets";
require "scssphp/scss.inc.php";
scss_server::serveFrom($directory);
?>
```

## Create Stylesheets Directory

Create a directory in your project directory and call it `stylesheets`.
Notice that this directory is referred to (by relative path) in the above php: `$directory = "./stylesheets";`

## Write Some SCSS

Write some SCSS in a new file and save the resultant file into the `stylesheets` directory.

## Make An Index Page

Make an index page and put whatever you'd like in there.

## Link To Your SCSS

Link to your SCSS by including the following line in the `index.html` you just created:

```html
<link rel='stylesheet' type='text/css' href='style.php/main.scss' />
```

in which

- `style.php` is the php file you created in step 3
- `main.scss` is the scss file you created in step 5 and
- `main.scss`'s parent directory is the directory configured in `style.php`, namely `./stylesheets`

## Check It Out

Navigate to your test project in a browser.

Note that you might need to change permissions in order for this work.
Long story short, `style.php` needs to be able to create &#8211; and then write in &#8211; `scss_cache`, a directory intended to serve as a cache (to save the script from having to recompile scss files that have not been modified since last compile).
