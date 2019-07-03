// gulp/tasks/default/images.js

// ----------------------------------
// available tasks: 
//    'gulp images'            : main images task
//    'gulp images:copyImages' : copy images
//    'gulp images:favicons'   : generate favicons
// ----------------------------------
// plugins:
//     gulp-changed     : $.changed
//     gulp-newer       : $.newer
//     gulp-plumber     : $.plumber
//     gulp-favicons    : $.favicons
// ----------------------------------
// config:
//     config.task.images : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // require the ES5 file from gulp-favicons 
    var favicons = require('gulp-favicons/es5');

    // copy images task
    gulp.task(config.task.images + ':copyImages', 'copy images', function() {

        return gulp.src(path.to.images.src)
            // prevent breaking errors
            .pipe($.plumber({
                errorHandler: config.error
            }))
            // only pass through changed files
            .pipe($.changed(path.to.images.dist.dev + '/**/*'))
            // only pass through newer source files
            .pipe($.newer(path.to.images.dist.dev + '/**/*'))
            .pipe(gulp.dest(path.to.images.dist.dev));

    });

    // generate favicons task
    gulp.task(config.task.images + ':favicons', 'generate favicons', function() {

        return gulp.src(path.to.images.logo)
            // prevent breaking errors
            .pipe($.plumber({
                errorHandler: config.error
            }))
            // generate favicons
            .pipe(favicons(
                config.images.faviconsOptions // options
            ))
            .pipe(gulp.dest(path.to.images.dist.favicons));

    });

    // main images task
    gulp.task(config.task.images, 'main images task', function(cb) {

        $.runSequence(
            config.task.images + ':copyImages',
            config.task.images + ':favicons',
            cb
        );

    });

};