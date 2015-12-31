"use strict";

var gulp = require('gulp'),
    jasmine = require('gulp-jasmine'),
    tsc = require('gulp-typescript'),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    browserify = require("browserify"),
    header = require("gulp-header"),
    runSequence = require("run-sequence"),
    uglify = require("gulp-uglify");

//******************************************************************************
//* BUILD
//******************************************************************************

gulp.task('build-source', function () {
    return gulp.src(['type_definitions/**/*.ts', 'src/**/*.ts'])
        .pipe(tsc({
            removeComments: false,
            noImplicitAny: false,
            target: "ES5",
            module: "commonjs",
            declarationFiles: false
        }))
        .pipe(gulp.dest('build/source/'));
});


gulp.task("build", function (cb) {
    runSequence("build-source", cb);
});

//******************************************************************************
//* BUNDLE
//******************************************************************************

gulp.task("bundle-source", function () {
    var b = browserify({
        standalone: 'TSFunq',
        entries: __dirname + "/build/source/TSFunq.js",
        debug: true
    });

    return b.bundle()
      .pipe(source("TSFunq.js"))
      .pipe(buffer())
      .pipe(gulp.dest(__dirname + "/bundle/source/"));
});


gulp.task("bundle", function (cb) {
    runSequence("build", "bundle-source", cb);
});

//******************************************************************************
//* TEST
//******************************************************************************

gulp.task('container-fixture', function () {
    return gulp.src('tests/jasmine/specs/container-fixture.js')
		       .pipe(jasmine());
});

gulp.task('servicekey-fixture', function () {
    return gulp.src('tests/jasmine/specs/servicekey-fixture.js')
		       .pipe(jasmine());
});

gulp.task("test", function (cb) {
    runSequence("bundle", "container-fixture", "servicekey-fixture", cb);
});

//******************************************************************************
//* RELEASE
//******************************************************************************

gulp.task("compress", function () {
    return gulp.src(__dirname + "/bundle/source/TSFunq.js")
               .pipe(uglify({ preserveComments: false }))
               .pipe(gulp.dest(__dirname + "/dist/"))
});


gulp.task("header", function () {

    var pkg = require(__dirname + "/package.json");

    var banner = ["/**",
      " * <%= pkg.name %> v.<%= pkg.version %> - <%= pkg.description %>",
      " * Copyright (c) 2015 <%= pkg.author %>",
      " * <%= pkg.license %> License",
      " * <%= pkg.homepage %>",
      " */",
      ""].join("\n");

    return gulp.src(__dirname + "/dist/TSFunq.js")
               .pipe(header(banner, { pkg: pkg }))
               .pipe(gulp.dest(__dirname + "/dist/"));
});

gulp.task("release", function(cb) {
    runSequence("bundle", "compress", "header", cb);
});

//******************************************************************************
//* DEFAULT
//******************************************************************************

gulp.task("default", function (cb) {
    runSequence(
    "build-source",
    "bundle-source",
    "container-fixture",
    "servicekey-fixture",
    "compress",
    "header", cb);
});

