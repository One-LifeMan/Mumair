"use strict";

function $(selector) {
    return document.querySelector(`${selector}`);
}
function $All(selector) {
    return document.querySelectorAll(`${selector}`);
}

const PRELOADER = $(".preloader");

// prettier-ignore
export { 
    $, 
    $All, 
    PRELOADER,
};
