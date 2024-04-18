import { PRELOADER } from "./../constants/_constants.js";

console.log("preloader");

document.body.style.overflow = "hidden";

window.addEventListener("load", () => {
    let rects = PRELOADER.querySelectorAll(".preloader__rect");
    rects.forEach((element) => {
        element.style.animationPlayState = "paused";
    });
    // window.scroll(0, 0);
    PRELOADER.style.visibility = "hidden";
    document.body.style.overflow = "visible";
});
