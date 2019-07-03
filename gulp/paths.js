// gulp/paths.js

// base paths
var src    = './source/',
    dist   = './dist/', // for rtl version just change 'Default' to 'RTL'
    dev    = '_dev/',
    prod   = 'Template/',
    assets = 'assets/';

// taks paths
module.exports = {
    to: {

    	// dest folders
        dist: {
            dev: dist + dev,
            prod: dist + prod,
            main: dist
        },
        dev: dev,
        prod: prod,

        // nunjucks files
        nunjucks: {
            config: src + 'templates/',
            src: [
                src + 'templates/**/*.{html,nunjucks}',
                '!' + src + 'templates/_data/**/*.{html,nunjucks}',
                '!' + src + 'templates/_includes/**/*.{html,nunjucks}',
                '!' + src + 'templates/_layouts/**/*.{html,nunjucks}'
            ],
            // for watch task not render
            watch: src + 'templates/**/*.+(html|nunjucks|json)'
        },

        // sass files
        sass: {
            src: [
                src + 'scss/**/*.{scss,sass}',
                '!' + src + 'scss/vendor/lib/**/*.{scss,sass}'
            ],
            vendor: src + 'scss/vendor/lib/',
            bulma: src + 'scss/vendor/lib/bulma/',
            dist: {
                dev: dist + dev + assets + 'css',
                prod: dist + prod + assets + 'css'
            }
        },

        // js files
        js: {
            src: {
                main: src + 'js/main.js',
                copy: src + 'js/**/*.js'
            },
            watch: [
                src + 'js/*.js',
                src + 'js/**/*.js'
            ],
            vendor: src + 'js/vendor/',
            dist: {
                dev: dist + dev + assets + 'js',
                prod: dist + prod + assets + 'js'
            }
        },

        // images
        images: {
            src: src + 'images/**/*',
            logo: src + 'images/logo/logo.png', // change it depend on logo name
            vendor: src + 'images/',
            dist: {
                favicons: dist + dev + assets + 'images/favicons',
                dev: dist + dev + assets + 'images',
                prod: dist + prod + assets + 'images'
            }
        },

        // fonts
        fonts: {
            src: src + 'fonts/**/*',
            vendor: src + 'fonts/vendor/',
            dist: {
                dev: dist + dev + assets + 'fonts',
                prod: dist + prod + assets + 'fonts'
            }
        }

    }
};
