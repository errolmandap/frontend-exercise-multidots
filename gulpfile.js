var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var useref = require('gulp-useref');
var terser = require('gulp-terser');
var gulpIf = require('gulp-if');
var babel = require('gulp-babel');
var imageMin = require('gulp-imagemin');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var sourceMaps = require('gulp-sourcemaps');
var autoPrefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

var dir = {
  src: 'src/',
  public: 'public/',
};

/* Development */

// Compile SASS
gulp.task('sass', function() {
  return gulp.src(dir.src + 'styles/*.scss')
    .pipe(sourceMaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoPrefixer())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(rename('main.min.css'))
    .pipe(sourceMaps.write('../styles'))
    .pipe(gulp.dest(dir.src + 'styles/'))
    .pipe(browserSync.stream());
});

gulp.task('dev', function() {
  browserSync.init({
    server: './src',
    port: 3000
  });

  //use gulp.watch to trigger server actions(notify, start or stop)
  gulp.watch(dir.src + 'styles/**/*.scss', gulp.series('sass'));
  gulp.watch([ dir.src + '*.html', dir.src + 'scripts/modules/**/*.js']).on('change', browserSync.reload);
});

/* Build */

gulp.task('clean', function() {
  return gulp.src(dir.public, {allowEmpty: true})
    .pipe(clean({force: true}));
});

// Transfer Dev Files to Public Folder
gulp.task('copy-css', function() {
  return gulp.src(dir.src + 'styles/main.min.css')
    .pipe(gulp.dest(dir.public + 'styles/'));
});

gulp.task('copy-fonts', function() {
  return gulp.src(dir.src + 'assets/fonts/**/*')
    .pipe(gulp.dest(dir.public + 'assets/fonts/'));
});

// Minify Images
gulp.task('imageMin', function() {
  return gulp.src(dir.src + 'assets/images/*')
      .pipe(imageMin())
      .pipe(gulp.dest(dir.public + 'assets/images'));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src(dir.src + '*.html')
    .pipe(useref())
    .pipe(gulpIf(dir.src + 'scripts/modules/*.js', babel({
      presets: ['babel-preset-env']
    })))
    .pipe(gulpIf('*.js', terser()))
    .pipe(gulp.dest(dir.public));
});

gulp.task('build', gulp.series('clean', gulp.parallel('copy-css', 'copy-fonts', 'imageMin'), 'scripts'));

/* Default Task */

gulp.task('default', gulp.series('dev'));