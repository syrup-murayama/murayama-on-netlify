// gulp/tasks/build/images.js

// ----------------------------------
// available tasks: 
//    'gulp build:images' : main images task
// ----------------------------------
// plugins:
//     gulp-imagemin    : $.imagemin
//     gulp-changed     : $.changed
//     gulp-newer       : $.newer
//     gulp-plumber     : $.plumber
//     imagemin-pngquant: $.pngquant
// ----------------------------------
// config:
//     config.task.build : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // copy and minify images to prod folder
    gulp.task(config.task.build + ':images', 'copy and minify images to prod folder', function() {

        return gulp.src(path.to.images.dist.dev + '/**/*')
            // prevent breaking errors
            .pipe($.plumber({
                errorHandler: config.error
            }))
            // only pass through changed files
            .pipe($.changed(path.to.images.dist.prod + '/**/*'))
            // only pass through newer source files
            .pipe($.newer(path.to.images.dist.prod + '/**/*'))
            // minify images
            // .pipe($.imagemin(
            //     config.images.imageminOptions // options
            // ))
            .pipe(gulp.dest(path.to.images.dist.prod));

    });

};