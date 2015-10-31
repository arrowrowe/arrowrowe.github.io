var gulp = require('gulp');

/******* Tam's Building ***************************************/
var tam = require('tam');
var fs = require('fs-extra');
var tamHTML = require('tam-html');
var assetsPath = './assets.json';

gulp.task('clean', function () { fs.removeSync(fs.readJsonSync(assetsPath).dist); });

gulp.task('build', ['clean'], function () {
  tam.run();
  tamHTML(tam, assetsPath, gulp);
});

gulp.task('watch', ['build'], function () {
  gulp.watch('{src,assets}/**/*', ['build']);
});
