'use strict';

var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );
var comb = require('gulp-csscomb');
var autoprefixer = require('gulp-autoprefixer');
var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );
var notify = require('gulp-notify');

// Compile and autoprefix SASS
gulp.task('sass', function () {
	return gulp.src('./sass/**/*.scss')
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('./build'));
});

// Beautify and format CSS
gulp.task('comb', ['sass'], function() {
	return gulp.src('./build/*.css')
	.pipe(comb())
	.pipe(gulp.dest('./build/'));
});

gulp.task( 'deploy', ['sass', 'comb'], function () {

	var conn = ftp.create( {
		host:     'host.tld',
		user:     'user.host.tld',
		password: 'securepassword',
		parallel: 3,
		log:      gutil.log
	} );

	var globs = [
		'./build/*.css'
	];

	// turn off buffering in gulp.src for best performance 
	return gulp.src( globs, { 
			base: './build', 
			buffer: false
		} )
		.pipe( conn.dest( '/wp-content/themes/adsulting/css/' ) )
		.pipe(notify("Gulp upload finished!"));
} );

gulp.task('default',['sass', 'comb', 'deploy'], function() {
	gulp.watch('./sass/**/*.scss', ['sass', 'comb', 'deploy']);
});