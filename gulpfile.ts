"use strict";

const gulp         = require("gulp");
const del          = require("del");
const tsc          = require("gulp-typescript");
const sourcemaps   = require('gulp-sourcemaps');
const tsProject    = tsc.createProject("tsconfig.json");
const tslint       = require('gulp-tslint');
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS     = require('gulp-clean-css');
const rename       = require('gulp-rename');
const browserSync  = require('browser-sync').create();
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify');



gulp.task('styles', function () {
	return gulp.src('src/sass/*.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(cleanCSS())
	.pipe(gulp.dest('build/css'))
	.pipe(browserSync.stream());
});
/**
 * Remove build directory.
 */
gulp.task('clean', (cb) => {
    return del(["build"], cb);
});

/**
 * Lint all custom TypeScript files.
 */
//gulp.task('tslint', () => {
//    return gulp.src("src/**/*.ts")
 //       .pipe(tslint({
 //           formatter: 'prose'
 //       }))
  //      .pipe(tslint.report());
//});

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task("compile", () => {
    let tsResult = gulp.src("src/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));
    return tsResult.js
        .pipe(sourcemaps.write(".", {sourceRoot: '/src'}))
        .pipe(gulp.dest("build"));
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", () => {
    return gulp.src(["src/**/*", "!**/*.ts"])
        .pipe(gulp.dest("build"));
});
/**
 * Boostrap Init
 */



/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", () => {
    return gulp.src([
            'core-js/client/shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**/*.js',
            'zone.js/dist/**',
            '@angular/**/bundles/**',
            'jquery/dist/jquery.min.js',
            'bootstrap/dist/css/**',
            'bootstrap/dist/js/**'
        ], {cwd: "node_modules/**"}) /* Glob required here. */
        .pipe(gulp.dest("build/lib"));
});

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function () {
    gulp.watch(["src/**/*.ts"], ['compile']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
    gulp.watch(["src/**/*.html", "src/**/*.css", "src/sass/*.sass"], ['resources']).on('change', function (e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });
    gulp.watch(["src/sass/*.sass"], ['styles']).on('change', function (e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });
});

gulp.task('default', ['watch']);

/**
 * Build the project.
 */
gulp.task("build", ['compile', 'resources', 'libs', 'styles'], () => {
    console.log("Building the project ...");
});