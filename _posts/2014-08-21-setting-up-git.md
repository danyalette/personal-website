---
id: 169
title: Setting Up Git
date: 2014-08-21T22:05:12+00:00
author: danya
layout: post
published: false 
categories:
  - linux, etc
---
I just set up git on my new VPS (debian 7).

The basic steps:<!--more-->

### install git.

<pre>$ sudo apt-get install git-core
$ git config --global user.name "myusername"
$ git config --global user.email me@example.com</pre>

### create a repository

<img src='https://iam.danyalette.com/images/github.jpg' style="float:right; margin:20px;height:400px;" />

in a location that you will have remote access to. i chose github, which provides you with a URL for each new repository. (you could obviously also create it on one of your own machines.)

### and connect to it.

once you have installed on your machine and you have created a repository somewhere:

create a directory, enter it, and initialize git.

<pre style='width:480px'>$ git init</pre>

then connect your new directory to your remote repository:

<pre style='width:480px' >$ git remote add origin git@github.usrname/name-of-repository.git</pre>

<small>note: instead of <code>origin</code> you can also give it a unique name to use as a shorthand later.</small>

### authenticate.

github uses PKI for authentication. in other words, you will need a private key on the machine that is attempting to access the repository, and the correlated public key must be added to &#8220;settings&#8221; on your github account.

### now, you can

push and pull to your heart&#8217;s content.
