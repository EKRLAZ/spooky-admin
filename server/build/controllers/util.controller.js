"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const request_1 = __importDefault(require("request"));
const crypto_1 = __importDefault(require("crypto"));
class UtilController {
    getFacebookId(req, res) {
        let url = req.body.facebook_url;
        this.facebookId(url, (result) => {
            if (result != null && result != 0) {
                res.status(200).json({
                    "id": result
                });
            }
            else {
                res.status(500).json({ "id": "XXXXXXXXX" });
            }
        });
    }
    facebookId(pageUrl, result) {
        let opt = {
            timeout: 600000,
            jar: request_1.default.jar(),
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.65 Safari/537.31'
            }
        };
        request_1.default(pageUrl, opt, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var fileName = crypto_1.default.createHash('md5').update(pageUrl).digest('hex') + '.log';
                fs_extra_1.default.writeFile(fileName, body, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        var regularExpresionMatch = /fb:\/\/(group|page|profile)\/(\d{1,})/gi;
                        var regularExpresionReplace = /fb:\/\/(group|page|profile)\//gi;
                        var matchArray = body.match(regularExpresionMatch);
                        if (matchArray && matchArray.length > 0) {
                            result(matchArray[0].replace(regularExpresionReplace, ''));
                        }
                        else {
                            result(0);
                        }
                        process.env.DEBUG && console.log(matchArray);
                        fs_extra_1.default.unlinkSync(fileName);
                    }
                });
            }
            else {
                result(0);
            }
        });
    }
    getYoutubeId(req, res) {
        let url = req.body.youtube_url;
        this.youtubeId(url, (result) => {
            if (result != null && result != 0) {
                res.status(200).json({
                    "id": result
                });
            }
            else {
                res.status(500).json({ "id": "Youtube-XXXXXX" });
            }
        });
    }
    youtubeId(pageUrl, result) {
        let opt = {
            timeout: 600000,
            jar: request_1.default.jar(),
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.65 Safari/537.31'
            }
        };
        request_1.default(pageUrl, opt, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var fileName = crypto_1.default.createHash('md5').update(pageUrl).digest('hex') + '.log';
                fs_extra_1.default.writeFile(fileName, body, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        let regex = /(vnd\.youtube:\/\/www\.youtube\.com\/channel)\/(.*?)"/;
                        // var regularExpresionMatch = /channel_id\=(.*?)",/gi
                        //let matchArray = this.getMatches(body, regularExpresionMatch, 1)
                        let matches = body.match(regex);
                        console.log(matches.length);
                        if (matches && matches.length > 0) {
                            result(matches[2]);
                        }
                        else {
                            result(0);
                        }
                        process.env.DEBUG && console.log(matches);
                        fs_extra_1.default.unlinkSync(fileName);
                    }
                });
            }
            else {
                result(0);
            }
        });
    }
    getMatches(string, regex, index) {
        index || (index = 1); // default to the first capturing group
        var matches = [];
        var match;
        while (match = regex.exec(string)) {
            matches.push(match[index]);
        }
        return matches;
    }
}
const utils = new UtilController();
exports.default = utils;
//# sourceMappingURL=util.controller.js.map