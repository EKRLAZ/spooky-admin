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
const fs_extra_1 = __importDefault(require("fs-extra"));
var bot = require('nodemw');
var regex = /<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g;
class AlbumController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //const client = new bot({ server: 'creepypasta.fandom.com/es', path: '', debug: true })
            var jsonArray1 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Episodios_perdidos.json');
            var jsonArray2 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Ángeles.json');
            var jsonArray3 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Animales.json');
            var jsonArray4 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Aliens & Ovnis.json');
            var jsonArray5 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Bestiario.json');
            var jsonArray6 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Brujería & Hechicería.json');
            var jsonArray7 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Caricaturas.json');
            var jsonArray8 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Ciencia.json');
            var jsonArray9 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/CC.json');
            var jsonArray10 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/CO.json');
            var jsonArray11 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Demonios.json');
            var jsonArray12 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Fantasmas.json');
            var jsonArray13 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Holder.json');
            var jsonArray14 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Internet.json');
            var jsonArray15 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Lectura_sugerida.json');
            var jsonArray16 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Leyendas_urbanas.json');
            var jsonArray17 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Limbo.json');
            var jsonArray18 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Lugares.json');
            var jsonArray19 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Música.json');
            var jsonArray20 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Micropastas.json');
            var jsonArray21 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Muñecos.json');
            var jsonArray22 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/NRHT.json');
            var jsonArray23 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Otros.json');
            var jsonArray24 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Poemas.json');
            var jsonArray25 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Mentes_trastornadas.json');
            var jsonArray26 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Payasos.json');
            var jsonArray27 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Pokémon.json');
            var jsonArray28 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Rituales.json');
            var jsonArray29 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/SCP.json');
            var jsonArray30 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Series_de_televisión.json');
            var jsonArray31 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/SueñosDormir.json');
            var jsonArray32 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Teorías.json');
            var jsonArray33 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Vampiros.json');
            var jsonArray34 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Videojuegos.json');
            var jsonArray35 = yield fs_extra_1.default.readJson('/home/creepy/Plantillas/Zombis.json');
            /*  jsonArray1 = jsonArray1
               .concat(jsonArray2)
               .concat(jsonArray3)
               .concat(jsonArray4)
               .concat(jsonArray5)
               .concat(jsonArray6)
               .concat(jsonArray7)
               .concat(jsonArray8)
               .concat(jsonArray9)
               .concat(jsonArray10)
               .concat(jsonArray11)
               .concat(jsonArray12)
               .concat(jsonArray13)
               .concat(jsonArray14)
               .concat(jsonArray15)
               .concat(jsonArray16)
               .concat(jsonArray17)
               .concat(jsonArray18)
               .concat(jsonArray19)
               .concat(jsonArray20)
               .concat(jsonArray21)
               .concat(jsonArray22)
               .concat(jsonArray23)
               .concat(jsonArray24)
               .concat(jsonArray25)
               .concat(jsonArray26)
               .concat(jsonArray27)
               .concat(jsonArray28)
               .concat(jsonArray29)
               .concat(jsonArray30)
               .concat(jsonArray31)
               .concat(jsonArray32)
               .concat(jsonArray33)
               .concat(jsonArray34)
               .concat(jsonArray35)
     
     
     
     
           var seenNames: any = {};
     
           jsonArray1 = jsonArray1.filter(function (currentObject: any) {
               if (currentObject.pageid in seenNames && currentObject.title in seenNames) {
                   return false;
               } else {
                   seenNames[currentObject.pageid] = true;
                   seenNames[currentObject.title] = true;
     
                   return true;
               }
           });
     
     
           jsonArray1.forEach(async (story: any) => {
     
               const { pageid, title, body } = story
     
               let jso: any[] = []
     
               var result = JSON.stringify(jso, null, 2)
     
               try {
     
                   await pool.query(
                       'INSERT INTO stories (id, pageId, title, body, images, categories, create_at, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
                       [uuidv4(), pageid, title, body, result, result, 0, 0])
                   console.log(pageid);
               } catch (error) {
                   console.log(error);
     
               } finally {
                   console.log("FIN");
                   
               }
     
     
     
     
           });
     
           return res.status(200).json( "OK") */
            /*         const query = {
                        // give the query a unique name
            
                        text: 'SELECT * FROM stories WHERE create_at = $1 LIMIT 5',
                        values: [0],
                    }
            
            
                    var count = 0;
            
            
                    pool.query(query, (err, response) => {
            
            
            
            
            
                        response.rows.forEach(async element => {
            
            
                            try {
            
                                var uri = "https://creepypasta.fandom.com/es/api.php?action=query&prop=revisions&rvlimit=1&rvprop=timestamp&rvdir=newer&titles=" + encodeURIComponent(element.title) + "&format=json"
            
            
                                request(uri, async (err, response, body) => {
            
                                    let j = JSON.parse(body)
            
                                    console.log(element.title);
            
                                    var date = Date.parse(j.query.pages[element.pageid].revisions[0].timestamp)
            
                                    
            
                                    count += 1
            
                                    try {
            
            
                                        await pool.query('UPDATE stories SET create_at = $1  WHERE pageid = $2', [date, element.pageid])
                                        console.log(count);
            
            
                                    } catch (error) {
                                        console.log("Title:: " + element.title + ":::: E0" + error);
                                    }
            
                                })
            
            
            
                            } catch (error) {
                                console.log("Title:: " + element.title + ":::: E" + error);
            
                            }
            
            
            
            
                        })
            
                    }) */
            let response = yield psql_conn_1.default.query('SELECT * FROM stories');
            let data = JSON.stringify(response.rows, null, 4);
            fs_extra_1.default.writeFile('/home/creepy/Público/stories.json', data, (err) => {
                if (err)
                    throw err;
                console.log('Data written to file');
            });
            return res.status(200).json("OK Process..");
            /* try {
     
                let response: QueryResult = await pool.query('SELECT * FROM albums')
                return res.status(200).json(response.rows)
            } catch (error) {
                console.log(error);
                return res.status(500).json('Internal Server Error')
            } */
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                const { id, name, img_url, external_url, publisher_id, publisher, copyright, create_at, type } = req.body;
                console.log(name);
                let response = yield psql_conn_1.default.query('INSERT INTO albums (id, name, img_url, external_url, publisher, publisher_id, copyright, create_at, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [id, name, img_url, external_url, publisher, publisher_id, copyright, create_at, type]);
                let setDoc = conexion_1.default.collection('albums').doc(id);
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
const controller = new AlbumController();
exports.default = controller;
//# sourceMappingURL=album.controller.js.map