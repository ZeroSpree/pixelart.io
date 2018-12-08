var gulp = require('gulp');
var git = require('gulp-git');
var runSequence = require('run-sequence');

module.exports = function() {

    gulp.task('git:pull', function(callback){
      git.pull('origin', 'master', function (err) {
        if (err) throw err;

        callback();
      });
    });

    gulp.task('git:status', function(callback) {
        git.status({}, function (err, stdout) {
            if (err) throw err;
            callback();
          });
    });

    gulp.task('git:add', function(callback) {
        return gulp.src('.').pipe(git.add());
        callback();
    });

    gulp.task('git:commit', function(callback) {
        return gulp.src('.').pipe(git.commit('Automatic Deploy'));
        callback();
    });

    gulp.task('git:push', function(callback){
        git.push('origin', 'master', function (err) {
            if (err) throw err;
        });
    });

    gulp.task('git:publish', function() {
        runSequence(
            'git:status', 
            'git:add', 
            'git:commit', 
            'git:push');
    });

}