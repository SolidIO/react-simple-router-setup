var gulp = require('gulp'),
	connect = require('gulp-connect'),
	open = require('gulp-open'),
	browserify = require('gulp-browserify'),
	concat = require('gulp-concat'),
	watch = require('gulp-watch'),
	livereload = require('gulp-livereload'),
	port = process.env.port || 3031;

gulp.task('browserify', function() {
	gulp.src('./app/src/js/main.js')
		.pipe(browserify({transform: 'reactify'}))
		.pipe(gulp.dest('./app/dist/js'));
});

// Launch browser in a port
gulp.task('open', function() {
	var options = {
		uri: 'http://localhost:' + port
	};
	gulp.src('./app/index.html')
	.pipe(open(options));
});

// Live reload local server
gulp.task('connect', function() {
	connect.server({
		root: 'app',
		livereload: true,
		port: port
	});
});

// Live reload js
gulp.task('js', function() {
	gulp.src('./app/dist/**/*.js')
	.pipe(livereload({ start: true }));
});

// Live reload html
gulp.task('html', function() {
	gulp.src('./app/*.html')
	.pipe(livereload({ start: true }));
});

// Watch files for live reload
gulp.task('watch', function() {
	livereload.listen();
	gulp.watch(['./app/dist/js/*.js'], ['js']);
	gulp.watch(['./app/index.html'], ['html']);
	gulp.watch(['./app/src/js/**/*.js'], ['browserify']);
});

gulp.task('default', ['browserify']);

gulp.task('serve', ['browserify', 'connect', 'open', 'watch']);