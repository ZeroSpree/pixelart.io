var gulp = require('gulp');
var git = require('gulp-git');
var runSequence = require('run-sequence');

module.exports = function() {

    gulp.task('git:pull', function() {
        git.pull('origin', 'master', function(err) {
            if (err)
                throw err;
        });
    });

    gulp.task('git:all', function() {
        return gulp
            .src('.')
            .pipe( git.add() )
            .pipe( git.commit('JekyllCMS Publish') )
            .pipe( git.push('origin', 'master', function(err) {
                if (err) throw err;
            }) );
    });

    gulp.task('git:publish', function() {
        runSequence('build', 'git:all', 'rebuild');
    });

}