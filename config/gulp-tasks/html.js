import gulp from "gulp";
// import changed from "gulp-changed"; // визначає чи змінилися файли в потоці
import plumber from "gulp-plumber"; // запобігайте розриву каналу через помилки плагінів gulp
import { plumberNotify } from "./../gulp-plugins.js";
import fileInclude from "gulp-file-include";
import imgToPicture from "gulp-html-img-to-picture";
import htmlMin from "gulp-htmlMin";
import environments from "gulp-environments";

const fileIncludeSettings = {
    prefix: "@@",
    basepath: "@file",
};

const { development, production } = environments;

const SOURCE = ["src/html/index.html"];
let destination = development() ? "./dev" : "./dist";

function html() {
    return (
        gulp
            .src(SOURCE)
            // .pipe(changed(destination)) // !!! ламає роботу fileInclude
            .pipe(fileInclude(fileIncludeSettings))
            .pipe(plumber(plumberNotify("HTML")))
            .pipe(
                imgToPicture({
                    imgFolder: destination + "/img/", // required for sorting by size
                    extensions: [".jpg", ".jpeg", ".png"],
                    ignoreClassname: "img-ignore",
                    ignoreAttribute: "data-ignore",
                    pictureClassAttribute: "data-picture-class",
                    logger: true,
                    sortBySize: true,
                    ignoreScripts: true,
                    ignoreComments: true,
                    filterUnexistedImages: false,
                    sourceExtensions: [
                        {
                            extension: "avif",
                            mimetype: "image/avif",
                        },
                        {
                            extension: "webp",
                            mimetype: "image/webp",
                        },
                    ],
                }),
            )
            .pipe(
                production(
                    htmlMin({
                        collapseWhitespace: true,
                        removeComments: true,
                    }),
                ),
            )
            .pipe(gulp.dest(destination))
    );
}

export { html };
