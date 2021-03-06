---
layout: post
title:  "Getting Started With Jekyll"
date:   2017-06-03 04:00:00 -0400
categories:
  - jekyll
---


When I decided to give Jekyll a shot, for my blog do-over, the first thing I did was take a look at the [quickstart](https://jekyllrb.com/docs/quickstart/) in their docs. It's a very straightforward setup but the process would have been much smoother for me if I had known a few things ahead of time.

<!--more-->
* TOC
{:toc}

## Ruby version management

Before starting on the installation, you should get set up using a Ruby version management tool.

If you are on a Mac, and you have recently tried to install gems, you may have noticed that you had issues with permissions; there's a good chance you ended up doing a `$ sudo gem install...`. Doing so is problematic for a few reasons. For one, this may result in you needing to use sudo every time you use one of those gems, which is cumbersome and dangerous. Also, installing gems in the version of Ruby that comes default with Mac OS can have unintended side-effects on other programs you use that depend on Ruby.

The two main tools that are conventionally used to do Ruby version management are `rbenv` and `rvm`. I chose to go with [`rbenv`](https://github.com/rbenv/rbenv#homebrew-on-mac-os-x).

### Setting up rbenv

```bash
$ brew install rbenv
$ rbenv init
```
After installing `rbenv`, you need to use `rbenv` to install at least one version of Ruby, and then tell `rbenv` which version of Ruby you want to work on at the moment.

```bash
$ rbenv install 2.4.1
$ rbenv local 2.4.1
```

## Installing Jekyll

Now that your Ruby install is all set, you are ready to go ahead and install Jekyll, as per the instructions in the offical docs' quickstart:

```bash
$ gem install jekyll bundler
$ jekyll new myblog
$ cd myblog
$ bundle exec jekyll serve
# Now browse to http://localhost:4000
```

That'll start a development server. In order to do a production build, do
```bash
$ jekyll build
```

Whenever Jekyll makes a build (either for development or for production), `_site/` gets emptied out and then repopulated with html and CSS files, and the resultant website is served out of that `_site/` directory. So, you'll never be directly editing files in that directory.

## Changing the Theme

### Selection

Check out [this](https://github.com/planetjekyll/awesome-jekyll-themes) list to pick one, and make note of your chosen theme's _gem name_.  
E.g. This theme is called Swiss but the gem is called `jekyll-swiss`:
```markdown
Swiss ★35 (gem: jekyll-swiss ...
```

### Installation

Installing the theme is a four-step process:
- Add the new theme to your `Gemfile`, which lists the project's dependencies:
```ruby
# Swiss theme
gem "jekyll-swiss"
```
- Use `bundler` to update your dependencies. This command install will install the new gem.
```bash
$ bundle install
```
- change the value of `theme: ` in `_config.yml`
```ruby
theme: jekyll-swiss
```
- Restart the development server to reload the new config and the updated dependencies:
```bash
$ bundle exec jekyll serve
```

### Configuration

Your chosen theme may have a few settings you can configure in `_config.yml`. You can determine what settings are available by reading that theme's documentation. For example, `jekyll-swiss` has several options for `theme_color`. So, I've added the following to `_config.xml`:
```ruby
theme_color: red
```
After editing your config, restart your development server.

### Customization

You can navigate to the root directory of the theme by doing, e.g.
```bash
$ open $(bundle show jekyll-swiss)
```
(You can use this method for any installed gems.)
Don't make changes directly to any file in the theme directory; rather, any file that you would like to alter should be copied into your project root at the same location. The file in the project will override the file in the theme.

For example, if you want to change the footer, copy the file `jekyll-swiss-0.4.0/_includes/footer.html` into `my-project/_includes/footer.html` and make your changes to the latter. If you are running the dev server, then you should be able simply refresh the page in the browser to see your changes take effect.

## SCSS Customization

Jekyll has built-in support for writing styles in SCSS. Any SCSS files that you add to your project, anywhere _other than_ in underscored directories (`_site`, `_posts`, `_includes`, ...), will be compiled to CSS and added to `_site` with the same name and directory hierarchy they had as SCSS files.

For example, these SCSS files
```
style.scss
assets/my-file.scss
testing/testeroo/test.scss
```
will, respectively, be compiled to these CSS files:
```
_site/style.css
_site/assets/my-file.css
_site/testing/testeroo/test.css
```

The same goes for the _theme's_ SCSS files. If you navigate to your current theme's root directory, you will notice that any SCSS in a non-underscored directory has been compiled to an equivalent CSS file, in your project's `_site/`.

### Write Your Own SCSS

CSS is included in Jekyll sites in the same way it is in any run-of-the-mill site: the html files have `<link>` tags, who's href attributes point to CSS files. In order to add a new stylesheet to your site, you need to do two things:
- Create a SCSS file.  
  For this, I recommend that you create an `assets/` directory in your project root. The files that you add to this directory will be compiled to CSS files in `_site/assets/`.
- Add a `<link>` tag.  
  For this step, you may need to delve into your theme a little bit. You will probably want to add the `<link>` tag to the `<head>`. Now for some digging: open your theme's directory (`$ open $(bundle show jekyll-swiss)`) and figure out which template includes a `<head>` tag. In my case, the template in question is in `jekyll-swiss-0.4.0/_includes/head.html`. Now, importantly, do not edit the file in the theme's directory. What we want to do is override this file _in our project_. So, assuming the file you want to override is in the theme's `_includes/`:
    - If your project root does not have an `_includes/` directory, create one.
    - Copy the file from the theme's `_includes/` to your project's `_includes/`
    - Edit the file in your project's `_includes/` to add the new `<link>` tag.

### Extend the Theme's SCSS

There are some limitation and drawbacks to simply adding another CSS file to the site. For instance, you might want access to the theme's SCSS variables. Similarly to steps laid out above (for overriding a theme template file), here's what you need to do:
- Navigate to the theme's directory (e.g. `$ open $(bundle show jekyll-swiss)`)
- Find the main SCSS in the theme, and copy it into your project with the same file path it had in the theme. In my case, the theme's main stylesheet was in `jekyll-swiss-0.4.0/assets/style.scss`, so I created `assets/style.scss` in my project root.
The content of this file is:

```scss
---
# Only the main Sass file needs front matter (the dashes are enough)
---
@charset "utf-8";

// Import partials from `sass_dir` and set theme here
@import
        "theme-{% raw %}{{ site.theme_color | default: "black" }}{% endraw %}.scss"
;
```
The default base that the Jekyll SCSS compiler uses for imported URLs points to the theme's configured SCSS directory, so I don't need to change anything in my copy of this file in order for that import statement to work. I can go ahead and start using the theme's variables:

```scss
...

a {
  color: $color-primary-link;
}

...
```

## Deploy

In order to deploy your site, all you need to do is run Jekyll's build process, and then copy the files in `_site/` into your server's web root.

### Server Config

Consider the following when setting up your server to host a Jekyll site.

#### Permalinks

You may need to configure your production server in order to accommodate your chosen permalink structure. For example: I have set, in `_config.yml`,
```ruby
permalink: /blog/:title
```
Notice that the title is not followed by `.html`, but the files that I would like to serve, when hitting the resulting URLs, are html files.

I am using Apache, so I opted to create an `.htaccess` file in my web root, containing the following:

```htaccess
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^([^\.]+)$ $1.html [NC,L]
```
#### 404

You may also want to add a 404 page. You'll have to create a template file for that page, and then configure your server to use the resultant page as your error document.
- Create `404.md` in your project root. Here's what mine looks like:  

```
---
# example 404.md

layout: post
title: Not Found
date: 1970-01-01T00:00:00+00:00
permalink: /404.html
exclude_from_nav: true
---

This, ladies and gentlemen, is a 404
```

- If you are using Apache, add the following to your `.htaccess`:
```htaccess
ErrorDocument 404 /404.html
```

Next time you run a build, the file `_site/404.html` should be created.

### Build \_site/ Files

Although running the Jekyll development server will cause Jekyll to build the `_site/` files, you should turn off the dev server and run `jekyll build` before checking in and deploying `_site/` files. This is because the dev server will have assigned `localhost:4000` as the value of of `site.url`, and this value may be baked into various resultant html files.

Also note that you might want to specify the environment when doing a production build:
```bash
$ JEKYLL_ENV=production jekyll build
```
This is because some templates may include blocks that are checking for the environment, such as

```liquid
{% raw %}
{% if jekyll.environment == 'production' and site.google_analytics %}
  {% include google-analytics.html %}
{% endif %}
{% endraw %}
```

### My Process
I am using git for my Jekyll site. In addition, I have decided to track `_site/` using git, contrary to the default Jekyll behaviour, in order to be able to avoid having to do a Jekyll build on my web server (i.e. to avoid configuring my web host environment w/ correct version of Ruby and gems etc). So, for me, the process looks something like this:

```bash
$ JEKYLL_ENV=production jekyll build
$ git add .
$ git commit -m "my message"
$ git push
$ ssh user@host
host$ cd ~/repos/jekyll-site
host$ git pull
# My web root is /var/www/html/
host$ cp -a ~/jekyll_site/_site/. /var/www/html
# Tada!
```

## Conclusion

So, that should be enough info to be able to start working on your new Jekyll site!
You might also find some useful info in my post on [Migrating From Wordpress to Jekyll](/blog/migrating-from-wordpress-to-jekyll) - I cover some Wordpress specific topics, as well as some more general blog-related things.
