import gulp from "gulp";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import environments from "gulp-environments";
import changed from "gulp-changed"; // визначає чи змінилися файли в потоці
import plumber from "gulp-plumber"; // запобігайте розриву каналу через помилки плагінів gulp
import sassGlob from "gulp-sass-glob"; // плагін для gulp-sass для використання глобального імпорту
import { plumberNotify } from "./../gulp-plugins.js";
import webpCss from "gulp-webp-css-fixed";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano"; // Minify CSS

const sass = gulpSass(dartSass);
const { development, production } = environments;

const SOURCE = ["./src/scss/**/*.scss"];
let destination = development() ? "dev/css" : "dist/css";

const postCssPlugins = [autoprefixer(), cssnano()];

function css() {
    return gulp
        .src(SOURCE)
        .pipe(changed(destination))
        .pipe(plumber(plumberNotify("SCSS")))
        .pipe(development(sourcemaps.init()))
        .pipe(sassGlob())
        .pipe(sass().on("error", sass.logError))
        .pipe(webpCss())
        .pipe(production(postcss(postCssPlugins)))
        .pipe(development(sourcemaps.write()))
        .pipe(gulp.dest(destination));
}

export { css };
