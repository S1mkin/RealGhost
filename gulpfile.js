const gulp = require("gulp")
const del = require("del")
const concat = require("gulp-concat")
const uglify = require("gulp-uglify")
const rename = require('gulp-rename')
const cssnano = require('gulp-cssnano')
const header = require("gulp-header")
const pkg = require("./package.json")

var banner = [
  "// ==================================================",
  "// RealGhost v${pkg.version}",
  "//",
  "// Licensed GPLv3 for open source use",
  "//",
  "// https://RealAdmin.ru/",
  "//",
  "// ==================================================",
  ""
].join("\n");

const conf = {
    dest: './build',
}

// Compile CSS
function styles() {
    return gulp
      .src("src/css/*.css") // Gets all files src/css
      .pipe(concat('jquery.realghost.css'))
      .pipe(gulp.dest(conf.dest + '/css'))
      .pipe(rename({suffix: '.min'}))
      .pipe(cssnano({zindex: false}))
      .pipe(gulp.dest(conf.dest + '/css'));
}

// Compile JS
function scripts() {
    return gulp
      .src("src/js/*.js") // Gets all files src/js
      .pipe(concat('jquery.realghost.js'))
      .pipe(header(banner, {pkg: pkg}))
      .pipe(gulp.dest(conf.dest + '/js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest(conf.dest + '/js'));
}



function clean(){
    return del(['build/*']);
}



gulp.task("styles", styles);
gulp.task("scripts", scripts);

let build = gulp.series(clean,
    gulp.parallel(styles, scripts)
);

gulp.task('build', build);

//gulp.task('dev', gulp.series('build', 'watch'));