var gulp         = require('gulp');
var runSequence  = require('run-sequence');
var open         = require('gulp-open');
var nodemon      = require('gulp-nodemon');
var sass         = require('gulp-ruby-sass');
var postcss      = require('gulp-postcss');
var cleancss     = require('gulp-clean-css');
var autoprefixer = require('autoprefixer');
var os           = require('os')

module.exports = function() {

    /*
     * Styles
     */
    gulp.task('ee:build:styles', function() {
        return sass('_editor/styles/main.scss', {
            style: 'expanded',
            lineNumbers: true,
            container: 'gulp-ruby-sass',
            trace: true,
            loadPath: ['_editor/styles/']
        })
          .pipe(postcss([autoprefixer({ browsers: ['last 2 versions', 'ie >= 10'] })]) )
          .pipe(gulp.dest('_editor/styles/min'));
    });

    /*
     * Start Server
     */
    gulp.task('ee:build:server', function(cb) {
        var called = false;

        return nodemon({
                script : './_editor/server/app.js',
                ignore : ['_site/', 'node_modules/']
            }).on('start', function() {
                if (!called) {
                    called = true;
                    cb();
                }
            });
    });

    /*
     * Open Editor
     */
    var browser = os.platform() === 'linux' ? 'google-chrome' : (
      os.platform() === 'darwin' ? 'google chrome' : (
      os.platform() === 'win32' ? 'chrome' : 'firefox'));

    gulp.task('ee:build:open', function() {
        gulp.src('./').pipe(open({
            uri : 'http://localhost:3000',
            app : browser
        }));
    });

    /*
     * Express Server + watch SCSS
     * Initialize Editor
     */
    gulp.task('ee:build', function(callback) {
        runSequence(['ee:build:server', 'ee:build:styles'], callback);

        // Watch .scss files.
        gulp.watch('_editor/styles/**/*.scss', ['ee:build:styles']);
    });

    /*
     * Express Server + watch SCSS
     * Initialize Editor
     */
    gulp.task('ee:open', function(callback) {
        runSequence('ee:build', 'ee:build:open', callback);

        // Watch .scss files.
        gulp.watch('_editor/styles/**/*.scss', ['ee:build:styles']);
    });

}