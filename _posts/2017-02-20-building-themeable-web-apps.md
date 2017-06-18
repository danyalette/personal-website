---
id: 921
title: Building Themeable Web Apps
date: 2017-02-20T16:35:46+00:00
author: danya
layout: post
image: /assets/images/featured/the-cube-of-themeability-wide.png
categories:
  - rambling
---
I recently worked on an app that was intended to be themeable &#8211; a &#8220;white label&#8221; app that had a default look and default behaviour which were expected to be selectively overridden on a client-by-client basis. I definitely did not grasp the scope of this requirement before diving in. So, I figured I would share some of my experiences in case they can save anyone else some time.

<!--more-->

### Flexibility vs. Predictability

Looking back, the biggest issues we had revolved around striking a balance between flexibility and predictability. To illustrate how theming can be closer to one extreme or the other, consider the following options for stylesheet customization:

  1. The client can _overwrite_ the default stylesheets
  2. The client can _override_ the default styles (using css rule order and selector specificity), by including additional stylesheets after the default ones
  3. The client can only set the values of certain parameters that have been predetermined, such as button colours

In the first case, the app is extremely flexible but extremely unpredictable. This will make it impossible for you, the devs, to test all scenarios, and to write other parts of the app (such as the markup) in such a way that the app will reliably produce the intended result.

However, the last case isn&#8217;t ideal either &#8211; this can only work if there is consensus (between the clients, product managers, the dev team, etc) on what the outline of your product looks like, in all its possible forms. This can also create a lot overhead: every time someone wants a new option, you have to create a new parameter and hook it into your existing app &#8230;and then be able to potentially deploy the updated app to other clients who may or may not care to set the value of the new parameter&#8230;and then you have to update documentation, and so on.

I have no intention of advising you to favour of one strategy or another; the right choice obviously depends on the circumstances. In our case, when it came to stylesheets (written in scss), we used a combination strategy:

  * Theme files were included by default (i.e. the default stylesheets had, e.g. `include('theme.scss')`) and the theme files existed as empty files in the default build.
  * Clients could include their own theme files to _overwrite_ the existing (empty) theme files.
  * Some of those theme files were explicitly intended for scss variables. In other words, scss variables that had been set in the default scss stylesheets could be overridden in the (default empty) theme variables files.

You might have noticed that our method includes parts of all three options enumerated above: files can be _overwritten_ (though, in this case, not important ones!); those theme files can _override_ existing styles (using css rule order and selector specificity). And, in addition, certain parameters have been earmarked for client customization by the fact that some css properties have been set using scss variables rather than directly having been assigned a value. The message being: you don&#8217;t have to choose between flexibility and predictability, but you will definitely have to consider where you want to land, in the gradient between the two. This will likely involve having to define, with the participation of the app&#8217;s other stakeholders, a clear idea of what your app should and should not _be able to become_ as a result of theming.

When it came to stylesheets, this method worked well for us but it wasn&#8217;t our master plan &#8211; we grew into it organically as our product requirements evolved. However, in addition to stylesheets, we also had to contend with themeable layouts, data, and basic functionality, all of which were also constantly also negotiating that balance between flexibility and predictability.

### Implementation

A downside of the organic evolution of our strategy was that it was quite varied. Ok, it was basically strategy soup. In some cases, customizations were set in a configuration file that was bundled into the client build of the app. In other cases, they were set in a configuration file that was fetched remotely by the app at runtime.  Some configurations were directly written into app files at build-time using search-and-replace. In other cases, customizations were additional files that sometimes overwrote and sometimes overrode existing default files (as was the case in the stylesheets example above).

Taken individually, each strategy was justified. For instance, if a client wanted to be able to make changes to certain aspects of the app without redeploying a build, then it seems obvious that we needed a configuration file stored remotely that could be changed at will, and that the app would fetch at runtime. However, other configurations needed to be set at build time. In our case, since it was a Cordova hybrid mobile app, the title of the app and its icon, for instance, needed to be set at build time.

But it is easy to see how this variety might hamper development. Developers working on the app were unclear on which method to use when building out new customizable features; this slowed down development and made our codebase messier and more difficult to maintain. The biggest issue, however, is only evident to me in retrospect: as our theming strategy became increasingly complex, so did our build process. At a certain point, our build process was responsible for (in addition to the usual suspects): copying all files from directory _a_ into _b_, without overwriting; copying all files from directory _c_ to directory _d_, _with_ overwriting; emptying this dir; duplicating file _q_, but appending a string from file _z_ to the name of file _q_; generating a json file from an xml file; replacing string _x_ in all files in directory _e_ with string _y&#8230;_which was itself the string returned from a shell command&#8230;and the list goes on. Just writing this out, I&#8217;m sweating.

Perhaps unsurprisingly, our build process was extremely unreliable because there were several race conditions. Many of the tasks were asynchronous (sometimes unintentionally so!), and had dependencies on other tasks. (For example, imagine that string _x _is to be read from file _z_, but file _z_ is in directory _c_, which is to be emptied after it has been copied into directory _d_ . The success of the reading task depends on the amount of time it takes to complete the copying task.) Because the build process was built up incrementally, some of the dependencies were exceedingly subtle; I actually even found some circular dependencies!

Anyways, if this story does have a moral, I think it is this:

It might be tempting to approach theming issues one-by-one, and implement solutions as they befit the problem. It makes complete sense to set up theming to work differently for stylesheets than it works for copy, or markup files. However, themeability isn&#8217;t just an abstract problem &#8211; it needs to be implemented. Every time you opt to overwrite a default file with a custom one, you are adding one more thing to your build process&#8217;s plate. And every time you opt to use regex to replace a string in a default file with a string from another default file, or from a shell command&#8230;well, actually, please just don&#8217;t do that. Seriously. What are you thinking.

### The Cube

One of my big projects, during my time working on this app, was an overhaul of the build process. The first thing I did was take a survey of all the things the build process had to accomplish, many of which were directly related to themeability. I found it helpful to categorize the various theming strategies along 3 axes: **build-time** or **runtime;** **overriding** or **overwriting_;_** **optional** or **required**.

<img class="wp-image-1037 size-medium aligncenter" src="/assets/images/uploads/2017/02/the-cube-of-themeability-285x300.jpg" alt="the-cube-of-themeability" width="285" height="300" />

Basically, we ran the gamut: we had required built-time overwrites, optional runtime overrides, and everything in between. There are eight &#8220;quadrants&#8221; (octants?)  in that diagram, and you can expect that each of them will have different implications for the structure of your build process, your development workflow, your testing strategy, your deployment strategy, and so on. However, they also each have the potential to solve for different problems.

##### Build-time/runtime

A build-time configuration is one that is &#8220;baked into&#8221; the app when it is bundled for deployment. A runtime configuration, however, is one that is queried by the app during its operation. Choosing between the two &#8211; in my opinion &#8211; really depends upon use-case. In the first case, you might imagine your build process replacing the file `images/logo.jpg` with the file, if any, that is found at `theme/images/logo.png`. In the second case, however, you might imagine doing something like:

<pre>var logoImageFile = configurations.getParam('logo_image_file') || 'images/logo.png';</pre>

Runtime configurations are somewhat more flexible, and can be changed at arbitrary times (i.e. not just at build time), although they can also, in some cases, incur a performance penalty.

##### Overwriting/overriding

When it comes to choosing between overriding and overwriting, I am a strong proponent of going with overriding in all cases where that is an option. Allowing clients to overwrite default files is a liability. In addition &#8211; and I can&#8217;t stress this enough &#8211; it can also create _mountains of work_ and sneaky regressions in cases where the default files (those that are slated to be overwritten by theme files) have been themselves been updated in subsequent iterations. The theme files &#8211; the ones that are intended to overwrite the defaults &#8211; would likely all need to be updated at the same time as the defaults. However, there _are_ cases where overwriting is a requirement; we encountered many such cases in using Cordova.

##### Optional/required

I feel similarly about the choice between optional and required. Required customizations (e.g. a required theme file, or a required value in a configuration file) introduce unnecessary liabilities. Setting robust defaults should negate the need for required customizations, and thus reduce the probability of making buggy builds.

&nbsp;

In any case, I strongly recommend choosing one quadrant and focussing as much of your theming strategy there &#8211; doing so will likely eliminate a lot of the excessive complexity that we struggled to rein in. If I have to choose one: I believe that runtime optional overrides are the least likely to cause problems down the line.

### Conclusion

  * there are more ways to implement theming than you think!
  * you may end up using all of them
  * but try not to
