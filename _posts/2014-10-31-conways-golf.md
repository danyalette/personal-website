---
id: 459
title: 'Conway&#8217;s GOLf'
date: 2014-10-31T17:41:39+00:00
author: danya
layout: post
categories:
  - animation
  - 'html &amp; css'
  - javascript
---
In my free time, I&#8217;m making a game based on [conway&#8217;s game of life](http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life). Here&#8217;s the result of my work so far. Obviously, it&#8217;s not a game yet, but it is a functional cellular automaton written in javascript.

Click on a cell to flip its state, or drag to paint on living cells.

<iframe src="/assets/iframes/conways-GOLf.html" width="390" height="430" frameBorder="0"></iframe>
<div>&nbsp;</div>
In this example, the starting state of living cells is called a &#8220;pulsar&#8221; &#8211; an example of a cyclic form with a period of 3. In other words, if you step 3 times it will return to the original state.  
Click on the cells to turn them on or off &#8211; maybe you can find other stable or cyclic forms.

<!--more-->

### What

Conway&#8217;s game of life is not really a game; rather, it&#8217;s a [cellular automaton](http://en.wikipedia.org/wiki/Cellular_automaton). Well&#8230;according to wikipedia, it _is_ a game&#8230;but it&#8217;s a [zero-player game](http://en.wikipedia.org/wiki/Zero-player_game).

A cellular automaton is a grid of &#8216;cells&#8217; that have states: on or off; alive or dead. Under certain conditions, cells that are alive will die and cells that are dead will come alive.

The ruleset used specifically in conway&#8217;s game of life has it that living cells with more than 3 neighbours and fewer than 2 neighbours will die; dead cells with exactly 3 neighbours will come alive. If you need a mnemonic: a cell can die of overpopulation&#8230;and of loneliness.

### Why bother

It&#8217;s no coincidence that this field&#8217;s terminology alludes to organic life. Cellular automata are a computational phenomenon &#8211; viz. cells have addresses and states, logical operations determine future states, etc &#8211; but they are oft-cited in philosophy of biology as a window into understanding the emergent properties of a group of individual organisms or cells. The patterns that arise in cellular automata are often surprising and appear to have semantic content or intentions. Similarly, the achievements of a colony of ants appear to be inexplicable in light of the very simple rules that guide the behaviour of individual ants.

Evolution itself has (/is) a simple set of rules that act on individuals. The astonishing outcome is the result of a ruleset iterated many times over.

### Learn More

  * [Emergence](http://en.wikipedia.org/wiki/Emergence) on wikipedia.
  * There is a [radiolab](http://www.radiolab.org/story/91500-emergence/) on the topic.
  * This is related to the mathematical concept of [iteration](http://en.wikipedia.org/wiki/Iteration). This might lead you down the path to fractals. [Here&#8217;s](http://www.cs.cmu.edu/~tcortina/15110sp12/Unit09PtC.pdf) an excellent explanation of the relationship between cellular automata and fractals (from a Carnegie Mellon computer science class).
  * Regarding evolution and thought as emergent phenomena: an old professor of mine, Ronald de Sousa, wrote [a book](http://www.amazon.ca/Why-Think-Evolution-Rational-Mind/dp/019518985X) on the topic.
