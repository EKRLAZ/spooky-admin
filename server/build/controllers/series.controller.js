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
const psql_conn_1 = __importDefault(require("../psql-conn"));
const conexion_1 = __importDefault(require("../conexion"));
class SeriesController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield psql_conn_1.default.query('SELECT * FROM series');
                return res.status(200).json(response.rows);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json('Internal Server Error');
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, name, description, img_url, external_story_link, publisher_id, publisher, explicit, create_at, type } = req.body;
                console.log(name);
                let response = yield psql_conn_1.default.query('INSERT INTO series (id, name, description, img_url, external_story_link, publisher_id, publisher, explicit, create_at, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [id, name, description, img_url, external_story_link, publisher_id, publisher, explicit, create_at, type]);
                let setDoc = conexion_1.default.collection('series').doc(id);
                if (response.rowCount > 0) {
                    yield setDoc.set(req.body).then(result => {
                        res.status(200).json({
                            "message": "Serie Created Successfully",
                            "body": req.body
                        });
                    }).catch(error => {
                        res.status(500).json({
                            "message": "Oppss !! ALgo salio mal",
                            "body": error
                        });
                    });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    "message": "Oppss !! ALgo salio mal",
                    "body": error
                });
            }
        });
    }
}
const controller = new SeriesController();
exports.default = controller;
//# sourceMappingURL=series.controller.js.map