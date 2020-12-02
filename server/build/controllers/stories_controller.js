"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const psql_conn_1 = __importDefault(require("../psql-conn"));
const conexion_1 = __importDefault(require("../conexion"));
class StoriesController {
    index(req, res) {
        res.send('Stories');
    }
    get(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 00000000-0000-0000-0000-000000000000
                let result = yield psql_conn_1.default.query('SELECT * FROM tales ORDER BY create_at DESC LIMIT 12 ');
                return response.status(200).json(result.rows);
            }
            catch (error) {
                console.log(error);
                return response.status(500).json('Internal Server Error');
            }
        });
    }
    stories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs_extra_1.default.readJson('/home/creepy/Público/json db/base normal/stories.json');
                var stories = [];
                var json = {};
                for (const key in data) {
                    var story = data[key];
                    stories.push(story);
                }
                let f = stories.sort((a, b) => b.create_at - a.create_at).slice(0, 12);
                res.json(f);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let talesRef = conexion_1.default.collection('tales');
            try {
                let story = request.body;
                story.duration = this.toMilliseconds(story.duration);
                var { id, title, description, source, art_url, subject_to, subject_to_id, publisher, publisher_id, duration, create_at, explicit, type } = story;
                if (publisher_id == "") {
                    publisher_id = "00000000-0000-0000-0000-000000000000";
                }
                let result = yield psql_conn_1.default.query('INSERT INTO tales (id, title, description, source, art_url, subject_to, subject_to_id, publisher, publisher_id, duration, create_at, explicit, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', [id, title, description, source, art_url, subject_to, subject_to_id, publisher, publisher_id, duration, create_at, explicit, type]);
                if (result.rowCount > 0) {
                    yield talesRef.doc(id).set(story);
                    response.status(200).json({
                        "message": "Successfully added.",
                        "body": story
                    });
                }
            }
            catch (error) {
                console.log(error);
                response.json({
                    "failed": "Error"
                });
            }
        });
    }
    forHumans(t) {
        var date = new Date(0);
        date.setMilliseconds(t);
        return date.toISOString().substr(11, 8);
    }
    toMilliseconds(duration) {
        return (duration.split(':')[0] * 60 * 60 + duration.split(':')[1] * 60 * 1000 + duration.split(':')[2] * 1000);
    }
}
const stories = new StoriesController();
exports.default = stories;
//# sourceMappingURL=stories_controller.js.map