import { Request, Response } from 'express';

import pool from "../psql-conn";
import { QueryResult } from 'pg';
import db from '../conexion'



class SeriesController {


    async get(req: Request, res: Response) {
        try {

            let response: QueryResult = await pool.query('SELECT * FROM series')
            return res.status(200).json(response.rows)
        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error')
        }
    }



    async create(req: Request, res: Response) {

        try {

            const { id, name, description, img_url, external_story_link, publisher_id, publisher, explicit, create_at, type } = req.body

            console.log(name);



            let response = await pool.query(
                'INSERT INTO series (id, name, description, img_url, external_story_link, publisher_id, publisher, explicit, create_at, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
                [id, name, description, img_url, external_story_link, publisher_id, publisher, explicit, create_at, type])


            let setDoc = db.collection('series').doc(id)

            if (response.rowCount > 0) {
                await setDoc.set(req.body).then(result => {
                    res.status(200).json({
                        "message": "Serie Created Successfully",
                        "body": req.body
                    })

                }).catch(error => {
                    res.status(500).json({
                        "message": "Oppss !! ALgo salio mal",
                        "body": error
                    })

                })
            }


        } catch (error) {
            console.log(error);
            res.status(500).json({
                "message": "Oppss !! ALgo salio mal",
                "body": error
            })
        }
    }

    
}
const controller = new SeriesController()
export default controller