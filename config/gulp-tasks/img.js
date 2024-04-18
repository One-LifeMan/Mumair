import gulp from "gulp";
import changed from "gulp-changed"; // визначає чи змінилися файли в потоці
import plumber from "gulp-plumber"; // запобігайте розриву каналу через помилки плагінів gulp
import imagemin from "gulp-imagemin";
import { plumberNotify } from "./../gulp-plugins.js";
import environments from "gulp-environments";
import webp from "gulp-webp";
import avif from "imagemin-avif";
import rename from "gulp-rename";

const { development, production } = environments;

const SOURCE = ["./src/img/**/*"];
const SOURCE_FOR_WEBP = [
    "./src/img/**/*",
    "!./src/img/icons/**",
    "!./src/img/favicon/**",
];
const SOURCE_FOR_AVIF = [
    "./src/img/**/*.{png,jpg,jpeg}",
    "!./src/img/icons/**",
    "!./src/img/favicon/**",
];
let destination = development() ? "dev/img" : "dist/img";

function img() {
    return gulp
        .src(SOURCE_FOR_WEBP)
        .pipe(changed(destination))
        .pipe(webp())
        .pipe(gulp.dest(destination))

        .pipe(gulp.src(SOURCE_FOR_AVIF))
        .pipe(changed(destination))
        .pipe(imagemin([avif({ quality: 90 })]))
        .pipe(
            rename((path) => {
                return {
                    dirname: path.dirname,
                    basename: path.basename,
                    extname: ".avif",
                };
            }),
        )
        .pipe(gulp.dest(destination))

        .pipe(gulp.src(SOURCE))
        .pipe(changed(destination))
        .pipe(plumber(plumberNotify("IMG")))
        .pipe(production(imagemin()))

        .pipe(gulp.dest(destination));
}

export { img };
