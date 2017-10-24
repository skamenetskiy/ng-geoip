'use strict';

const gulp   = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

gulp.task('default', () => {
    gulp
        .src('ng-geoip.js')
        .pipe(concat('ng-geoip.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(''));
});
