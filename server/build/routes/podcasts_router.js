"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const podcasts_controller_1 = __importDefault(require("../controllers/podcasts_controller"));
class PodcastsRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/', podcasts_controller_1.default.podcasts.bind(podcasts_controller_1.default));
        this.router.post('/', podcasts_controller_1.default.create.bind(podcasts_controller_1.default));
        this.router.get('/parsear', podcasts_controller_1.default.parsePodcast.bind(podcasts_controller_1.default));
        this.router.get('/read', podcasts_controller_1.default.read.bind(podcasts_controller_1.default));
    }
}
const podcastsRouter = new PodcastsRouter();
exports.default = podcastsRouter.router;
//# sourceMappingURL=podcasts_router.js.map