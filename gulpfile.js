var babelify   = require("babelify");
var browserify = require("browserify");
var face       = require("cool-ascii-faces");
var fs         = require("fs");
var gulp       = require("gulp");
var sass       = require("gulp-sass");

gulp.task("default", function() {
    buildJS();
    // buildSCSS(); // Failing at present moment
});

gulp.task("watch", function() {
    gulp.watch("./js/app/**/*.js", ['default']);
});

function buildJS() {
    var bundle = browserify("./js/src/index.react.js", {debug: true})
      .transform(babelify)
      .bundle()
      .on("error", function (err) { console.log("Error : " + err.message); })
      .pipe(fs.createWriteStream("./js/app.js"));

  console.log("Build javascript yayyyy");
}

function buildSCSS() {
    gulp.src('./css/style.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(fs.createWriteStream("./css/style.css"));

  console.log("Build SCSS yayyyy");

}