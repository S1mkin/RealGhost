const gulp = require("gulp")
const del = require("del")
const browsersync = require("browser-sync").create()
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

// Add html to build
function html() {
  return gulp
    .src("./test/*.html") // Gets all files html
    .pipe(gulp.dest(conf.dest));
}

// Compile CSS
function styles() {
    return gulp
      .src("./src/css/*.css") // Gets all files src/css
      .pipe(concat('jquery.realghost.css'))
      .pipe(gulp.dest(conf.dest + '/css'))
      .pipe(rename({suffix: '.min'}))
      .pipe(cssnano({zindex: false}))
      .pipe(gulp.dest(conf.dest + '/css'));
}

// Compile JS
function scripts() {
    return gulp
      .src("./src/js/*.js") // Gets all files src/js
      .pipe(concat('jquery.realghost.js'))
      .pipe(header(banner, {pkg: pkg}))
      .pipe(gulp.dest(conf.dest + '/js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest(conf.dest + '/js'));
}

// Compile JS
function scripts() {
  return gulp
    .src("./src/js/*.js") // Gets all files src/js
    .pipe(concat('jquery.realghost.js'))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest(conf.dest + '/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(conf.dest + '/js'));
}

// Add Images
function images() {
  return gulp
    .src("./src/img/**/*")
    .pipe(gulp.dest(conf.dest + '/img'));
}

// Add Audio
function audio() {
  return gulp
    .src("./src/audio/**/*")
    .pipe(gulp.dest(conf.dest + '/audio'));
}

// clean dir /build
function clean(){
    return del(['./build/*']);
}


// Watch files
function watchFiles() {
  gulp.watch("./test/*.html", html);
  gulp.watch("./src/css/*.css", styles);
  gulp.watch("./src/js/*.js", scripts);
}

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./build/"
    },
    port: 3000
  });
  done();
}

// define complex tasks
const build = gulp.series(clean, gulp.parallel(html, styles, scripts, images, audio));
const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.clean = clean;
exports.watch = watch;
exports.build = build;

//example https://gist.github.com/jeromecoupe/0b807b0c1050647eb340360902c3203a