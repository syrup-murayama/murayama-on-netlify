// gulp/tasks/base/watch.js

// ----------------------------------
// watch tasks: 
//    sass
//    js scripts
//    nunjucks
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    gulp.task('watch', 'watch files when changes', function() {
        gulp.watch(path.to.sass.src, [config.task.sass]);
        gulp.watch(path.to.js.watch, [config.task.scripts]);
        gulp.watch(path.to.nunjucks.watch, [config.task.nunjucks]);
    });

};