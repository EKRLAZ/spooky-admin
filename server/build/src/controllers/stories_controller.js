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
class StoriesController {
    index(req, res) {
        res.send('Stories');
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
                res.json(stories);
                /*             let setDoc = db.collection('tales').get()
                            setDoc.then(snapshot => {
                                snapshot.forEach(doc => {
                
                                    //let numkey = Object.keys(doc.data()).length
                
                                    
                
                                    // console.log(doc.id, '=>', doc.data());
                                });
                                
                                
                
                            })
                                .catch(err => {
                                    console.log(err);
                
                                }) */
                /*             for (const key in data) {
                
                
                                var story = data[key]
                
                                var id = uuidv4()
                                story.id = id
                
                
                
                                if (story.genre === 'Podcast') {
                                    //json[id] = this.generateJsonPodcasts(story)
                                } else if (story.genre === 'Miniseries' && story.narrator === 'La Dama De Blanco') {
                                    //json[id] = this.generateJsonSerie(story)
                                } else if (story.category === "Relatos Del Mas Alla"  || story.category == "Mas Conocidas" ) {
                                    // json[id] = this.generateJsonPodcasts(story)
                                } else {
                                    // json[id] = this.generateJsonStory(story)
                                }
                                
                               
                
                
                            } */
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
const stories = new StoriesController();
exports.default = stories;
//# sourceMappingURL=stories_controller.js.map