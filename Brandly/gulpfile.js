'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
	fontgen = require('gulp-fontgen'),
	concat = require('gulp-concat'),
	cssUseref = require('gulp-css-useref'),
	rename = require("gulp-rename"),
	clean = require('gulp-clean'),
	pug = require('gulp-pug'),
	gulpIf = require('gulp-if');

var path = {
    build: {
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/img/',
        fontsTmp: 'dist/fonts/',
        fonts: 'fonts'
    },
    src: {
        html: 'src/index.pug',
        js: 'src/js/main.js',
        style: 'src/sass/main.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        fontsCss: 'dist/fonts/*.css',
        fontsCssTmp: 'dist/css/*.font.css'
    },
    watch: {
        html: 'src/**/*.pug',
        js: 'src/js/**/*.js',
        style: 'src/sass/main.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './dist'
};

var config = {
    server: {
        baseDir: "./dist"
    },
    host: 'localhost',
    port: 9000,
    open: false
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function(done) {
    return rimraf(path.clean, done);
});

gulp.task('html:build', function () {
    return gulp.src(path.src.html)
		.pipe(pug())
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    return gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    return gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['src/sass/', 'node_modules', 'node_modules/motion-ui/src'],
            outputStyle: 'compressed',
            sourceMap: false
        }).on('error', sass.logError))
        .pipe(cssmin({compatibility: 'ie9'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    return gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:make', function() {
    return gulp.src(path.src.fonts)
        .pipe(fontgen({dest: path.build.fontsTmp}));
});

gulp.task('fonts:clone', function() {
	return gulp.src((path.src.fontsCss))
		.pipe(cssUseref({base: path.build.fonts}))
		.pipe(gulpIf(['*.css'], rename({suffix: '.font'})))
		.pipe(gulp.dest(path.build.css));
});

gulp.task('fonts:cssmin', function() {
	return gulp.src((path.src.fontsCssTmp))
		.pipe(cssmin())
		.pipe(concat('fonts.css'))
		.pipe(gulp.dest(path.build.css));
});

gulp.task('fonts:clean', function(cb) {
    return gulp.src([path.src.fontsCssTmp, path.build.fontsTmp]).pipe(clean());
});

gulp.task('fonts:build', gulp.series('fonts:make', 'fonts:clone', 'fonts:cssmin', 'fonts:clean'));

gulp.task('build', gulp.parallel(
    'html:build',
    'js:build',
    'style:build',
    'image:build'
));


gulp.task('watch', function(){
    gulp.watch([path.watch.html], gulp.series('html:build'));
    gulp.watch([path.watch.style], gulp.series('style:build'));
    gulp.watch([path.watch.js], gulp.series('js:build'));
    gulp.watch([path.watch.img], gulp.series('image:build'));
    gulp.watch([path.watch.fonts], gulp.series('fonts:build'));
});


gulp.task('default', gulp.series('build', gulp.parallel('webserver', 'watch')));
