import { Request, Response } from 'express';
import fs from 'fs-extra';
import pool from '../psql-conn';
import db from '../conexion';
import { v4 as uuidv4 } from 'uuid';
import { v5 as uuidv5 } from 'uuid';



class PublisherController {

    async get(req: Request, res: Response) {

        try {

            const data = await pool.query('SELECT * FROM publishers')
            res.json(data.rows)

        } catch (err) {

            console.error(err)
            res.send('Failed')
        
        }

    }

    async create(req: Request, res: Response) {

        let podcastsRef = db.collection('publishers')

        try {

            const { id, name, description, img_url, instagram, facebook, twitter, youtube, web, create_at, type } = req.body

            let response = await pool.query('INSERT INTO publishers (id, name, description, img_url, instagram, facebook, twitter, youtube, web, create_at, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
                [id, name, description, img_url, instagram, facebook, twitter, youtube, web, create_at, type])

            if (response.rowCount > 0) {
                await podcastsRef.doc(id).set(req.body)

                res.status(200).json({
                    "message": "success",
                    "body": req.body
                })
            }

        } catch (error) {
            
            res.status(500).json({
                "message": "Oppss !! ALgo salio mal",
                "body": error
            })
        }

    }

    async creates(req: Request, res: Response) {
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
    }

    generate(story: any) {

        return {
            "id": story.guid.__text,
            "description": story.description.__cdata.replace(/<(.|\n)*?>/g, ''),
            "title": story.title.__cdata,
            "source": this.decodeMyUrl(story.enclosure._url),
            "art_url": "https://i.imgur.com/kpeYBSV.jpg?1", // story.image._href,
            "subject_to": "Las Historias Ocultas de la Mano Peluda",
            "subject_to_id": "1a19d5f1-039c-40ad-936e-79076200bbfb",
            "publisher": "",
            "publisher_id": "",
            "duration": parseInt(story.duration.__text) * 1000,
            "create_at": new Date(story.pubDate).getTime(),
            "explicit": false,
            "type": 3
        }
    }




    decodeMyUrl(url: string) {

        let uri = decodeURIComponent(url)


        let path = uri.split('https://')[2]

        return 'https://' + path

    }


    count = 0

    cleanUUId(id: string) {

        if (id.includes('http://www.ivoox.com/')) {

            this.count = this.count + 1

            //let seg = id.substring(id.lastIndexOf('/') + 1)
            // 20
            console.log(this.count);
            return true
        } else {
            return false
        }

    }
}

const controller = new PublisherController()
export default controller