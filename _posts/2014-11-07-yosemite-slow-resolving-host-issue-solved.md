---
id: 487
title: 'yosemite slow "resolving host" issue - solved!'
date: 2014-11-07T22:17:55+00:00
author: danya
published: false
layout: post
categories:
  - mac
---
<div>
  &nbsp;
</div>

in my case, the issue had to do with the name of my vhost. so,

### short answer

if your vhost&#8217;s ServerName ends with `.local`, change it something else.

`.local` is handed off to Bonjour (using DNS-SD using mDNS), though it will fallback to normal DNS. thus, it will eventually resolve correctly.

if that&#8217;s not the problem, <!--more-->

### also try

<pre>$ sudo discoveryutil udnsflushcaches
</pre>

(because, apparently, `$ dscacheutil -flushcache` no longer works in 10.10) and

<pre>$ sudo launchctl unload -w /System/Library/LaunchDaemons/com.apple.discoveryd.plist
$ sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.discoveryd.plist
</pre>

### still nothing?

well, note that

  * your browser may have its own DNS cache
  * in a previous OS, i fixed a similar issue by combining localhost entries in `/etc/hosts` e.g. by turning
    <pre>127.0.0.1 localhost
127.0.0.1 my.vhost.name
</pre>

    into

    <pre>127.0.0.1 localhost my.vhost.name
</pre>

    so that might do the trick. </li>

    ### why

    this problem is only occurring now because, in 10.10, discoveryd has replaced mDNSResponder. And, according to  [one person](https://discussions.apple.com/thread/6611817), &#8220;Yosemite&#8217;s implementation of Bonjour sticks much more strictly to RFC 6762, and so it assumes anything that uses .local explicitly should be resolved using mDNS, rather than traditional unicast-DNS.&#8221;
