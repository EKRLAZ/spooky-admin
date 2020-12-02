import { Request, Response, Router } from 'express'
import fs from 'fs-extra'

import pool from '../psql-conn';
import db from '../conexion';
import { QueryResult } from 'pg';

class StoriesController {


    index(req: Request, res: Response) {

        res.send('Stories')
    }


    async get(request: Request, response: Response) {

        try {

            // 00000000-0000-0000-0000-000000000000

            let result: QueryResult = await pool.query('SELECT * FROM tales ORDER BY create_at DESC LIMIT 12 ')

            return response.status(200).json(result.rows)

        } catch (error) {

            console.log(error);

            return response.status(500).json('Internal Server Error')
        }

    }


    async stories(req: Request, res: Response) {

        try {


            const data = await fs.readJson('/home/creepy/Público/json db/base normal/stories.json');

            var stories = []

            var json = {}

            for (const key in data) {

                var story = data[key]
                stories.push(story)

            }


            let f = stories.sort((a, b) => b.create_at - a.create_at).slice(0, 12)


            res.json(f)

        } catch (error) {
            console.log(error);

        }


    }


    async create(request: Request, response: Response) {

        let talesRef = db.collection('tales')

        try {


            let story = request.body
            story.duration = this.toMilliseconds(story.duration)

            var {
                id,
                title,
                description,
                source,
                art_url,
                subject_to,
                subject_to_id,
                publisher,
                publisher_id,
                duration,
                create_at,
                explicit,
                type
            } = story



            if (publisher_id == "") {
                publisher_id = "00000000-0000-0000-0000-000000000000"
            }


            let result = await pool.query('INSERT INTO tales (id, title, description, source, art_url, subject_to, subject_to_id, publisher, publisher_id, duration, create_at, explicit, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
                [id, title, description, source, art_url, subject_to, subject_to_id, publisher, publisher_id, duration, create_at, explicit, type])


            if (result.rowCount > 0) {

                await talesRef.doc(id).set(story)
                response.status(200).json({
                    "message": "Successfully added.",
                    "body": story
                })
            }


        } catch (error) {

            console.log(error);
            response.json({
                "failed": "Error"
            })

        }

    }


    forHumans(t: any) {

        var date = new Date(0)
        date.setMilliseconds(t)
        return date.toISOString().substr(11, 8)

    }


    toMilliseconds(duration: any) {
        return (duration.split(':')[0] * 60 * 60 + duration.split(':')[1] * 60 * 1000 + duration.split(':')[2] * 1000)
    }





}

const stories = new StoriesController()

export default stories







