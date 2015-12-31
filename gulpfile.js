"use strict";

var entryFile,
    gulp = require('gulp'),
    rimraf = require("rimraf"),
    rename = require("gulp-rename"),
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
    return gulp.src(['type_definitions/**/*.ts',
            'src/**/Container.ts',
            'src/**/Dictionary.ts',
            'src/**/EquatbaleString.ts',
            'src/**/GenericServiceEntry.ts',
            'src/**/NameResolver.ts',
            'src/**/Owner.ts',
            'src/**/ReuseScope.ts',
            'src/**/ServiceEntry.ts',
            'src/**/ServiceKey.ts',
            'src/**/' + entryFile + ".ts"])
        .pipe(tsc({
            target: "ES5",
            module: "commonjs",
            noImplicitAny: false,
            removeComments: false,
            declarationFiles: false
        }))
        .pipe(gulp.dest('build/source/'));
});

gulp.task("build-release", function (cb) {
    entryFile = "TSFunq-release";
    runSequence("build-source", cb);
});

gulp.task("build-test", function (cb) {
    entryFile = "TSFunq-test";
    runSequence("build-source", cb);
});

gulp.task('delete-build', function (cb) {
    rimraf('./build', cb);
});

gulp.task('delete-bundle', function (cb) {
    rimraf('./bundle', cb);
});

gulp.task('rename-entryfile', function (cb) {
    return gulp.src("./build/source/" + entryFile + ".js")
               .pipe(rename("./build/source/TSFunq.js"))
               .pipe(gulp.dest("./"));
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


gulp.task("bundle-test", function (cb) {
    runSequence("build-test", "rename-entryfile", "bundle-source", "delete-build", cb);
});

gulp.task("bundle-release", function (cb) {
    runSequence("build-release", "rename-entryfile", "bundle-source", "delete-build", cb);
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
    runSequence("bundle-test", "compress", "delete-bundle", "header", "container-fixture", "servicekey-fixture", cb);
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

gulp.task("release", function (cb) {
    runSequence("bundle-release", "compress", "delete-bundle", "header", cb);
});