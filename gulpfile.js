// Define variables.
var autoprefixer = require('autoprefixer');
var browserSync  = require('browser-sync').create();
var cleancss     = require('gulp-clean-css');
var concat       = require('gulp-concat');
var del          = require('del');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var imagemin     = require('gulp-imagemin');
var notify       = require('gulp-notify');
var postcss      = require('gulp-postcss');
var run          = require('gulp-run');
var runSequence  = require('run-sequence');
var sass         = require('gulp-ruby-sass');
var uglify       = require('gulp-uglify');
var paths        = require('./gulpfile.paths');

require('./gulpfile.editor')();
require('./gulpfile.git')();


/*
 * @task: gulp - default task, build and serve the site.
 * @task: gulp clean - remove all expendable files (/assets/ and /_site/).
 */


/*
 * Build styles
 */
gulp.task('build:styles:prod', function() {
    return sass(paths.sassFiles + '/main.scss', {
            style: 'compressed',
            trace: true,
            loadPath: [paths.sassFiles]
        })
        .pipe(postcss([autoprefixer({ browsers: ['last 2 versions', 'ie >= 10'] })]) )
        .pipe(cleancss())
        .pipe(gulp.dest(paths.includesDir))
        .on('error', gutil.log);
});

gulp.task('build:styles', ['build:styles:prod'], function() {
    return sass(paths.sassFiles + '/main.scss', {
        style: 'expanded',
        lineNumbers: true,
        container: 'gulp-ruby-sass',
        trace: true,
        loadPath: [paths.sassFiles]
    })
      .pipe(postcss([autoprefixer({ browsers: ['last 2 versions', 'ie >= 10'] })]) )
      .pipe(gulp.dest(paths.jekyllCssFiles))
      .pipe(gulp.dest(paths.siteCssFiles))
      .pipe(browserSync.stream())
      .on('error', gutil.log);
});



/*
 * Build scripts
 */
var scripts = [paths.jsFiles + '/lib/blazy.min.js', paths.jsFilesGlob];

gulp.task('build:scripts:prod', function() {
    return gulp.src(scripts)
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.includesDir))
        .on('error', gutil.log);
});

gulp.task('build:scripts', ['build:scripts:prod'], function() {
    return gulp.src(scripts, { base: paths.jsFiles })
        .pipe(gulp.dest(paths.jekyllJsFiles))
        .pipe(gulp.dest(paths.siteJsFiles))
        .on('error', gutil.log);
});



/*
 * Build images
 */
gulp.task('build:images', function() {
    return gulp.src(paths.imageFilesGlob)
        .pipe(imagemin({
            verbose: true
        }))
        .pipe(gulp.dest(paths.jekyllImageFiles))
        .pipe(gulp.dest(paths.siteImageFiles))
        .pipe(browserSync.stream());
});



/*
 * Build fonts 
 */
gulp.task('build:fonts', function() {
    return gulp.src(paths.fontFiles + '/*/**.*')
        .pipe(gulp.dest(paths.jekyllFontFiles))
        .pipe(gulp.dest(paths.siteFontFiles))
        .pipe(browserSync.stream())
        .on('error', gutil.log);
});



/*
 * Buil Jekyll
 */
gulp.task('build:jekyll', function() {
    return gulp.src('')
        .pipe(run('bundle exec jekyll build --config _config.yml,_config.dev.yml'))
        .on('error', gutil.log);
});



/*
 * Clean task
 */
gulp.task('clean', function(callback) {
    del(['_site', 'assets', '_includes/assets']);
    callback();
});



/*
 * Reload browser
 */
gulp.task('reload', function (callback) {
    browserSync.reload();
    callback();
});



/*
 * Static Server + file watchers.
 */
gulp.task('gulp:watch', function() {
    browserSync.init({
        port: 4500,
        server: paths.siteDir,
        ghostMode: true,
        logFileChanges: false,
        open: false,
        notify: false,
        host: "192.168.0.18"
    });

    // Watch html and markdown files.
    gulp.watch(['**/*.+(html|md|markdown|MD|svg|yml|yaml|csv|json)', '!_site/**/*.*'], ['build:jekyll', 'reload']);

    // Watch .scss files; changes are piped to browserSync.
    gulp.watch('_assets/styles/**/*.scss', ['build:styles']);

    // Watch .js files.
    gulp.watch('_assets/js/**/*.js', ['build:scripts', 'reload']);

    // Watch images files.
    gulp.watch('_assets/img/**/*.**', ['build:images', 'reload']);
});



/*
 * Build task
 */
gulp.task('default', function(callback) {
    runSequence(
        'clean',
        'git:pull',
        ['build:styles',
        'build:scripts', 
        'build:images', 
        'build:fonts'],
        'build:jekyll',
        'gulp:watch',
        'ee:open',
        callback);
});


/*
 * Update task
 */
gulp.task('bundler', function() {
    return gulp.src('')
        .pipe(run('bundle install'))
        .pipe(run('bundle update'))
        .pipe(notify({ message: 'Bundle Update Complete' }))
        .on('error', gutil.log);
});

