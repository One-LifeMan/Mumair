import Swiper from "swiper";
import { Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";

const slider = new Swiper(".testimonials__slider", {
    modules: [Pagination],

    direction: "horizontal",
    loop: true,
    centeredSlides: true,

    pagination: {
        el: ".testimonials__pagination",
        clickable: true,
    },

    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
        640: {
            slidesPerView: 1.6,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 1.6,
            spaceBetween: 40,
        },
        1024: {
            slidesPerView: 1.6,
            spaceBetween: 62,
        },
    },
});

document.addEventListener("DOMContentLoaded", resizeHeightSlides);

function resizeHeightSlides() {
    const SLIDES = document.querySelectorAll(".testimonials-slide__inner");

    let maxHeight = 0;

    SLIDES.forEach((slide) => {
        const slideHeight = slide.getBoundingClientRect().height;
        if (slideHeight > maxHeight) {
            maxHeight = slideHeight;
        }
    });

    SLIDES.forEach((slide) => {
        slide.style.height = maxHeight + "px";
        slide.style.boxSizing = "border-box";
    });

    document.removeEventListener("DOMContentLoaded", resizeHeightSlides);
}
