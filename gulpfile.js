var gulp = require('gulp');
var jasmine = require('gulp-jasmine');

gulp.task('container-fixture', function () {
    return gulp.src('tests/jasmine/specs/container-fixture.js')
		       .pipe(jasmine());
});

gulp.task('servicekey-fixture', function () {
    return gulp.src('tests/jasmine/specs/servicekey-fixture.js')
		       .pipe(jasmine());
});