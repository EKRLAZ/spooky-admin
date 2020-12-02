"use strict";
const { Router } = require("express");
const { stories } = require('../controllers/StoriesController');
class StoriesRoutes {
    constructor() {
        this.router = Router();
        this.config();
    }
    config() {
        this.router.get('/', stories.stories.bind(stories));
        this.router.get('/:id', stories.geById);
        this.router.post('/', stories.create.bind(stories));
    }
}
const indexStories = new StoriesRoutes().router;
module.exports = {
    indexStories
};
//# sourceMappingURL=storiesRoutes.js.map