var gulp = require('gulp');
var concat  = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var livereload = require('gulp-livereload');
var babel = require('gulp-babel');

gulp.task('minifyjs', function() {
	return gulp.src('src/js/*.js')
			.pipe(babel({
            	presets: ['@babel/env']
        	}))
			.pipe(concat('built.js'))
			.pipe(gulp.dest('dist/js'))
			.pipe(rename({suffix:'.min'}))
			.pipe(uglify())
			.pipe(gulp.dest('dist/js'))
			.pipe(livereload());
});

gulp.task('lessTask', function() {
	return gulp.src('src/less/*.less')
			.pipe(less())
			.pipe(gulp.dest('src/css'))
			.pipe(livereload());
});

gulp.task('cssTask', ['lessTask'], function() {
	return gulp.src('src/css/*.css')
			.pipe(concat('built.css'))
			.pipe(gulp.dest('dist/css'))
			.pipe(rename({suffix: '.min'}))
			.pipe(cleanCSS({compatibility: 'ie8'}))
			.pipe(gulp.dest('dist/css'))
			.pipe(livereload());
});


gulp.task('default', ['minifyjs', 'cssTask']);

gulp.task('watch', ['default'], function () {
	livereload.listen();

	gulp.watch('src/js/*.js', ['minifyjs'])

	gulp.watch(['src/css/*.css', 'src/less/*.less'], ['cssTask', 'lessTask']);
})