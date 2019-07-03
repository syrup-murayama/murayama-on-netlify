## :zap: JO Gulp workflow
> An organized front-end workflow for Jozoor Templates development using gulp.

* [Features](https://github.com/mohamdio/jo-gulp-workflow#features)
* [Gulp Tasks Structure](https://github.com/mohamdio/jo-gulp-workflow#gulp-tasks-structure)
* [Getting Started](https://github.com/mohamdio/jo-gulp-workflow#getting-started)
* [Folders Structure](https://github.com/mohamdio/jo-gulp-workflow#folders-structure)
* [Configuration & Paths](https://github.com/mohamdio/jo-gulp-workflow#configuration--paths)
* [Copyright](https://github.com/mohamdio/jo-gulp-workflow#copyright)

## Features
- Organized & splitting tasks files
- Using gulp-load-plugins
- Define tasks options & paths from one file
- Using Yarn to get dependencies
- Preview server with BrowserSync
- Cleans up file directories
- Plumber to handle gulp exceptions
- Sourcemaps for sass & js
- Sass compile with docs
- Js modules & uglify
- Nunjucks templates
- Automagically inject css/js files
- Prettify html files
- Image optimization
- Generate favicons
- Concat css/js files
- & more, take a look at the gulp plugins used in [package.json](https://github.com/mohamdio/jo-gulp-workflow/blob/master/package.json)

## Gulp Tasks Structure
This is gulp folder structure:
- `config.js` file : to define tasks options
- `paths.js` file : to define all paths for tasks
- `base` folder : contain base tasks
- `default` folder : contain common tasks for development
- `build` folder : contain build tasks for production

```
gulp
├── config.js
├── paths.js
└── tasks
    ├── base
    │   ├── clean.js
    │   ├── serve.js
    │   ├── vendor.js
    │   └── watch.js
    ├── build
    │   ├── css.js
    │   ├── fonts.js
    │   ├── html.js
    │   ├── images.js
    │   └── scripts.js
    └── default
        ├── fonts.js
        ├── images.js
        ├── nunjucks.js
        ├── sass.js
        └── scripts.js
```

## Getting Started
- Install [Node.js](https://nodejs.org/)
- Install [Yarn](https://yarnpkg.com/en/docs/install) globally or by npm 
```
npm install --global yarn
```
- In terminal/command line, `cd` into your project directory
- Clone this workflow 
```
git clone https://github.com/mohamdio/jo-gulp-workflow.git .
```
- Install front-end and Gulp dependencies 
```
yarn install
```
- After all done installing, you can run tasks
  * `gulp` to run default tasks for development
  * `gulp build` to build your project for production
  * `gulp help` to get a listing of available tasks

#### Available Tasks
Task Name | Subtasks | Description
--- | --- | ---
`clean` | `clean:cache` - `clean:prod` | clean dest folders (dev & prod) & caches :: [base/clean.js](https://github.com/mohamdio/jo-gulp-workflow/blob/master/gulp/tasks/base/clean.js)
`vendor` | `vendor:clean` - `vendor:bulma:sass` - `vendor:js` - `vendor:css` - `vendor:fonts` | dest all vendor dependencies to source folder :: [base/vendor.js](https://github.com/mohamdio/jo-gulp-workflow/blob/master/gulp/tasks/base/bower.js)
`fonts` | --- | copy all fonts to dev folder :: [default/fonts.js](https://github.com/mohamdio/jo-gulp-workflow/blob/master/gulp/tasks/default/fonts.js)
`sass` | `sass:compile` - `sass:doc` - `sass:cssRebaseUrl` | compile sass files with docs & rebase css url :: [default/sass.js](https://github.com/mohamdio/jo-gulp-workflow/blob/master/gulp/tasks/default/sass.js)
`js` | `js:copySrc` | uglify js files & copy source js files to dev folder :: [default/scripts.js](https://github.com/mohamdio/jo-gulp-workflow/blob/master/gulp/tasks/default/scripts.js)
`images` | `images:minify` - `images:favicons` | minify images & generate favicons :: [default/images.js](https://github.com/mohamdio/jo-gulp-workflow/blob/master/gulp/tasks/default/images.js)
`nunjucks` | `nunjucks:render` - `nunjucks:inject` | render nunjucks files & inject css/js files :: [default/nunjucks.js](https://github.com/mohamdio/jo-gulp-workflow/blob/master/gulp/tasks/default/nunjucks.js)
`serve` | `serve:prod` | start server & open browser for dev or prod mode :: [base/serve.js](https://github.com/mohamdio/jo-gulp-workflow/blob/master/gulp/tasks/base/serve.js)
`watch` | --- | start gulp watch for tasks (bower - sass - nunjucks - js) :: [base/watch.js](https://github.com/mohamdio/jo-gulp-workflow/blob/master/gulp/tasks/base/watch.js)
`build` | --- | main build task for prod mode
--- | `build:fonts` | copy fonts to prod folder :: [build/fonts.js](https://github.com/mohamdio/jo-gulp-workflow/blob/master/gulp/tasks/build/fonts.js)
--- | `build:css` | rebase url/remove unused selectors/strip comments/beautify/concat/minify :: [build/css.js](https://github.com/mohamdio/jo-gulp-workflow/blob/master/gulp/tasks/build/css.js)
--- | `build:js` | copy js files to prod folder :: [build/scripts.js](https://github.com/mohamdio/jo-gulp-workflow/blob/master/gulp/tasks/build/scripts.js)
--- | `build:images` | copy images to prod folder :: [build/images.js](https://github.com/mohamdio/jo-gulp-workflow/blob/master/gulp/tasks/build/images.js)
--- | `build:html` | copy & prettify html files and inject minified css/js files :: [build/html.js](https://github.com/mohamdio/jo-gulp-workflow/blob/master/gulp/tasks/build/html.js)

## Folders Structure
- `build` folder : contain dest folders `dev` for development & `prod` for production
- `gulp` folder : contain all gulp tasks files
- `node_modules` folder : contain all front-end and gulp dependencies
- `source` folder : contain all source files
- `gulpfile.js` file : define gulp tasks for default & build
- `package.json` file : define front-end and gulp dependencies
- other files for the repo.

```
jo-gulp-workflow
├── build
│   ├── dev
│   │   ├── assets
│   │   └── index.html
│   └── dist
│       ├── assets
│       └── index.html
├── gulp
│   ├── config.js
│   ├── paths.js
│   └── tasks
│       ├── base
│       ├── build
│       └── default
├── node_modules
│   ├── # Frone-end and Gulp dependencies
├── source
│   ├── fonts
│   │   └── vendor
│   ├── images
│   │   └── logo.png
│   ├── js
│   │   ├── modules
│   │   └── vendor
│   ├── scss
│   │   ├── main.scss
│   │   ├── modules
│   │   ├── partials
│   │   └── vendor
│   └── templates
│       ├── includes
│       ├── index.nunjucks
│       ├── layouts
│       └── macros
│   ├── README.md
├── gulpfile.js
├── LICENSE
├── package.json
├── README.md
└── yarn.lock

```

## Configuration & Paths
- From [`gulp/config.js`](https://github.com/mohamdio/jo-gulp-workflow/blob/master/gulp/config.js) you can define tasks & plugins options without change anything in task file, example :
```javascript
// sass task options
    sass: {
        // main options
        options: {
            includePaths: [
                path.to.sass.vendor, path.to.sass.bulma
            ],
            outputStyle: 'expanded'
            // more options
            // https://github.com/sass/node-sass#usage-1
        },
        // sass:doc options
        sassdocOptions: {
            dest: path.to.sass.dist.dev + '/_sassdoc',
            // for more options
            // http://sassdoc.com/gulp/
        }
    },
```

- From [`gulp/paths.js`](https://github.com/mohamdio/jo-gulp-workflow/blob/master/gulp/paths.js) you can define all paths for tasks, example :
```javascript
// base paths
var src    = './source/',
    dist   = './build/',
    dev    = 'dev/',
    prod   = 'dist/',
    assets = 'assets/';

// nunjucks files
        nunjucks: {
            config: src + 'templates/',
            src: src + 'templates/*.{html,nunjucks}',
            watch: src + 'templates/**/*.+(html|nunjucks)'
        },
```

## Copyright
© Developed by [Jozoor](https://jozoor.com/).