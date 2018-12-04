var gulp = require('gulp');
var argv = require('yargs').argv;
var git = require('gulp-git');
var runSequence = require('run-sequence');

module.exports = function() {

    gulp.task('git:pull', function(){
      git.pull('origin', 'master', function (err) {
        if (err) throw err;
      });
    });

    gulp.task('git:add', function() {
        return gulp.src('.').pipe(git.add());
    });

    gulp.task('git:commit', function() {
        return gulp.src('.').pipe(git.commit('JekyllCMS Publish'));
    });

    gulp.task('git:push', function(){
        git.push('origin', 'master', function (err) {
            if (err) throw err;
        });
    });

    gulp.task('git:publish', function() {
        runSequence(
            'build', 
            'git:add', 
            'git:commit', 
            'git:push', 
            'rebuild');
    });

}