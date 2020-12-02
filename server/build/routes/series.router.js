"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const series_controller_1 = __importDefault(require("../controllers/series.controller"));
class SeriesRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/', series_controller_1.default.get.bind(series_controller_1.default));
        this.router.post('/', series_controller_1.default.create.bind(series_controller_1.default));
        /*             this.router.post('/facebook-id/', podcasts.getFacebookId.bind(podcasts))
        this.router.post('/youtube-id/', podcasts.getYoutubeId.bind(podcasts))
  
          this.router.get('/:id', stories.geById);
                */
    }
}
const router = new SeriesRouter();
exports.default = router.router;
//# sourceMappingURL=series.router.js.map