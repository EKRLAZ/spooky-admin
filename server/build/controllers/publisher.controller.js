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
class PublisherController {
    constructor() {
        this.count = 0;
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield psql_conn_1.default.query('SELECT * FROM publishers');
                res.json(data.rows);
            }
            catch (err) {
                console.error(err);
                res.send('Failed');
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let podcastsRef = conexion_1.default.collection('publishers');
            try {
                const { id, name, description, img_url, instagram, facebook, twitter, youtube, web, create_at, type } = req.body;
                let response = yield psql_conn_1.default.query('INSERT INTO publishers (id, name, description, img_url, instagram, facebook, twitter, youtube, web, create_at, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [id, name, description, img_url, instagram, facebook, twitter, youtube, web, create_at, type]);
                if (response.rowCount > 0) {
                    yield podcastsRef.doc(id).set(req.body);
                    res.status(200).json({
                        "message": "success",
                        "body": req.body
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    "message": "Oppss !! ALgo salio mal",
                    "body": error
                });
            }
        });
    }
    creates(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*       try {
    
    
                let json: any = {}
                const data = await fs.readJson('/home/creepy/Público/json db/base normal/podcastfromrss.json');
    
    
                for (const key in data) {
    
                    const element = data[key]
    
                    let d = this.generate(element)
    
                    if (!this.cleanUUId(element.guid.__text)) {
    
                        json[element.guid.__text] = d
    
    
    
        /*                 let setDoc = db.collection('tales').doc(d.id)
    
                        await setDoc.set(d).then(result => {
                            console.log(result);
    
                        }).catch(error => {
                            console.log(error);
    
                        })
    
                    }
    
    
                }
    
                res.json(json)
    
    
            } catch (err) {
                console.error(err)
                res.send('Failed')
            } */
        });
    }
    generate(story) {
        return {
            "id": story.guid.__text,
            "description": story.description.__cdata.replace(/<(.|\n)*?>/g, ''),
            "title": story.title.__cdata,
            "source": this.decodeMyUrl(story.enclosure._url),
            "art_url": "https://i.imgur.com/kpeYBSV.jpg?1",
            "subject_to": "Las Historias Ocultas de la Mano Peluda",
            "subject_to_id": "1a19d5f1-039c-40ad-936e-79076200bbfb",
            "publisher": "",
            "publisher_id": "",
            "duration": parseInt(story.duration.__text) * 1000,
            "create_at": new Date(story.pubDate).getTime(),
            "explicit": false,
            "type": 3
        };
    }
    decodeMyUrl(url) {
        let uri = decodeURIComponent(url);
        let path = uri.split('https://')[2];
        return 'https://' + path;
    }
    cleanUUId(id) {
        if (id.includes('http://www.ivoox.com/')) {
            this.count = this.count + 1;
            //let seg = id.substring(id.lastIndexOf('/') + 1)
            // 20
            console.log(this.count);
            return true;
        }
        else {
            return false;
        }
    }
}
const controller = new PublisherController();
exports.default = controller;
//# sourceMappingURL=publisher.controller.js.map