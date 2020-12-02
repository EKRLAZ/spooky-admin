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
exports.PodcastsController = void 0;
const psql_conn_1 = __importDefault(require("../psql-conn"));
const conexion_1 = __importDefault(require("../conexion"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const rss_parser_1 = __importDefault(require("rss-parser"));
const uuid_1 = require("uuid");
class PodcastsController {
    constructor() {
        this.contador = 0;
    }
    podcasts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield psql_conn_1.default.query('SELECT * FROM podcaster');
                console.log(response.rows);
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
            let podcastsRef = conexion_1.default.collection('podcasters');
            try {
                const { id, name, description, img_url, instagram, facebook, twitter, youtube, web, create_at, type, explicit } = req.body;
                let response = yield psql_conn_1.default.query('INSERT INTO podcaster (id, name, description, img_url, instagram, facebook, twitter, youtube, web, create_at, type, explicit) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', [id, name, description, img_url, instagram, facebook, twitter, youtube, web, create_at, type, explicit]);
                if (response.rowCount > 0) {
                    yield podcastsRef.doc(id).set(req.body);
                    res.status(200).json({
                        "message": "Saved Successfully!!"
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
    parsePodcast(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs_extra_1.default.readJson('/home/creepy/Público/json db/base normal/rss_relatos_de_horror.json');
                var stories = [];
                var json = {};
                for (const key in data) {
                    var story = data[key];
                    let result = this.generate(story);
                    let setDoc = conexion_1.default.collection('tales').doc(result.id);
                    json[key] = result;
                    yield setDoc.set(result).then(success => {
                        console.log(success);
                    }).catch(error => {
                        console.log(error);
                    });
                }
                res.json(json);
            }
            catch (error) {
                console.log(error);
                res.json({
                    "error": error,
                    "code": 500
                });
            }
        });
    }
    generate(story) {
        return {
            "id": story.episodeId.__text,
            "title": story.title,
            "description": story.description.__cdata,
            "source": story.enclosure._url,
            "art_url": this.existUrl(story),
            "subject_to": "Relatos De Horror (Historias De Terror)",
            "subject_to_id": "ef4e1f5b-39ff-4999-abfb-e643c2f2f676",
            "publisher": "",
            "publisher_id": "",
            "duration": this.toMilliseconds(story.duration.__text),
            "create_at": new Date(story.pubDate).getTime(),
            "explicit": false,
            "type": 3
        };
    }
    existUrl(data) {
        if (!(data.image === undefined)) {
            return this.decodeMyUrl(data.image._href);
        }
        else {
            return "https://acast-media.s3.eu-west-1.amazonaws.com/assets/b03e3a16-b9c8-5f9c-87aa-916e569f05bc/ddb417c4-950c-4dd3-afe0-e0bb08ef5a7b/4ae133f84bdab168bce9d2d1b0388995.jpg";
        }
    }
    decodeMyUrl(url) {
        let uri = decodeURIComponent(url);
        let path = uri.split('https://')[2];
        return 'https://' + path;
    }
    toMilliseconds(duration) {
        var a = duration.split(':');
        var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
        return seconds * 1000;
    }
    forHumans(t) {
        var date = new Date(0);
        date.setMilliseconds(t);
        return date.toISOString().substr(11, 8);
    }
    cleanUUId(data) {
        if (!(data.episodeId === undefined)) {
            this.contador = this.contador + 1;
            console.log(this.contador);
            //let seg = id.substring(id.lastIndexOf('/') + 1)
            // 20
            return true;
        }
        else {
            return false;
        }
    }
    read(request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let talesRef = conexion_1.default.collection('tales');
            const parser = new rss_parser_1.default();
            try {
                let feed = yield parser.parseURL('http://psicofonias.com.mx/psicofeed.xml');
                var json = {};
                let count = 0;
                (_a = feed.items) === null || _a === void 0 ? void 0 : _a.forEach((result) => __awaiter(this, void 0, void 0, function* () {
                    let data = this.anchorToSpooky(result);
                    var { id, title, description, source, art_url, subject_to, subject_to_id, publisher, publisher_id, duration, create_at, explicit, type } = data;
                    console.log(data);
                    //let query =  await pool.query('DELETE FROM tales WHERE subject_to_id=$1', [ids])
                    /*                 let doc = await talesRef.where('subject_to_id', '==', ids).get()
                                    
                                    doc.forEach( element => {
                                        element.ref.delete()
                                        console.log('----deleting ');
                                        
                                    })
                    
     
                    // */
                    /*                 let query = await pool.query('INSERT INTO tales (id, title, description, source, art_url, subject_to, subject_to_id, publisher, publisher_id, duration, create_at, explicit, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
                                        [id, title, description, source, art_url, subject_to, subject_to_id, publisher, publisher_id, duration, create_at, explicit, type])
                    
                    
                                    if (query.rowCount > 0) {
                                        await talesRef.doc(id).set(data)
                                        count = count + 1
                                        console.log("Ok", count);
                                    }  */
                }));
                response.json({
                    "Podcas Saved = ": count
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    anchorToSpooky(story) {
        return {
            "id": this.validUUID(story.guid),
            "title": story.title,
            "description": story.content,
            "source": story.enclosure.url,
            "art_url": this.validImg(story.itunes.image),
            "subject_to": "Relatos de la Noche",
            "subject_to_id": "f4547246-cc8a-4b40-965b-3098bb15c75b",
            "publisher": "Relatos de la Noche",
            "publisher_id": "00000000-0000-0000-0000-000000000000",
            "duration": this.validDuration(story.itunes.duration),
            "create_at": Math.floor(new Date(story.pubDate).getTime() / 1000.0),
            "explicit": false,
            "type": 3
        };
    }
    validUUID(uuid) {
        let regex = /^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/;
        if (uuid.match(regex)) {
            return uuid;
        }
        else {
            return uuid_1.v4();
        }
    }
    validDuration(duration) {
        let time;
        if (duration.includes(":")) {
            time = this.toMilliseconds(duration);
        }
        else {
            time = (parseInt(duration) * 1000);
        }
        return time;
    }
    validImg(url) {
        if (url == undefined) {
            return "http://psicofonias.com.mx/podcast/psicologoFBGen.jpg";
        }
        else {
            return url;
        }
    }
}
exports.PodcastsController = PodcastsController;
const podcasts = new PodcastsController();
exports.default = podcasts;
//# sourceMappingURL=podcasts_controller.js.map