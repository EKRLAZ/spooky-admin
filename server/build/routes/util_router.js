"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const util_controller_1 = __importDefault(require("../controllers/util.controller"));
class UtilRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.post('/facebook-id/', util_controller_1.default.getFacebookId.bind(util_controller_1.default));
        this.router.post('/youtube-id/', util_controller_1.default.getYoutubeId.bind(util_controller_1.default));
    }
}
const utilRouter = new UtilRouter();
exports.default = utilRouter.router;
//# sourceMappingURL=util_router.js.map