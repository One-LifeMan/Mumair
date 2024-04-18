class ScrollAnimator {
    #animItems;

    constructor() {
        this.#animItems = Array.from(document.querySelectorAll("._anim-item"));
    }

    init() {
        if (this.#animItems.length > 0) {
            window.addEventListener("scroll", () => {
                this.animOnScroll();
            });
            window.addEventListener("load", () => {
                this.animOnScroll();
                window.removeEventListener("load", this.animOnScroll);
            });
        }
    }

    animOnScroll() {
        this.#animItems.forEach((animItem) => {
            const animItemHeight = animItem.getBoundingClientRect().height;
            const animItemOffset = this.#offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;

            if (animItemHeight > window.innerHeight) {
                animItemPoint =
                    window.innerHeight - window.innerHeight / animStart;
            }

            if (
                scrollY > animItemOffset - animItemPoint &&
                scrollY < animItemOffset + animItemHeight
            ) {
                animItem.classList.add("_anim-active");
            } else {
                if (!animItem.classList.contains("_anim-non-hide")) {
                    animItem.classList.remove("_anim-active");
                }
            }
        });
    }

    #offset(elem) {
        const rect = elem.getBoundingClientRect();
        const scrollLeft =
            window.scrollX || document.documentElement.scrollLeft;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft,
        };
    }

    add(element) {
        this.#animItems.push(element);
    }
}

export { ScrollAnimator };
