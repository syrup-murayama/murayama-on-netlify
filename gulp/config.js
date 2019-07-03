// gulp/config.js

// require gulp-util & paths
var gutil    = require('gulp-util'),
    path     = require('./paths.js'),
    // require for imagemin options
    pngquant = require('imagemin-pngquant');

// project local url
var url = 'gulp.dev';

// define options
module.exports = {

    // tasks names
    task: {
		browserSync: 'serve',
		fonts      : 'fonts',
		sass       : 'sass',
		scripts    : 'js',
		images     : 'images',
		vendor     : 'vendor',
		nunjucks   : 'nunjucks',
		clean      : 'clean',
		build      : 'build'
    },

    // serve task browser-sync options
    serve: {
        dev: {
            server: {
            	baseDir: path.to.dist.dev
            },
            // proxy: url + '/' + path.to.dev,
            // set browser automaically opened
            browser: 'google chrome'
            // for more options: http://www.browsersync.io/docs/options
        },
        prod: {
        	server: {
            	baseDir: path.to.dist.prod
            },
            // proxy: url + '/' + path.to.prod,
            // set browser automaically opened
            browser: 'google chrome'
        }
    },

    // vendor task mainYarnFiles options
    mainYarnFiles: {
        // main options
        options: {
            js: {
                filter: '**/*.js',
                paths: {
                    modulesFolder: 'node_modules',
                    jsonFile: 'package.json'
                }
            },
            scss: {
                // here i will get sass/scss files directly from node_modules folder
                bulma: {
                    src: [
                        'node_modules/bulma/sass/**/*.{scss,sass}',
                        // bulma extensions
                        'node_modules/bulma-pricingtable/dist/css/**/*.{scss,sass}',
                        'node_modules/bulma-badge/dist/css/**/*.{scss,sass}',
                        'node_modules/bulma-divider/dist/css/**/*.{scss,sass}',
                        'node_modules/bulma-tooltip/dist/css/**/*.{scss,sass}',
                        'node_modules/bulma-pageloader/dist/css/**/*.{scss,sass}',
                        'node_modules/bulma-calendar/dist/css/**/*.{scss,sass}',
                        'node_modules/bulma-checkradio/dist/css/**/*.{scss,sass}',
                        'node_modules/bulma-iconpicker/dist/css/**/*.{scss,sass}',
                        'node_modules/bulma-quickview/dist/css/**/*.{scss,sass}',
                        'node_modules/bulma-slider/dist/css/**/*.{scss,sass}',
                        'node_modules/bulma-steps/dist/css/**/*.{scss,sass}',
                        'node_modules/bulma-switch/dist/css/**/*.{scss,sass}',
                        'node_modules/bulma-tagsinput/dist/css/**/*.{scss,sass}',
                        'node_modules/bulma-timeline/dist/css/**/*.{scss,sass}',
                    ]
                }
                // filter: '**/*.{scss,sass}',
                // paths: {
                //     modulesFolder: 'node_modules',
                //     jsonFile: 'package.json'
                // }
            },
            images: {
                // here i will get flag-icon flags svg images directly from node_modules
                flagIcon: {
                    src: [
                        'node_modules/flag-icon-css/flags/**/*.svg'
                    ]
                }
            },
            css: {
                filter: '**/*.css',
                paths: {
                    modulesFolder: 'node_modules',
                    jsonFile: 'package.json'
                }
            },
            fonts: {
                filter: '**/*.{svg,ttf,otf,eot,woff,woff2}',
                paths: {
                    modulesFolder: 'node_modules',
                    jsonFile: 'package.json'
                }
            },
            // paths: {
            //     modulesFolder: 'node_modules',
            //     jsonFile: 'package.json'
            // }
        },
        // vendor:css rename options
        rename: {
            suffix: "-css",
            extname: '.scss'
        },
        // watch src
        watch: ['./node_modules/**', './package.json']
    },

    // nunjucks task options
    nunjucks: {
        // nunjucks options
        // @see https://github.com/carlosl/gulp-nunjucks-render#options
        options: {
            path: [path.to.nunjucks.config],
            // ext: '.html', // Extension for compiled templates
            envOptions: {
            watch: false
            },
        },
        // inject task options
        injectCss: {
            vendorOptions: {
                relative: true,
                name: 'vendors',
                starttag: '<!-- vendors:css -->',
                endtag: '<!-- endvendors -->',
                // removeTags: true
                // more options : https://github.com/klei/gulp-inject#api
            },
            appOptions: {
                relative: true,
                name: 'styles',
                starttag: '<!-- styles:css -->',
                endtag: '<!-- endstyles -->',
                // removeTags: true
            }
        },
        injectJs: {
            jqueryOptions: {
                relative: true,
                name: 'jquery',
                starttag: '<!-- jquery:js -->',
                endtag: '<!-- endjquery -->',
                // removeTags: true
            },
            vendorOptions: {
                relative: true,
                name: 'vendors',
                starttag: '<!-- vendors:js -->',
                endtag: '<!-- endvendors -->',
                // removeTags: true
            },
            appOptions: {
                relative: true,
                name: 'scripts',
                starttag: '<!-- scripts:js -->',
                endtag: '<!-- endscripts -->',
                // removeTags: true
            }
        }
    },

    // sass task options
    sass: {
        // main options
        options: {
            includePaths: [
                path.to.sass.vendor, path.to.sass.bulma,
                // this to solve bulma extensions @import issue
                path.to.sass.bulma + 'utilities/'
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

    // html task options
    html: {
        // build:html:copy prettify options
        prettifyOptions: {
            indent_size: 2,
            preserve_newlines: false,
            indent_inner_html: true,
            // for more options:
            // https://github.com/beautify-web/js-beautify#css--html
        },
        // build:html:inject options
        injectCss: {
            vendorOptions: {
                relative: true,
                name: 'buildvendor',
                starttag: '<!-- buildvendor:css -->',
                endtag: '<!-- endbuildvendor -->',
                removeTags: true
            },
            appOptions: {
                relative: true,
                name: 'buildapp',
                starttag: '<!-- buildapp:css -->',
                endtag: '<!-- endbuildapp -->',
                removeTags: true
            }
        },
        injectJs: {
            vendorOptions: {
                relative: true,
                name: 'buildvendor',
                starttag: '<!-- buildvendor:js -->',
                endtag: '<!-- endbuildvendor -->',
                removeTags: true
            },
            appOptions: {
                relative: true,
                name: 'buildapp',
                starttag: '<!-- buildapp:js -->',
                endtag: '<!-- endbuildapp -->',
                removeTags: true
            }
        }
    },

    // css task options
    css: {
        // postcss-uncss options
        postcssUncssOptions: {
            html: [path.to.dist.dev + '*.html'],
            // more options
            // https://github.com/giakki/uncss#within-nodejs
        },
        // strip-css-comments options
        stripCommentsOptions: {
            preserve: true
        },
        // cssbeautify options
        cssbeautifyOptions: {
            indent: '    '
        },
        // minify and clean css options
        // @see https://github.com/jakubpawlowicz/clean-css#level-1-optimizations
        cleanCssOptions: {
            specialComments: 'all'
        },
        // rename options
        renameOptions: {
            suffix: '.min'
        }
    },

    // images task options
    images: {
        // imagemin options
        imageminOptions: {
            optimizationLevel: 7,
            progressive: true,
            interlaced: true,
            use: [pngquant()] // imagemin-pngquant
        },
        // favicons options
        faviconsOptions: {
            appName: 'Joo Template',
            appShortName: 'Joo',
            appDescription: 'Joo - Niche Multi-Purpose HTML Template',
            developerName: 'Jozoor',
            developerURL: 'https://jozoor.com',
            background: '#fff',
            path: '/assets/images/favicons/',
            url: '/',
            display: 'standalone',
            orientation: 'portrait',
            version: 1.0,
            logging: false,
            online: false,
            html: path.to.nunjucks.config + '_includes/favicons.nunjucks',
            replace: true,
            icons: {
                android: false, // create Android homescreen icon
                appleIcon: true, // create Apple touch icons
                appleStartup: false, // create Apple startup images
                coast: false, // create Opera Coast icon
                favicons: true, // create regular favicons
                firefox: false, // create Firefox OS icons
                opengraph: true, // create Facebook OpenGraph image
                twitter: true, // create Twitter Summary Card image
                windows: false, // create Windows 8 tile icons
                yandex: false // create Yandex browser icon
            }
            // options from here : https://github.com/haydenbleasel/favicons#nodejs
        }
    },

    // error handler
    error: function(error) {
        // output an error message
        gutil.log(
            gutil.colors.red(
                '\n\------------------------------\n\Error in plugin (' + gutil.colors.green(error.plugin) + '):\n\ ' + gutil.colors.blue(error.message) + '------------------------------'
            )
        );
        // emit the end event, to properly end the task
        this.emit('end');
    }

};
