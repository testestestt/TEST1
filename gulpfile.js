var gulp = require("gulp"),
sass = require('gulp-sass')(require('sass')),
postcss = require('gulp-postcss'),
cssnano = require('cssnano'),
autoprefixer = require('autoprefixer'),
sourcemaps = require('gulp-sourcemaps'),
browserSync = require("browser-sync").create();

function style() {
    return gulp.src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ quiet: true }).on('error', sass.logError))
    .pipe(postcss([ autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./partials/*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.watch = watch;