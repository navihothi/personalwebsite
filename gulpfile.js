const gulp = require('gulp') //knows to look into node_modules
const minify = require('gulp-babel-minify');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');


/*
-- TOP LEVEL FUNCTIONS
gulp.task = define tasks
gulp.src = point to the files to use
gulp.dest = point to the folder to output
gulp.watch = watch filesand folders for changes
*/

// LOGS MESSAGE
gulp.task('message', () => {
    return console.log('Gulp is running ...');
});

// COPY ALL HTML FILES
gulp.task('copyHtml', () =>{
    gulp.src('*.html')
        .pipe(gulp.dest('dist'));
});

// OPTIMIZE IMAGES
gulp.task('imageMin', () =>
	gulp.src('assets/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
);

// MINIFY JS
gulp.task('minify', () => {
    gulp.src('javascript/*.js')
    .pipe(minify({
        mangle: {
          keepClassName: true
        }
      }))
        .pipe(gulp.dest('dist/javascript/'))
});

// COMPILE SASS
gulp.task('sass', () => {
    gulp.src('css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('default', ['message', 'copyHtml', 'imageMin', 'minify', 'sass'])


//before any of the other tasks run for gulp watch, the default runs 
//tasks that need to run before gulp watch takes place
gulp.task('watch', ['default'],() => {
    gulp.watch('javascript/*.js', ['minify']);
    gulp.watch('assets/images/*', ['imageMin']);
    gulp.watch('css/*.scss', ['sass']);
    gulp.watch('*.html', ['copyHtml']);
})