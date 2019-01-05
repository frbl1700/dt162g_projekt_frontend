const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', function() {
   var task = gulp.src('src/assets/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public'));

    return task;
});

gulp.task('watcher', function() {
    gulp.watch('src/assets/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.series(['sass', 'watcher']));