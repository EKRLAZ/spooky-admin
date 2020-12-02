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
class CategoriesController {
    get(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 00000000-0000-0000-0000-000000000000
                let result = yield psql_conn_1.default.query('SELECT * FROM categories');
                return response.status(200).json(result.rows);
            }
            catch (error) {
                console.log(error);
                return response.status(500).json('Internal Server Error');
            }
        });
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let categoriestsRef = conexion_1.default.collection('categories');
            console.log(Object.keys(request.body).length);
            if (Object.keys(request.body).length == 0) {
                response.status(400).json({
                    "code": 400,
                    "message": "The server did not understand the request."
                });
            }
            else {
            }
            /*         try {
            
                        const { id, name, description, img_url, create_at, type } = request.body
            
                        let result = await pool.query('INSERT INTO categories (id, name, description, img_url, create_at, type, explicit) VALUES ($1, $2, $3, $4, $5, $6)',
                            [id, name, description, img_url, create_at, type])
            
                        if (result.rowCount > 0) {
            
                            await categoriestsRef.doc(id).set(request.body)
            
                            response.status(200).json({
                                "message": "Successfully added.",
                                "body": request.body
                            })
                        }
            
                    } catch (error) {
                        
                        response.status(500).json({
                            "message": "Oppss !! ALgo salio mal",
                            "body": error
                        })
                    } */
        });
    }
}
const controller = new CategoriesController();
exports.default = controller;
//# sourceMappingURL=categories.controller.js.map