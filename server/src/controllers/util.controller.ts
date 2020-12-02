import { Request, Response } from 'express'
import fs from 'fs-extra'
import request from 'request'
import crypto from 'crypto';


class UtilController {



    getFacebookId(req: Request, res: Response) {


        let url = req.body.facebook_url



        this.facebookId(url, (result: number) => {



            if (result != null && result != 0) {
                res.status(200).json({
                    "id": result
                })
            } else {
                res.status(500).json({ "id": "XXXXXXXXX" })
            }


        })
    }


    facebookId(pageUrl: string, result: (value: any) => void) {

        let opt = {
            timeout: 600000,
            jar: request.jar(),
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.65 Safari/537.31'
            }
        }

        request(pageUrl, opt, (error: any, response: request.Response, body: any): void => {


            if (!error && response.statusCode == 200) {

                var fileName = crypto.createHash('md5').update(pageUrl).digest('hex') + '.log';

                fs.writeFile(fileName, body, (err): void => {

                    if (err) {

                        console.log(err);

                    } else {
                        var regularExpresionMatch = /fb:\/\/(group|page|profile)\/(\d{1,})/gi;
                        var regularExpresionReplace = /fb:\/\/(group|page|profile)\//gi;
                        var matchArray = body.match(regularExpresionMatch);


                        if (matchArray && matchArray.length > 0) {
                            result(matchArray[0].replace(regularExpresionReplace, ''));
                        } else {
                            result(0);
                        }

                        process.env.DEBUG && console.log(matchArray);

                        fs.unlinkSync(fileName);

                    }
                });
            } else {
                result(0)
            }

        })

    }



    getYoutubeId(req: Request, res: Response) {



        let url = req.body.youtube_url


        this.youtubeId(url, (result: number) => {



            if (result != null && result != 0) {
                res.status(200).json({
                    "id": result
                })
            } else {
                res.status(500).json({ "id": "Youtube-XXXXXX" })
            }

        })

    }


    youtubeId(pageUrl: string, result: (value: any) => void) {

        let opt = {
            timeout: 600000,
            jar: request.jar(),
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.65 Safari/537.31'
            }
        }

        request(pageUrl, opt, (error: any, response: request.Response, body: any): void => {






            if (!error && response.statusCode == 200) {

                var fileName = crypto.createHash('md5').update(pageUrl).digest('hex') + '.log';

                fs.writeFile(fileName, body, (err): void => {

                    if (err) {

                        console.log(err);

                    } else {

                        let regex = /(vnd\.youtube:\/\/www\.youtube\.com\/channel)\/(.*?)"/

                        // var regularExpresionMatch = /channel_id\=(.*?)",/gi


                        //let matchArray = this.getMatches(body, regularExpresionMatch, 1)

                    
                        let matches = body.match(regex)

                        console.log(matches.length);
                        

                        if (matches && matches.length > 0) {
                            result(matches[2]);
                        } else {
                            result(0);
                        }

                      
                        process.env.DEBUG && console.log(matches);

                        fs.unlinkSync(fileName);

                    }
                });
            } else {
                result(0)
            }

        })

    }




    getMatches(string: String, regex: any, index: number) {

        index || (index = 1); // default to the first capturing group
        var matches = [];
        var match;
        while (match = regex.exec(string)) {
            matches.push(match[index]);
        }
        return matches;

    }

}
const utils = new UtilController()
export default utils