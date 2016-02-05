var
  $ = require('gulp-load-plugins')(),
  gulp = require('gulp'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload;

gulp.task('sass:dev', function () {
  gulp.src('./scss/simplui.scss')
    .pipe($.sass({
      outputStyle: 'expanded',
      sourcemapPath: '../scss',
    }).on('error', $.sass.logError))
    .pipe(gulp.dest('./docs/css'))
    .pipe(reload({stream: true}));
    //.pipe($.livereload());
});

gulp.task('watch',function(){
  //$.livereload.listen({start: true});
  // Watch .scss files
  browserSync({
    server: './docs'
  });

  gulp.watch('./scss/**/*.scss', ['sass:dev']);
  gulp.watch('./docs/**/*.html').on('change', reload);
});

gulp.task('sass:dist', function () {
  gulp.src('./scss/simplui.scss')
    .pipe($.sass({sourcemapPath: '../scss'}))
    .pipe($.autoprefixer({
       browsers: ['last 2 versions'],
       cascade: false
     }))
    .pipe(gulp.dest('./dist'))
    .pipe($.rename({suffix: '.min'}))
    .pipe($.cssnano())
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['sass:dist']);
