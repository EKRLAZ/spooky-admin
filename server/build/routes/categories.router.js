"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_controller_1 = __importDefault(require("../controllers/categories.controller"));
class CategoriesRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/', categories_controller_1.default.get.bind(categories_controller_1.default));
        this.router.post('/', categories_controller_1.default.create.bind(categories_controller_1.default));
    }
}
const router = new CategoriesRouter();
exports.default = router.router;
//# sourceMappingURL=categories.router.js.map