import { scrollAnimator } from "../main.js";
import { Project } from "./Project.js";

class Projects {
    #filters = document.querySelector(".filter__categories");
    #template = document.querySelector("#cardProjectTemplate").innerHTML;
    #filterResult = document.querySelector(".filter__result");
    #Mustache;
    #projects = [];
    constructor(Mustache) {
        this.#addEvent();
        this.#Mustache = Mustache;
    }

    getProjects() {
        fetch("./json/projects.json")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("could not access projects.json");
                }
            })
            .then((data) => {
                data.forEach((elem) => {
                    const project = new Project(
                        elem.img,
                        elem.category,
                        elem.title,
                    );
                    this.add(project);
                });
                this.draw();
            });
    }

    add(project) {
        this.#projects.push(project);
    }

    draw(category = "All") {
        const fragment = document.createDocumentFragment();
        this.#projects.forEach((project) => {
            if (category === "All" || project.category === category) {
                const rendered = project.getRendered(
                    this.#template,
                    this.#Mustache,
                );

                const article = document.createElement("article");
                article.classList.add(
                    "filter__card",
                    "card-filter",
                    "_anim-item",
                    "_anim-non-hide",
                );
                article.innerHTML = rendered;

                scrollAnimator.add(article);

                fragment.appendChild(article);
            }
        });

        this.#filterResult.innerHTML = "";
        if (fragment.childElementCount <= 0) {
            const p = document.createElement("p");
            p.textContent = "nothing yet =(";
            fragment.append(p);
        }
        this.#filterResult.append(fragment);
        scrollAnimator.animOnScroll();
    }

    #addEvent() {
        this.#filters.addEventListener("click", (e) => {
            if (e.target.dataset.filterCategory) {
                for (const elem of this.#filters.children) {
                    elem.classList.remove("_active");
                }

                e.target.classList.add("_active");
                const category = e.target.dataset.filterCategory;
                this.draw(category);
            }
        });
    }
}

export { Projects };
