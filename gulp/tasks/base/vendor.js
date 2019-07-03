// gulp/tasks/base/vendor.js

// ----------------------------------
// available tasks: 
//    'gulp vendor'       : main task
//    'gulp vendor:js'    : dest js files
//    'gulp vendor:scss'  : dest scss files
//    'gulp vendor:css'   : dest css files
//    'gulp vendor:fonts' : dest fonts
//    'gulp vendor:clean' : clean before dest
// ----------------------------------
// plugins:
//     main-yarn-files : $.mainYarnFiles
//     gulp-flatten    : $.flatten
//     del             : $.del
//     run-sequence    : $.runSequence
//     gulp-cached     : $.cached
//     gulp-rename     : $.rename
// ----------------------------------
// config:
//     config.task.vendor : task name
// ----------------------------------

module.exports = function(gulp, $, path, config) {

    // clean folders and files
    gulp.task(config.task.vendor + ':clean', 'clean before copy files', function() {

        return $.del([
            path.to.js.vendor + '**/*',
            path.to.sass.vendor,
            path.to.fonts.vendor + '**/*'
        ],
        { force: true } // Allow deleting the current working directory and outside.
        );

    });

    // copy JS files
    gulp.task(config.task.vendor + ':js', 'copy js files', function() {

        return gulp.src(
                $.mainYarnFiles(config.mainYarnFiles.options.js) // options
            )
            .pipe($.cached('vendorJs')) // start cache
            .pipe($.flatten()) // replace relative path for files
            .pipe(gulp.dest(path.to.js.vendor));

    });

    // copy bulma sass files
    gulp.task(config.task.vendor + ':bulma:sass', 'copy bulma sass files', function() {

        return gulp.src(
                config.mainYarnFiles.options.scss.bulma.src // options
            )
            .pipe($.cached('vendorBulmaSass')) // start cache
            .pipe(gulp.dest(path.to.sass.vendor + 'bulma'));

    });

    // copy flag-icon flags svg images
    gulp.task(config.task.vendor + ':flags:svg', 'copy flag-icon flags images', function() {

        return gulp.src(
                config.mainYarnFiles.options.images.flagIcon.src // options
            )
            .pipe($.cached('vendorFlagsSvg')) // start cache
            .pipe(gulp.dest(path.to.images.vendor + 'flags'));

    });

    // copy css files
    gulp.task(config.task.vendor + ':css', 'copy css files', function() {

        return gulp.src(
                $.mainYarnFiles(config.mainYarnFiles.options.css) // options
            )
            .pipe($.cached('vendorCss')) // start cache
            .pipe($.flatten()) // replace relative path for files
            // rename files
            .pipe($.rename(
                config.mainYarnFiles.rename // options
            ))
            .pipe(gulp.dest(path.to.sass.vendor));

    });

    // copy fonts
    gulp.task(config.task.vendor + ':fonts', 'copy all fonts', function() {

        return gulp.src(
                $.mainYarnFiles(config.mainYarnFiles.options.fonts) // options
            )
            .pipe($.cached('vendorFonts')) // start cache
            .pipe(gulp.dest(path.to.fonts.vendor));

    });

    // main vendor task
    gulp.task(config.task.vendor, 'copy all vendor dependencies to source folder', function(cb) {

        $.runSequence(
            config.task.vendor + ':clean', 
            [
                config.task.vendor + ':js',
                config.task.vendor + ':bulma:sass',
                config.task.vendor + ':flags:svg',
                config.task.vendor + ':css',
                config.task.vendor + ':fonts'
            ],
            cb
        );

    });

};