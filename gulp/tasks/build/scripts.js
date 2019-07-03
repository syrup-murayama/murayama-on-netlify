// gulp/tasks/build/scripts.js

// ----------------------------------
// available tasks: 
//    'gulp build:js' : main js task
// ----------------------------------
// config:
//     config.task.build : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // copy vendor files task
    gulp.task(config.task.build + ':jsVendor', 'copy vendor files and bundle it to prod folder', function() {

        return gulp.src([
                path.to.js.dist.dev + '/vendor/jquery.js',
                path.to.js.dist.dev + '/vendor/clipboard.min.js',
                path.to.js.dist.dev + '/vendor/prism.js',
                path.to.js.dist.dev + '/vendor/prism-toolbar.min.js',
                path.to.js.dist.dev + '/vendor/*.js',
                // @todo here i should add any new vendor files
            ])
            // prevent breaking errors
            .pipe($.plumber({
                errorHandler: config.error
            }))
            // dest vendor source files
            .pipe(gulp.dest(path.to.js.dist.prod + '/source/vendor'))
            // concat all js files
            .pipe($.concat('vendor.js', {
                newLine: '\r\n'
            }))
            // dest unminified vendor file
            .pipe(gulp.dest(path.to.js.dist.prod))
            // initialize sourcemaps before minify
            .pipe($.sourcemaps.init())
            // minify
            .pipe($.uglify())
            // rename files
            .pipe($.rename(
                config.css.renameOptions // options
            ))
            // writing sourcemaps for minified file
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest(path.to.js.dist.prod));

    });

    // copy app files task
    gulp.task(config.task.build + ':jsApp', 'copy app files and minfiy it to prod folder', function() {

        return gulp.src([
                path.to.js.dist.dev + '/modules/owl.carousel.scrollbar.js',
                path.to.js.dist.dev + '/modules/carousel-slider.js',
                path.to.js.dist.dev + '/modules/**/*.js',
                // here i should add any new app files
            ])
            // prevent breaking errors
            .pipe($.plumber({
                errorHandler: config.error
            }))
            // dest app source files
            .pipe(gulp.dest(path.to.js.dist.prod + '/source/modules'))
            // concat all js files
            .pipe($.concat('scripts.js', {
                newLine: '\r\n'
            }))
            // dest unminified app file
            .pipe(gulp.dest(path.to.js.dist.prod))
            // initialize sourcemaps before minify
            .pipe($.sourcemaps.init())
            // minify
            .pipe($.uglify({
                output: {
                    beautify: false,
                    preamble: `/*!
 * Joo Template
 * Niche Multi-Purpose HTML Template.
 *
 * @package   Joo_Template
 * @author    Jozoor [jozoor.com]
 * @link      https://themeforest.net/user/jozoor/portfolio
 * @copyright 2019 Jozoor [jozoor.com]
 * @license   https://themeforest.net/licenses/standard
 *
 */
`}
            }))
            // rename files
            .pipe($.rename(
                config.css.renameOptions // options
            ))
            // writing sourcemaps for minified file
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest(path.to.js.dist.prod));

    });

    // start copy custom file to prod folder task
    gulp.task(config.task.build + ':copyCustomJs', 'copy custom file to prod folder', function() {

        return gulp.src([
                // order css files for concat
                path.to.js.dist.dev + '/custom.js'
            ])
            // dest app source files
            .pipe(gulp.dest(path.to.js.dist.prod));

    });


    // main js task
    gulp.task(config.task.build + ':js', 'main js scripts task', function(cb) {

        $.runSequence(
            config.task.build + ':jsVendor',
            config.task.build + ':jsApp',
            config.task.build + ':copyCustomJs',
            cb
        );

    });

};