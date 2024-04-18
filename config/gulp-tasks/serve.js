import environments from "gulp-environments";

import gulp from "gulp";
import { html } from "./html.js";
import { css } from "./css.js";
import { js } from "./js.js";
import { img } from "./img.js";
import { fonts } from "./fonts.js";
import { sounds } from "./sounds.js";
import { locales } from "./locales.js";
import { mustache } from "./mustache.js";
import { json } from "./json.js";
import browserSync from "browser-sync";

const { development, production } = environments;

let destination = development() ? "./dev" : "./dist";

const server = browserSync.create();

function serve() {
    server.init({
        server: {
            baseDir: destination,
            serveStatic: ["./node_modules"],
        },
    });

    gulp.watch("src/html/**/*.html", gulp.series(html, css));
    gulp.watch("src/scss/**/*.scss", css);
    gulp.watch("src/js/**/*.js", js);
    gulp.watch("src/img/**/*", img);
    gulp.watch("src/fonts/**/*", fonts);
    gulp.watch("src/sounds/**/*", sounds);
    gulp.watch("src/locales/**/*", locales);
    gulp.watch("src/mustache/**/*", mustache);
    gulp.watch("src/json/**/*", json);
    gulp.watch(`${destination}/**/*`).on("change", server.reload);
}

export { serve };
