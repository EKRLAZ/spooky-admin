"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StoriesController {
    index(req, res) {
        res.send('Stories');
    }
}
const stories = new StoriesController();
exports.default = stories;
//# sourceMappingURL=StoriesController.js.map