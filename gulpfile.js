const gulp = require('gulp'),
      sass = require('gulp-sass'),
      bSync = require('browser-sync'),
      uglify = require('gulp-uglify'),
      concat = require('gulp-concat'),
      rename = require('gulp-rename')

gulp.task('scss', function(){
    return gulp.src('app/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'})) // minimal
    // .pipe(sass({outputStyle: 'expanded'}))
    .pipe(rename({
        suffix: '.min',
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(bSync.reload({stream: true}))
})

gulp.task('html', function() {
    return gulp.src('app/*.html')
    .pipe(bSync.reload({stream: true}))
})
gulp.task('script', function() {
    return gulp.src('app/js/*.js')
    .pipe(bSync.reload({stream: true}))
})

gulp.task('js', function(){
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
    ])
    .pipe(concat('lib.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(bSync.reload({stream: true}))
})

gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'))
    gulp.watch('app/*.html', gulp.parallel('html'))
    gulp.watch('app/js/*.js', gulp.parallel('script'))
})

gulp.task('sync', function() {
    bSync.init({
        server: {
            baseDir: 'app/'
        }
    })
})

gulp.task('default', gulp.parallel('scss', 'js', 'sync', 'watch'))
