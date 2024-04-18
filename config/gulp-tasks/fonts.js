import gulp from "gulp";
import changed from "gulp-changed"; // запобігайте розриву каналу через помилки плагінів gulp
import ttf2woff from "gulp-ttf2woff";
import ttf2woff2 from "gulp-ttf2woff2";
import environments from "gulp-environments";

const { development, production } = environments;

//  OLD
// const SOURCE = ["./src/fonts/**/*.ttf"];
// NEW
const SOURCE = ["./src/fonts/**/*"];

let destination = development() ? "dev/fonts" : "dist/fonts";

// OLD
// function fonts() {
//     return gulp
//         .src(SOURCE)
//         .pipe(changed(destination))
//         .pipe(ttf2woff())
//         .pipe(gulp.dest(destination))

//         .pipe(gulp.src(SOURCE))
//         .pipe(ttf2woff2())
//         .pipe(gulp.dest(destination))

//         .pipe(gulp.src("./src/fonts/**/*"))
//         .pipe(gulp.dest(destination));
// }

// NEW
function fonts() {
    return gulp
        .src(SOURCE)
        .pipe(changed(destination))
        .pipe(gulp.dest(destination));
}

export { fonts };
