var gulp         = require('gulp'), // Подключаем Gulp
    sass         = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync  = require('browser-sync'), // Подключаем Browser Sync
    cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

gulp.task('clean', function() {
    return del.sync('build'); // Удаляем папку build перед сборкой
});

gulp.task('css-min', ['sass'], function() {
    return gulp.src('build/css/style.css') // Выбираем файл для минификации
        .pipe(cssnano())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: false }))
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('build/css')); // Выгружаем в папку build/css
});

gulp.task('sass', function(){
    return gulp.src('sass/style.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('build/css'));
});

gulp.task('copyHTML', function(){
    var buildHtml = gulp.src('*.html')
    .pipe(gulp.dest('build'));
});

gulp.task('copyJS', function(){
    var buildJs = gulp.src('js/*')
    .pipe(gulp.dest('build/js'));
});

gulp.task('copyImg', function(){
  return gulp.src('img/*') // Берем все изображения
        .pipe(cache(imagemin({ // Сжимаем их с наилучшими настройками
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('build/img'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'build'
        },
        notify: false
    });
});

gulp.task('build', ['clean', 'css-min', 'copyHTML', 'copyJS', 'copyImg'], function() {

    var buildFonts = gulp.src('fonts/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('build/fonts'));

});

gulp.task('watch', ['build', 'browser-sync'], function() {
  gulp.watch (['sass/**/*.scss'], ['css-min', browserSync.reload]);
  gulp.watch('*.html', ['copyHTML', browserSync.reload]);
  gulp.watch('js/*.js', ['copyJS', browserSync.reload]);
  gulp.watch('img/*', ['copyImg', browserSync.reload]);
});

gulp.task('default', ['watch']);

gulp.task('clear', function () {
    return cache.clearAll();
});
