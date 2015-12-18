var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    bower = require('gulp-bower'),
    replace = require('gulp-replace-path'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-minify-css'),
    browserSync = require('browser-sync'),
    brows = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    react = require('reactify'),
    del = require('del'),
    minifyHTML = require('gulp-minify-html'),
    reload = browserSync.reload;


/**
 * Cleaning dist/ folder
 */
gulp.task('clean', function(cb) {
    del(['./app/dist/**'], cb);
});

// Browserify js
gulp.task('browserify-js', function() {
    gulp.src('./app/src/js/main.js')
        .pipe(browserify({
            transform: 'reactify'
        }))
        .pipe(gulp.dest('./app/dist/js'));
});

// Browserify css
gulp.task('browserify-css', function() {
    gulp.src('./app/src/css/style.css')
        .pipe(gulp.dest('./app/dist/css'));
});

// Copy index and rename paths (for build)
gulp.task('copy-index-html', function() {
    gulp.src('./app/index.html')
        .pipe(replace('"dist/', '"'))
        .pipe(gulp.dest('./app/dist'));
});

// Move bower components
gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest('./app/dist/bower_components'));
});

/**
 * Running livereload server
 */
gulp.task('server', function() {
    browserSync({
        server: {
            baseDir: 'app'
        }
    });
});

// Live reload js
gulp.task('js', function() {
    gulp.src('./app/dist/**/*.js', browserSync.reload);
});


// Live reload html
gulp.task('html', function() {
    gulp.src('./app/*.html', browserSync.reload);
});

// Live reload css
gulp.task('css', function() {
    gulp.src('./app/dist/css/*.css', browserSync.reload);
});

// Minify js
gulp.task('minify:js', function() {
    return brows('./app/src/js/main.js')
        .transform(react)
        .bundle()
        .pipe(source('./main.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./app/dist/js'));
});

// Minify css
gulp.task('minify:css', function() {
    return gulp.src('./app/src/css/*.css')
        .pipe(concat('./style.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('./app/dist/css'));
});

// Minify html
gulp.task('minify:html', function() {
    var opts = {
        conditionals: true,
        spare: true
    };

    return gulp.src('./app/index.html')
        .pipe(replace('"dist/', '"'))
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('./app/dist'));
});

// Watch files for live reload
gulp.task('watch', function() {
    gulp.watch(['./app/dist/js/*.js'], ['js']);
    gulp.watch(['./app/index.html'], ['html']);
    gulp.watch(['./app/dist/css/*.css'], ['css']);
    gulp.watch(['./app/src/js/**/*.js'], ['browserify-js']);
    gulp.watch(['./app/src/css/*.css'], ['browserify-css']);
});

gulp.task('clean_dist', ['clean']);

gulp.task('default', ['bower', 'minify:html', 'minify:js', 'minify:css']);

gulp.task('serve', ['bower', 'browserify-js', 'browserify-css', 'server', 'watch']);