class Project {
    constructor(img, category, title) {
        this.img = img;
        this.category = category;
        this.title = title;
    }

    getRendered(template, Mustache) {
        const project = {
            src: `./img/${this.img}`,
            alt: this.img,
            category: this.category,
            title: this.title,
        };
        const rendered = Mustache.render(template, project);
        return rendered;
    }
}

export { Project };
