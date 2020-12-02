"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publisher_controller_1 = __importDefault(require("../controllers/publisher.controller"));
class PublisherRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/', publisher_controller_1.default.get.bind(publisher_controller_1.default));
        this.router.post('/', publisher_controller_1.default.create.bind(publisher_controller_1.default));
    }
}
const routes = new PublisherRouter();
exports.default = routes.router;
//# sourceMappingURL=publisher.router.js.map