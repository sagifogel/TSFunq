"use strict";

var projectPath = "",
    gulp = require('gulp'),
    path = require("path"),
    header = require("gulp-header"),
    jasmine = require('gulp-jasmine'),
    runSequence = require("run-sequence"),
    tscc = require("gulp-typescript-closure-compiler"),
    closureCompiler = require("google-closure-compiler").gulp();

//******************************************************************************
//* BUILD
//******************************************************************************

gulp.task("build-project", function () {
    var project = tscc.createProject(__dirname + projectPath);
    
    return project.src()
                  .pipe(tscc(project));
});

gulp.task("build-release", function (cb) {
    runSequence("build-project", cb);
});

gulp.task("build-test", function (cb) {
    projectPath = "\\tests";
    runSequence("build-project", cb);
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
    runSequence("build-test", "compress", "header", "container-fixture", "servicekey-fixture", cb);
});

//******************************************************************************
//* RELEASE
//******************************************************************************

gulp.task("compress", function () {
    return gulp.src(["./build/TSFunq.js"])
               .pipe(closureCompiler({
                    compilation_level: 'ADVANCED',
                    output_wrapper: '!function(){%output%}();',
                    js_output_file: "TSFunq.js",
                }))
               .pipe(gulp.dest(__dirname + "/dist/"))
});


gulp.task("header", function () {
    var pkg = require(__dirname + "/package.json");
    var banner = ["/**",
        " * TSFunq v.<%= pkg.version %> - <%= pkg.description %>",
        " * Copyright (c) <%= new Date().getFullYear() %> <%= pkg.author %>",
        " * <%= pkg.license %> License",
        " * <%= pkg.homepage %>",
        " */",
        ""].join("\n");
    
    return gulp.src(__dirname + "/dist/TSFunq.js")
               .pipe(header(banner, { pkg: pkg }))
               .pipe(gulp.dest(__dirname + "/dist/"));
});

gulp.task("release", function (cb) {
    runSequence("build-release", "compress", "header",  cb);
});