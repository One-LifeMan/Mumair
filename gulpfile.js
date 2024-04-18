import gulp from "gulp";
import { html } from "./config/gulp-tasks/html.js";
import { css } from "./config/gulp-tasks/css.js";
import { js } from "./config/gulp-tasks/js.js";
import { img } from "./config/gulp-tasks/img.js";
import { fonts } from "./config/gulp-tasks/fonts.js";
import { serve } from "./config/gulp-tasks/serve.js";
import { cleanDist } from "./config/gulp-plugins.js";
import { sounds } from "./config/gulp-tasks/sounds.js";
import { locales } from "./config/gulp-tasks/locales.js";
import { mustache } from "./config/gulp-tasks/mustache.js";
import { json } from "./config/gulp-tasks/json.js";

// prettier-ignore
gulp.task(
    "build", gulp.series(
        cleanDist,
        gulp.parallel(
                img, 
                fonts, 
                sounds, 
                locales, 
                mustache, 
                json),
        gulp.parallel(
                html, 
                css, 
                js, 
            ), serve
        )
    );
