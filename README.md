# newsy-news
Layout for a hacker-or-designer-news-esque feed.

## What's going on here?
There is a lot of stuff in this repo. Ignore most of it.

### To build and test
All commands assume you're in the project root:

* For the React: `cd js && watchify src/index.react.js -t babelify -o app.js`
* For the SCSS: `cd css && sass -w style.scss:style.css`
* For the static server: `node server` followed by an optional port number (default is `1337`)

### HTML and (S)CSS
Most deps are in the `bower_components` file.

**Dependencies**
* html5 boilerplate
* SCSS
* `pure.css` base styles
* `pure.css` responsive grid system
* `font-awesome` icons

### JS
Most deps are listed in the `package.json` manifest.
> You gotta have node, buddy.
We are loading some boilerplate, jQuery, and Modernizr. Modernizr is not in use yet and could be removed.
**Dependencies**
* `jQuery`
* `Velocity` (for animations)
* `React`
* `browserify` (or `watchify`) with the `babelify` transform for our `JSX`