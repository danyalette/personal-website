---
id: 258
title: 'Git: Shortest Tutorial Ever'
date: 2014-08-29T19:35:03+00:00
author: danya
layout: post
published: false
categories:
  - neither hither nor thither
---
Once you&#8217;ve got a repository (e.g. on github) and know its URL,

### first you

<pre>$ mkdir ~/git-project
$cd ~/git-project
$git clone git@github.usrname/name-of-repository.git</pre>

### then you

add pre-existing files from your computer to the main repo:

<pre>$ cp -a /source/. ~/git-project #copies all files in /source into ~/git-project
$ git add *
$ git commit -m "added files"
$ git push
</pre>
