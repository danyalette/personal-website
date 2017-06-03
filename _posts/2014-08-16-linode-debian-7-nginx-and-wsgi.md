---
id: 145
title: linode, debian 7, nginx, and wsgi!
date: 2014-08-16T17:28:45+00:00
author: danya
layout: post
published: false
categories:
  - linux, etc
---
for production i use a well-managed shared host running apache on centOS.

i wanted a fun challenge so i decided to spin up something completely different, to configure and manage myself. so&#8230;

<!--more-->

### i ended up with

debian 7 on a VPS (via [linode](http://linode.com)), with uwsgi (an implementation of the wsgi spec) in a virtualenv, using nginx as a reverse-proxy (whose address is the socket on which the wsgi application is being served, from inside the virtualenv). \*whew\*

[this guide](https://www.digitalocean.com/community/tutorials/how-to-deploy-python-wsgi-applications-using-uwsgi-web-server-with-nginx) and [this guide](https://www.digitalocean.com/community/tutorials/how-to-configure-the-nginx-web-server-on-a-virtual-private-server) were super helpful.
