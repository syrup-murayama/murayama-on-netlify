// gulp/tasks/default/nunjucks.js

// ----------------------------------
// available tasks:
//    'gulp nunjucks'       : main task
//    'gulp nunjucks:render': render nunjucks files
//    'gulp nunjucks:inject': inject css/js files
// ----------------------------------
// plugins:
//     gulp-nunjucks-render: $.nunjucksRender
//     browser-sync        : $.browserSync
//     stream-series       : $.streamSeries
//     gulp-changed        : $.changed
//     gulp-newer          : $.newer
//     gulp-inject         : $.inject
//     gulp-plumber        : $.plumber
//     gulp-prettify       : $.prettify
//     gulp-version-number : $.versionNumber
//     gulp-data           : $.data
//     fs                  : $.fs
//     path                : $.path
// ----------------------------------
// config:
//     config.task.nunjucks : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // render nunjucks files task
    gulp.task(config.task.nunjucks + ':render', 'render nunjucks files', function() {

        return gulp.src(path.to.nunjucks.src)
            // prevent breaking errors
            .pipe($.plumber({
                errorHandler: config.error
            }))
            // only pass through changed files
            .pipe($.changed(path.to.dist.dev + '**/*.html'))
            // only pass through newer source files
            .pipe($.newer(path.to.dist.dev + '**/*.html'))
            // add global json data to nunjucks files
            .pipe($.data(function() {
                var global_data_file = path.to.nunjucks.config + '_data/global.json';
                if ($.fs.existsSync(global_data_file)) {
                    return JSON.parse($.fs.readFileSync(global_data_file));
                }
            }))
            // add elements json data to nunjucks files
            .pipe($.data(function() {
                var elements_data_file = path.to.nunjucks.config + '_data/elements.json';
                if ($.fs.existsSync(elements_data_file)) {
                    return JSON.parse($.fs.readFileSync(elements_data_file));
                }
            }))
            // add blog json data to nunjucks files
            .pipe($.data(function() {
                var elements_data_file = path.to.nunjucks.config + '_data/blog.json';
                if ($.fs.existsSync(elements_data_file)) {
                    return JSON.parse($.fs.readFileSync(elements_data_file));
                }
            }))
            // add blog single json data to nunjucks files
            .pipe($.data(function() {
                var elements_data_file = path.to.nunjucks.config + '_data/blog-single.json';
                if ($.fs.existsSync(elements_data_file)) {
                    return JSON.parse($.fs.readFileSync(elements_data_file));
                }
            }))
            // add portfolio json data to nunjucks files
            .pipe($.data(function() {
                var elements_data_file = path.to.nunjucks.config + '_data/portfolio.json';
                if ($.fs.existsSync(elements_data_file)) {
                    return JSON.parse($.fs.readFileSync(elements_data_file));
                }
            }))
            // add portfolio single json data to nunjucks files
            .pipe($.data(function() {
                var elements_data_file = path.to.nunjucks.config + '_data/portfolio-single.json';
                if ($.fs.existsSync(elements_data_file)) {
                    return JSON.parse($.fs.readFileSync(elements_data_file));
                }
            }))
            // add json data per page to nunjucks files
            .pipe($.data(function(file) {
                var data_file = path.to.nunjucks.config + '_data/' + $.path.basename(file.path, '.nunjucks') + '.json'; // replace '.nunjucks' > '.json'
                if ($.fs.existsSync(data_file)) {
                    return JSON.parse($.fs.readFileSync(data_file));
                } else {
                    return JSON.parse($.fs.readFileSync(path.to.nunjucks.config + '_data/index.json'));
                }
            }))
            // start render
            .pipe($.nunjucksRender(
                config.nunjucks.options // options
            ))
            // beautify HTML
            .pipe($.prettify(
                config.html.prettifyOptions // options
            ))
            .pipe(gulp.dest(path.to.dist.dev))
            .pipe($.browserSync.reload({
                stream: true
            }));

    });

    // inject css/js files task
    gulp.task(config.task.nunjucks + ':inject', 'inject css/js files', function() {

        return gulp.src([
                path.to.dist.dev + '**/*.html',
                '!' + path.to.dist.dev + 'assets/**/*.html'
            ])
            // prevent breaking errors
            .pipe($.plumber({
                errorHandler: config.error
            }))
            /**
             * CSS files
             */
            // inject vendor files
            .pipe($.inject(gulp.src(
                    path.to.sass.dist.dev + '/vendor/**/*.css', {
                        read: false
                    }),
                config.nunjucks.injectCss.vendorOptions // options
            ))
            // inject main files
            .pipe($.inject(gulp.src([
                    path.to.sass.dist.dev + '/base/*.css',
                    path.to.sass.dist.dev + '/layout/*.css',
                    path.to.sass.dist.dev + '/elements/*.css',
                    path.to.sass.dist.dev + '/modules/*.css',
                    path.to.sass.dist.dev + '/pages/*.css',
                    '!' + path.to.sass.dist.dev + '/**/all.css',
                    path.to.sass.dist.dev + '/responsive.css',
                    path.to.sass.dist.dev + '/custom.css'
                ], {
                    read: false
                }),
                config.nunjucks.injectCss.appOptions // options
            ))
            /**
             * JS files
             */
            // inject jquery file
            .pipe($.inject(gulp.src(
                    path.to.js.dist.dev + '/vendor/jquery.js', {
                        read: false
                    }),
                config.nunjucks.injectJs.jqueryOptions // options
            ))
            // inject vendor files
            .pipe($.inject(

                $.streamSeries(
                    gulp.src([
                        path.to.js.dist.dev + '/vendor/clipboard.min.js',
                        path.to.js.dist.dev + '/vendor/prism.js',
                        path.to.js.dist.dev + '/vendor/prism-toolbar.min.js',
                    ], {
                        read: false
                    }),
                    gulp.src([
                        path.to.js.dist.dev + '/vendor/*.js',
                        '!' + path.to.js.dist.dev + '/vendor/jquery.js',
                        '!' + path.to.js.dist.dev + '/vendor/clipboard.min.js',
                        '!' + path.to.js.dist.dev + '/vendor/prism.js',
                        '!' + path.to.js.dist.dev + '/vendor/index.js',
                        '!' + path.to.js.dist.dev + '/vendor/prism-toolbar.min.js',
                    ], {
                        read: false
                    })
                ),
                config.nunjucks.injectJs.vendorOptions // options

            ))
            // inject main files
            .pipe($.inject(

                $.streamSeries(
                    gulp.src([
                        path.to.js.dist.dev + '/modules/owl.carousel.scrollbar.js',
                        path.to.js.dist.dev + '/modules/carousel-slider.js',
                    ], {
                        read: false
                    }),
                    gulp.src([
                        path.to.js.dist.dev + '/modules/**/*.js',
                        '!' + path.to.js.dist.dev + '/modules/owl.carousel.scrollbar.js',
                        '!' + path.to.js.dist.dev + '/modules/carousel-slider.js',
                        path.to.js.dist.dev + '/custom.js', // custom scripts
                    ], {
                        read: false
                    })
                ),
                config.nunjucks.injectJs.appOptions // options
            ))
            // start replace assets main folder for images
            // .pipe($.replace('/assets/images/', 'assets/images/'))
            .pipe($.replace('/assets/images/', function() {
                if(((this.file.relative).split('/').length) - 1 === 1) {
                    return '../assets/images/';
                } else if(((this.file.relative).split('/').length) - 1 === 2) {
                    return '../../assets/images/';
                } else if(((this.file.relative).split('/').length) - 1 === 3) {
                    return '../../../assets/images/';
                } else if(((this.file.relative).split('/').length) - 1 === 4) {
                    return '../../../../assets/images/';
                } else {
                    return './assets/images/';
                }
            }))
            // start replace relative homepage index url
            .pipe($.replace('href="/"', function() {
                if(((this.file.relative).split('/').length) - 1 === 1) {
                    return 'href="../index.html"';
                } else if(((this.file.relative).split('/').length) - 1 === 2) {
                    return 'href="../../index.html"';
                } else if(((this.file.relative).split('/').length) - 1 === 3) {
                    return 'href="../../../index.html"';
                } else if(((this.file.relative).split('/').length) - 1 === 4) {
                    return 'href="../../../../index.html"';
                } else {
                    return 'href="./index.html"';
                }
            }))
            // start replace main folders index url
            .pipe($.replace('href="/features/"', 'href="/features/index.html"'))
            .pipe($.replace('href="/pages/"', 'href="/pages/index.html"'))
            .pipe($.replace('href="/portfolio/"', 'href="/portfolio/index.html"'))
            .pipe($.replace('href="/blog/"', 'href="/blog/index.html"'))
            .pipe($.replace('href="/elements/"', 'href="/elements/index.html"'))
            // start fixing validator.w3.org errors
            .pipe($.replace('target=""', ''))
            .pipe($.replace('<img', '<img alt="Joo - Niche Multi-Purpose HTML Template" '))
            .pipe($.replace('id=""', ''))
            .pipe($.replace('alt=""', ''))
            .pipe($.replace('class=""', ''))
            .pipe($.replace('</img>', ''))
            // start replace relative features index url
            .pipe($.replace('href="/features/', function() {
                if(((this.file.relative).split('/').length) - 1 === 1) {
                    return 'href="../features/';
                } else if(((this.file.relative).split('/').length) - 1 === 2) {
                    return 'href="../../features/';
                } else if(((this.file.relative).split('/').length) - 1 === 3) {
                    return 'href="../../../features/';
                } else if(((this.file.relative).split('/').length) - 1 === 4) {
                    return 'href="../../../../features/';
                } else {
                    return 'href="./features/';
                }
            }))
            // start replace relative pages index url
            .pipe($.replace('href="/pages/', function() {
                if(((this.file.relative).split('/').length) - 1 === 1) {
                    return 'href="../pages/';
                } else if(((this.file.relative).split('/').length) - 1 === 2) {
                    return 'href="../../pages/';
                } else if(((this.file.relative).split('/').length) - 1 === 3) {
                    return 'href="../../../pages/';
                } else if(((this.file.relative).split('/').length) - 1 === 4) {
                    return 'href="../../../../pages/';
                } else {
                    return 'href="./pages/';
                }
            }))
            // start replace relative portfolio index url
            .pipe($.replace('href="/portfolio/', function() {
                if(((this.file.relative).split('/').length) - 1 === 1) {
                    return 'href="../portfolio/';
                } else if(((this.file.relative).split('/').length) - 1 === 2) {
                    return 'href="../../portfolio/';
                } else if(((this.file.relative).split('/').length) - 1 === 3) {
                    return 'href="../../../portfolio/';
                } else if(((this.file.relative).split('/').length) - 1 === 4) {
                    return 'href="../../../../portfolio/';
                } else {
                    return 'href="./portfolio/';
                }
            }))
            // start replace relative blog index url
            .pipe($.replace('href="/blog/', function() {
                if(((this.file.relative).split('/').length) - 1 === 1) {
                    return 'href="../blog/';
                } else if(((this.file.relative).split('/').length) - 1 === 2) {
                    return 'href="../../blog/';
                } else if(((this.file.relative).split('/').length) - 1 === 3) {
                    return 'href="../../../blog/';
                } else if(((this.file.relative).split('/').length) - 1 === 4) {
                    return 'href="../../../../blog/';
                } else {
                    return 'href="./blog/';
                }
            }))
            // start replace relative elements index url
            .pipe($.replace('href="/elements/', function() {
                if(((this.file.relative).split('/').length) - 1 === 1) {
                    return 'href="../elements/';
                } else if(((this.file.relative).split('/').length) - 1 === 2) {
                    return 'href="../../elements/';
                } else if(((this.file.relative).split('/').length) - 1 === 3) {
                    return 'href="../../../elements/';
                } else if(((this.file.relative).split('/').length) - 1 === 4) {
                    return 'href="../../../../elements/';
                } else {
                    return 'href="./elements/';
                }
            }))
            .pipe(gulp.dest(path.to.dist.dev))
            .pipe($.browserSync.reload({
                stream: true
            }));

    });

    // add version number
    gulp.task(config.task.nunjucks + ':version', 'add version number', function() {

        var versionConfig = {
            'value': '%TS%',
            'append': {
                'key': 'v',
                'to': ['css', 'js']
            }
        };

        return gulp.src([
                path.to.dist.dev + '**/*.html',
                '!' + path.to.dist.dev + 'assets/**/*.html'
            ])
            .pipe($.versionNumber(versionConfig))
            .pipe(gulp.dest(path.to.dist.dev));

    });

    // copy new images to dev folder
    gulp.task(config.task.nunjucks + ':copyImages', 'copy new images to dev folder', function() {

        return gulp.src(path.to.images.src)
            .pipe(gulp.dest(path.to.images.dist.dev));

    });

    // main nunjucks task
    gulp.task(config.task.nunjucks, 'main nunjucks task', function(cb) {

        $.runSequence(
            config.task.nunjucks + ':render',
            config.task.nunjucks + ':inject',
            config.task.nunjucks + ':version',
            config.task.nunjucks + ':copyImages',
            cb
        );

    });

};
