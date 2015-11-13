var gulp = require('gulp');
var fs = require('fs-extra');

gulp.task('publish', ['build', 'feed']);

/******* Tam's Building ***************************************/
var tam = require('tam');
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

/******* Feed *************************************************/
var RSS = require('rss');

gulp.task('feed', function () {

  var site_url = 'http://arrowrowe.me/';
  var author = 'arrowrowe <arrowrowe@gmail.com>';

  var feed = new RSS({
    title: 'Flying yet Motionless | arrowrowe',
    description: 'Blog of arrowrowe.',
    feed_url: site_url + 'feed',
    site_url: site_url,
    image_url: site_url + 'logo.png',
    managingEditor: author,
    webMaster: author,
    copyright: 'http://creativecommons.org/licenses/by-nc-sa/4.0/',
    ttl: 40
  });

  match(
    fs.readFileSync('./blog/general/archive.md', 'utf8'),
    /- (.+?), \[(.+?)\]\((.+?)\): (.+)/g,
    function (content, time, title, hash, description) {
      feed.item({
        title: title,
        description: description,
        url: site_url + hash,
        guid: hash.substr(8),
        date: time
      });
    }
  );

  fs.writeFileSync('./feed', feed.xml());

  function match(text, re, fn) {
    var m;
    while ((m = re.exec(text)) !== null) {
      fn.apply(null, m);
    }
  }
});
