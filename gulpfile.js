gulp = require('gulp');
babel = require('gulp-babel');
eslint = require('gulp-eslint');
concat = require('gulp-concat');
minify = require('gulp-minify');
sass = require('gulp-sass');
csscomb = require('gulp-csscomb');
cleanCSS = require('gulp-clean-css');
autoprefixer = require('gulp-autoprefixer');

gulp.task('scripts:transpile', function() {
  return gulp.src([
    './src/js/Auth.js',
    './src/js/Messages.js',
    './src/js/Aes.js',
    './src/js/Profile.js',
    './src/js/jabberwocky.js'
  ])
  .pipe(babel({ presets: ['es2015'] }))
  .pipe(concat('jabberwocky.js'))
  .pipe(gulp.dest('./build'));
});

gulp.task('scripts:minify', ['scripts:transpile'], function() {
  return gulp.src('./build/jabberwocky.js')
  .pipe(minify({
    ext: { min: '.min.js' }
  }))
  .pipe(gulp.dest('./public/js'));
});

gulp.task('scripts:watch', function() {
  gulp.watch('./src/js/*.js', ['scripts:transpile', 'scripts:minify']);
});

gulp.task('css:scss', function() {
  return gulp.src('./src/scss/*.scss')
  .pipe(sass()
    .on('error', sass.logError))
  .pipe(csscomb())
  .pipe(autoprefixer({
    browsers: ['last 4 versions'],
    cascade: false
  }))
  .pipe(cleanCSS())
  .pipe(concat('jabberwocky.css'))
  .pipe(gulp.dest('./src/css'));
});

gulp.task('css:minify', function() {
  // add later
});
