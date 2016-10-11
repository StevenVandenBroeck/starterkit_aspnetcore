'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var path = require('path');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var ts = require('gulp-typescript');

var tsProject = ts.createProject("tsconfig.json");

var sourceFiles = {
    siteSass: './WebClient/scss/main.scss',
    bootstrapSass: './node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss',
    assets: './WebClient/assets',
    js: './WebClient/js',
    ts: './WebClient/ts' 
};

var wwwRootPaths = {
    root: './wwwroot',
    assets: './wwwroot/assets',
    css: './wwwroot/css',
    js: './wwwroot/js',
    lib: './wwwroot/js/lib'
};

/** Clean tasks **/
gulp.task('clean', function() {
    var root = path.resolve(wwwRootPaths.root, '**');
    var notRoot = '!' + path.resolve(wwwRootPaths.root);
    var notGitkeep = '!' + path.resolve(wwwRootPaths.root, '.gitkeep');
    return del.sync([root, notRoot, notGitkeep]);
});

/** SASS task **/
gulp.task('sass', function () {
    return gulp.src(sourceFiles.siteSass)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(wwwRootPaths.css));
});

/** Typescript task **/
gulp.task('ts', function () {
    var tsFiles = path.resolve(sourceFiles.ts, '**/*.ts');
    return gulp.src(tsFiles)
        .pipe(ts(tsProject)).js
        .pipe(gulp.dest(wwwRootPaths.js));
});

/** libs task */
gulp.task('lib', function() {
    var requireJs = './node_modules/requirejs/require.js';
    return gulp.src(requireJs)
        .pipe(gulp.dest(wwwRootPaths.lib));
});

/** Asssets task **/
gulp.task('assets', function() {
    var assetFiles = path.resolve(sourceFiles.assets, '**');
    return gulp.src(assetFiles)
        .pipe(gulp.dest(wwwRootPaths.assets));
})

/** Common tasks **/

gulp.task('dev', ['clean', 'sass', 'assets', 'lib', 'ts']);

gulp.task('default', function() {
    
});