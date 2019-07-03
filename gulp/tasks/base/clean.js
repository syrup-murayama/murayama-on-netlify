// gulp/tasks/base/clean.js

// ----------------------------------
// available tasks: 
//    'gulp clean'       : clean build folder & caches
//    'gulp clean:prod'  : clean dist folder enough
//    'gulp clean:cache' : clear all caches enough
// ----------------------------------
// plugins:
//     del        : $.del
//     gulp-cached: $.cached
// ----------------------------------
// config:
//     config.task.clean : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // clear all caches enough
    gulp.task(config.task.clean + ':cache', 'clear all caches enough', function() {
        $.cached.caches = {};
    });

    // delete production folder [build/dist]
    gulp.task(config.task.clean + ':prod', 'delete production folder [build/prod]', function() {

        return $.del([
            path.to.dist.prod
        ],
        { force: true } // Allow deleting the current working directory and outside.
        );

    });

    // delete build folder [build] and clear all caches
    gulp.task(config.task.clean, 'delete build folder [build] and clear all caches \n', [config.task.clean + ':cache', config.task.vendor + ':clean'], function() {

        return $.del([
            path.to.dist.main + '*',
            // this file created from images:favicons task
            // in source/templates/_includes/ >> default [favicons.nunjucks]
            config.images.faviconsOptions.html,
            // in source/images/
            path.to.images.vendor + 'flags'
        ],
        { force: true } // Allow deleting the current working directory and outside.
        );

    });

};