"use strict";

import "./modules/_preloader.js";
import "./modules/_testimonials-slider.js";
import "./modules/_validateForm.js";

import { Mustache } from "./constants/_libs.js";
import { Projects } from "./classes/Projects.js";
import { ScrollAnimator } from "./classes/ScrollAnimator.js";

const projects = new Projects(Mustache);
projects.getProjects();

const scrollAnimator = new ScrollAnimator();
scrollAnimator.init();

export { scrollAnimator };
