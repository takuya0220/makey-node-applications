var gulp = require('gulp');
var pug = require('gulp-pug');
var less = require('gulp-less');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('html', function() {
    return gulp.src('client/templates/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('build/html'))
});

gulp.task('css', function() {
    return gulp.src('public/stylesheets/*')
        .pipe(minifyCSS())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('public/stylesheets'))
});

gulp.task('sass', function() {
    return gulp.src('node_modules/bootstrap/scss/bootstrap.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/stylesheets/'));
});

gulp.task('js', function() {
    return gulp.src(['node_modules/jquery/dist/jquery.slim.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/javascripts'))
});

gulp.task('default', ['html', 'sass', 'css', 'js']);
