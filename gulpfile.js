/* eslint-disable no-undef */
const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const htmlmin = require('gulp-htmlmin');

gulp.task('server', () => {

    browserSync({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', () => gulp.src("src/sass/**/*.+(scss|sass)")
    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(rename({
        suffix: '.min',
        prefix: ''
    }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({
        compatibility: 'ie8'
    }))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream()));

gulp.task('watch', () => {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
});

gulp.task('html', () => gulp.src("src/*.html")
    .pipe(htmlmin({
        collapseWhitespace: true
    }))
    .pipe(gulp.dest("dist/")));

gulp.task('fonts', () => gulp.src("src/fonts/**/*")
    .pipe(gulp.dest("dist/fonts")));

gulp.task('images', () => gulp.src("src/img/**/*")
    .pipe(gulp.dest("dist/img")));

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'fonts', 'html', 'images'));