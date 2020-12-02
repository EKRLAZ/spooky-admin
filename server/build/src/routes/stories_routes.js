"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stories_controller_1 = __importDefault(require("../controllers/stories_controller"));
class StoriesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/', stories_controller_1.default.stories.bind(stories_controller_1.default));
        /*
          this.router.get('/:id', stories.geById);
          this.router.post('/', stories.create.bind(stories))       */
    }
}
const storiesRoutes = new StoriesRoutes();
exports.default = storiesRoutes.router;
//# sourceMappingURL=stories_routes.js.map