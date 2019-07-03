// gulp/tasks/default/scripts.js

// ----------------------------------
// available tasks: 
//    'gulp js'            : main js task
//    'gulp js:copySrc'    : copy source js files
// ----------------------------------
// plugins:
//     browser-sync       : $.browserSync
// ----------------------------------
// config:
//     config.task.scripts : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // split out commonly used stream chains [ changed - newer - cached ]
    var cacheFiles = $.lazypipe()
        // only pass through changed files
        .pipe($.changed, path.to.js.dist.dev + '/**/*.js')
        // only pass through newer source files
        .pipe($.newer, path.to.js.dist.dev + '/**/*.js')
        // start cache
        .pipe($.cached, 'jsfiles');

    // copy source js files to build/dev
    gulp.task(config.task.scripts + ':copySrc', 'copy source js files to build/dev', function() {

        return gulp.src(path.to.js.src.copy)
            // prevent breaking errors
            .pipe($.plumber({
                errorHandler: config.error
            }))
            // only pass through changed & newer & not cached files
            // .pipe(cacheFiles())
            .pipe(gulp.dest(path.to.js.dist.dev))
            .pipe($.browserSync.reload({
                stream: true
            }));

    });

    // main js task
    gulp.task(config.task.scripts, 'main js task', function(cb) {

        $.runSequence(
            config.task.scripts + ':copySrc',
            cb
        );

    });

};