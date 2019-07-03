// gulp/tasks/build/html.js

// ----------------------------------
// available tasks: 
//    'gulp build:html'        : main html task
//    'gulp build:html:copy'   : copy & prettify html
//    'gulp build:html:inject' : inject minified css/js
// ----------------------------------
// plugins:
//     gulp-changed : $.changed
//     gulp-prettify: $.prettify
//     gulp-newer   : $.newer
//     gulp-inject  : $.inject
//     gulp-plumber : $.plumber
//     gulp-version-number : $.versionNumber
// ----------------------------------
// config:
//     config.task.build : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // copy & prettify html files task
    gulp.task(config.task.build + ':html:copy', 'copy & prettify html files', function() {

        return gulp.src([
                path.to.dist.dev + '**/*.html',
                '!' + path.to.dist.dev + 'assets/**/*.html'
            ])
            // prevent breaking errors
            .pipe($.plumber({
                errorHandler: config.error
            }))
            // only pass through changed files
            .pipe($.changed(path.to.dist.prod + '**/*.html'))
            // only pass through newer source files
            .pipe($.newer(path.to.dist.prod + '**/*.html'))
            // beautify HTML
            .pipe($.prettify(
                config.html.prettifyOptions // options
            ))
            .pipe(gulp.dest(path.to.dist.prod));

    });

    // inject minified css/js files task
    gulp.task(config.task.build + ':html:inject', 'inject minified css/js files', function() {

        return gulp.src([
                path.to.dist.prod + '**/*.html',
            ])
            // prevent breaking errors
            .pipe($.plumber({
                errorHandler: config.error
            }))
            // inject vendor bundle css file
            .pipe($.inject(gulp.src(
                    path.to.sass.dist.prod + '/vendor.min.css', {
                        read: false
                    }),
                config.html.injectCss.vendorOptions // options
            ))
            // inject app styles css file
            .pipe($.inject(gulp.src([
                    path.to.sass.dist.prod + '/styles.min.css',
                    path.to.sass.dist.prod + '/custom.css'
                ], {
                    read: false
                }),
                config.html.injectCss.appOptions // options
            ))
            // inject vendor bundle js file
            .pipe($.inject(gulp.src(
                    path.to.js.dist.prod + '/vendor.min.js', {
                        read: false
                    }),
                config.html.injectJs.vendorOptions // options
            ))
            // inject app scripts js file
            .pipe($.inject(gulp.src([
                    path.to.js.dist.prod + '/scripts.min.js',
                    path.to.js.dist.prod + '/custom.js'
                ], {
                    read: false
                }),
                config.html.injectJs.appOptions // options
            ))
            .pipe(gulp.dest(path.to.dist.prod));

    });

    // add version number
    gulp.task(config.task.build + ':html:version', 'add version number', function() {

        var versionConfig = {
            'value': '%TS%',
            'append': {
                'key': 'v',
                'to': ['css', 'js']
            }
        };

        return gulp.src(path.to.dist.prod + '**/*.html')
            .pipe($.versionNumber(versionConfig))
            .pipe(gulp.dest(path.to.dist.prod));

    });

    // main html task
    gulp.task(config.task.build + ':html', 'main build:html task', function(cb) {

        $.runSequence(
            config.task.build + ':html:copy',
            config.task.build + ':html:inject',
            config.task.build + ':html:version',
            cb
        );

    });

};