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
 * @task: gulp - default task, serve the site in a dev environment.
 * @task: gulp build - build process for prod environment, all assets minified.
 * @task: gulp clean - remove all expendable files (/assets/ and /_site/).
 */

/*
 * Handle SCSS styles
 */

// Production build
// Process styles, add vendor prefixes, minify, output to the appropriate location.
gulp.task('build:styles', function() {
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

// Local build
// Process styles with line numbers, add vendor prefixes, output to the appropriate location.
gulp.task('build:styles:local', ['build:styles'], function() {
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
 * Handle scripts
 */

var scripts = [paths.jsFiles + '/lib/zepto.min.js', paths.jsFiles + '/lib/blazy.min.js', paths.jsFilesGlob];

// Concatenate library scripts, uglify, output to the appropriate location.
// include jQuery first
gulp.task('build:scripts', function() {
    return gulp.src(scripts)
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.includesDir))
        .on('error', gutil.log);
});

gulp.task('build:scripts:local', ['build:scripts'], function() {
    return gulp.src(scripts, { base: paths.jsFiles })
        .pipe(gulp.dest(paths.jekyllJsFiles))
        .pipe(gulp.dest(paths.siteJsFiles))
        .on('error', gutil.log);
});


/*
 * Handle images
 */

// Optimize and copy image files to the appropriate location.
gulp.task('build:images', function() {
    return gulp.src(paths.imageFilesGlob)
        .pipe(imagemin({
            verbose: true
        }))
        .pipe(gulp.dest(paths.jekyllImageFiles))
        .pipe(gulp.dest(paths.siteImageFiles))
        .pipe(browserSync.stream());
});

gulp.task('build:images:local', function() {
    return gulp.src(paths.imageFilesGlob)
        .pipe(gulp.dest(paths.jekyllImageFiles))
        .pipe(gulp.dest(paths.siteImageFiles))
        .pipe(browserSync.stream());
});


/*
 * Handle font files
 */

// Copy font  files to the appropriate location.
gulp.task('build:fonts', function() {
    return gulp.src(paths.fontFiles + '/*/**.*')
        .pipe(gulp.dest(paths.jekyllFontFiles))
        .pipe(gulp.dest(paths.siteFontFiles))
        .pipe(browserSync.stream())
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
 * Build task
 */

// Runs jekyll build command.
gulp.task('build:jekyll', function() {
    return gulp.src('')
        .pipe(run('bundle exec jekyll build --config _config.yml'))
        .on('error', gutil.log);
});

// Runs jekyll build command using local config.
gulp.task('build:jekyll:local', function() {
    return gulp.src('')
        .pipe(run('bundle exec jekyll build --config _config.yml,_config.dev.yml'))
        .on('error', gutil.log);
});

// Builds site anew using local config.
gulp.task('build:local', function(callback) {
    runSequence(
        'git:pull',
        'clean',
        ['build:scripts:local', 
        'build:images:local', 
        'build:styles:local', 
        'build:fonts'],
        'build:jekyll:local',
        callback);
});

// Special tasks for building and then reloading BrowserSync.
gulp.task('build:jekyll:watch', ['build:jekyll:local'], function(callback) {
    browserSync.reload();
    callback();
});

gulp.task('build:scripts:watch', ['build:scripts:local'], function(callback) {
    browserSync.reload();
    callback();
});

gulp.task('build:images:watch', ['build:images:local'], function(callback) {
    browserSync.reload();
    callback();
});

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

    // Watch site settings.
    gulp.watch(['_config.yml', '_config.dev.yml'], ['build:jekyll:watch']);

    // Watch .scss files; changes are piped to browserSync.
    gulp.watch('_assets/styles/**/*.scss', ['build:styles:local']);

    // Watch images files; changes are piped to browserSync.
    gulp.watch('_assets/img/**/*.**', ['build:images:watch']);

    // Watch .js files.
    gulp.watch('_assets/js/**/*.js', ['build:scripts:watch']);

    // Watch html and markdown files.
    gulp.watch(['**/*.+(html|md|markdown|MD|svg)', '!_site/**/*.*'], ['build:jekyll:watch']);

    // Watch data files.
    gulp.watch('_data/**.*+(yml|yaml|csv|json)', ['build:jekyll:watch']);
});


// Static Server + watching files.
// Note: passing anything besides hard-coded literal paths with globs doesn't
// seem to work with gulp.watch().
gulp.task('default', function(callback) {
    runSequence('build:local', 'ee:open', 'gulp:watch', callback);
});

// Rebuild after publish action
gulp.task('rebuild', function(callback) {
    runSequence('build:local', 'ee:build', 'gulp:watch', callback);
});


// Production build with minified assets
gulp.task('build', function(callback) {
    runSequence(
        'clean',
        ['build:scripts', 
        'build:images', 
        'build:styles', 
        'build:fonts'],
        'build:jekyll',
        callback);
});

// Updates Ruby gems
gulp.task('bundler', function() {
    return gulp.src('')
        .pipe(run('bundle install'))
        .pipe(run('bundle update'))
        .pipe(notify({ message: 'Bundle Update Complete' }))
        .on('error', gutil.log);
});

