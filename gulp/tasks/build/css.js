// gulp/tasks/build/css.js

// ----------------------------------
// available tasks: 
//    'gulp build:css' : main css task
// ----------------------------------
// plugins:
//     gulp-sourcemaps        : $.sourcemaps
//     gulp-clean-css         : $.cleanCss
//     gulp-rename            : $.rename
//     gulp-plumber           : $.plumber
//     gulp-concat            : $.concat
//     gulp-postcss           : $.postcss
//     postcss-uncss          : $.postcssUncss
//     gulp-cssbeautify       : $.cssbeautify
//     gulp-strip-css-comments: $.stripCssComments
//     gulp-replace           : $.replace
// ----------------------------------
// config:
//     config.task.build : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // start css vendor files task
    gulp.task(config.task.build + ':cssVendor', 'build vendor css files (beautify/concat/minify..) and bundle it to prod folder', function() {

        return gulp.src([
                // order css files for concat
                path.to.sass.dist.dev + '/vendor/**/*.css',
                '!' + path.to.sass.dist.dev + '/**/_*{,/**}/'
            ])
            // prevent breaking errors
            .pipe($.plumber({
                errorHandler: config.error
            }))
            // remove unused css selectors
            // .pipe($.postcss(
            //     [
            //         $.postcssUncss(
            //             config.css.postcssUncssOptions // options
            //         ),
            //     ]
            // ))
            // beautify final css code
            .pipe($.cssbeautify(
                config.css.cssbeautifyOptions // options
            ))
            // start replace
            .pipe($.replace('url("../../fonts/', 'url("../fonts/'))
            .pipe($.replace('url("../../images/', 'url("../images/'))
            .pipe($.replace('../../../fonts/', '../fonts/')) // for slider revolution
            .pipe($.replace('url(../../images/flags/', 'url(../images/flags/')) // for flag-icon
            // dest vendor source files
            // .pipe(gulp.dest(path.to.sass.dist.prod + '/source/vendor'))
            // strip unimportant css comments
            .pipe($.stripCssComments(
                // config.css.stripCommentsOptions // options
                {
                    preserve: false
                }
            ))
            // concat all vendor css files
            .pipe($.concat('vendor.css'))
            // beautify final css code
            .pipe($.cssbeautify(
                config.css.cssbeautifyOptions // options
            ))
            // dest unminified final vendor css file
            .pipe(gulp.dest(path.to.sass.dist.prod))
            // initialize sourcemaps before minify
            .pipe($.sourcemaps.init())
            // minify and clean
            .pipe($.cleanCss(
                config.css.cleanCssOptions // options
            ))
            // rename final css file
            .pipe($.rename(
                config.css.renameOptions // options
            ))
            // writing sourcemaps for minified file
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest(path.to.sass.dist.prod));

    });

    // start css app files task
    gulp.task(config.task.build + ':cssApp', 'build app css files (beautify/concat/minify..) and bundle it to prod folder', function() {

        return gulp.src([
                // order css files for concat
                path.to.sass.dist.dev + '/base/*.css',
                path.to.sass.dist.dev + '/elements/*.css',
                path.to.sass.dist.dev + '/layout/*.css',
                path.to.sass.dist.dev + '/modules/*.css',
                path.to.sass.dist.dev + '/pages/*.css',
                path.to.sass.dist.dev + '/responsive.css',
                '!' + path.to.sass.dist.dev + '/**/all.css',
                '!' + path.to.sass.dist.dev + '/**/_*{,/**}/'
            ])
            // prevent breaking errors
            .pipe($.plumber({
                errorHandler: config.error
            }))
            // remove unused css selectors
            // .pipe($.postcss(
            //     [
            //         $.postcssUncss(
            //             config.css.postcssUncssOptions // options
            //         ),
            //     ]
            // ))
            // beautify final css code
            .pipe($.cssbeautify(
                config.css.cssbeautifyOptions // options
            ))
            // start replace
            .pipe($.replace('url("../../fonts/', 'url("../fonts/'))
            .pipe($.replace('url("../../images/', 'url("../images/'))
            .pipe($.replace('../../../fonts/', '../fonts/')) // for slider revolution
            .pipe($.replace('url(../../images/flags/', 'url(../images/flags/')) // for flag-icon
            // dest app source files
            // .pipe(gulp.dest(path.to.sass.dist.prod + '/source/styles'))
            // strip unimportant css comments
            .pipe($.stripCssComments(
                config.css.stripCommentsOptions // options
            ))
            // concat all vendor css files
            .pipe($.concat('styles.css'))
            // beautify final css code
            .pipe($.cssbeautify(
                config.css.cssbeautifyOptions // options
            ))
            // dest unminified final vendor css file
            .pipe(gulp.dest(path.to.sass.dist.prod))
            // initialize sourcemaps before minify
            .pipe($.sourcemaps.init())
            // minify and clean
            .pipe($.cleanCss(
                config.css.cleanCssOptions // options
            ))
            // rename final css file
            .pipe($.rename(
                config.css.renameOptions // options
            ))
            // writing sourcemaps for minified file
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest(path.to.sass.dist.prod));

    });

    // start copy all source files to prod folder task
    gulp.task(config.task.build + ':copySource', 'copy all source files to prod folder', function() {

        return gulp.src([
                // order css files for concat
                path.to.sass.dist.dev + '/**/*.css',
                '!' + path.to.sass.dist.dev + '/custom.css',
                '!' + path.to.sass.dist.dev + '/**/all.css',
                '!' + path.to.sass.dist.dev + '/**/_*{,/**}/'
            ])
            // dest app source files
            .pipe(gulp.dest(path.to.sass.dist.prod + '/source'));

    });

    // start copy custom file to prod folder task
    gulp.task(config.task.build + ':copyCustom', 'copy custom file to prod folder', function() {

        return gulp.src([
                // order css files for concat
                path.to.sass.dist.dev + '/custom.css'
            ])
            // dest app source files
            .pipe(gulp.dest(path.to.sass.dist.prod));

    });

    // main css task
    gulp.task(config.task.build + ':css', 'main css styles task', function(cb) {

        $.runSequence(
            config.task.build + ':cssVendor',
            config.task.build + ':cssApp',
            config.task.build + ':copySource',
            config.task.build + ':copyCustom',
            cb
        );

    });

};