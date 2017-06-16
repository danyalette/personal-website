---
id: 205
title: SSH Keys, Briefly
date: 2014-08-21T22:55:36+00:00
author: danya
layout: post
categories:
  - linux, etc
  - mac
---
Using ssh keys is super useful for speeding up the process of logging onto remote machines, doing file transfers between machines, or using git. Here is a brief guide to getting started.

<!--more-->
## Generate a key pair

On most mac or linux systems, key pairs live in the hidden directory  `~/.ssh`. Your public key is called  `id_rsa.pub` or  `id_dsa.pub`. Don&#8217;t have one yet? Start by generating a new key pair:

```bash
$ ssh-keygen -t rsa -C "you@example.com"
```

At the prompt, save the keys to the default location (indicated between parenthesis), which is probably something like:

```bash
/Users/yourusername/.ssh/id_rsa
```

Choose a good passphrase and don&#8217;t lose it.

## Add your key to ssh-agent

Check if you have ssh-agent running:
```bash
$ eval "$(ssh-agent -s)"
```
You should see something like
```
Agent pid 70248
```
If you do, then simply
```
$ ssh-add ~/.ssh/id_rsa
```

and type in your passphrase. This step saves you from having to reenter your passphrase in the future.

## Add your public key to the remote machine

When you attempt to SSH into a remote machine (or git pull from a remote git server, or what have you), the remote machine will make sure that you, on your local machine, are authorized to log on. In order to do so, the remote machine needs to know what your _public_ key is.

If you are using this key pair for github or bitbucket or something similar, you will need to log on to the site in a browser, and copy the content of your _public_ key (`~/.ssh/id_rsa.pub`) to the `ssh keys` section of your user profile.

However, If you are using this key to log into a machine that you administer, you'll need to manually add your public key to that machine's authorized key store, `~/.ssh/authorized_keys`. Log in to the remote machine the old fashioned way (using your username and password) and simply paste the plain text or you public key to the end of that file. Next time you log in, you will be able to omit your password.
