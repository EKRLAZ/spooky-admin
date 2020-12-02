import { Request, Response, urlencoded, response } from 'express';

import pool from "../psql-conn";
import { QueryResult } from 'pg';
import db from '../conexion'

import fs from 'fs-extra'
import { timeStamp, log } from 'console';
import { v4 as uuidv4 } from 'uuid';


import request from 'request'
import { url } from 'inspector';



var bot = require('nodemw');

var regex = /<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g

class AlbumController {



    async get(req: Request, res: Response) {

        try {
 
            let response: QueryResult = await pool.query('SELECT * FROM albums')
            return res.status(200).json(response.rows)
        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error')
        }  
    }




    async create(req: Request, res: Response) {


        console.log(req.body);




        try {

            const { id, name, img_url, external_url, publisher_id, publisher, copyright, create_at, type } = req.body

            console.log(name);


            let response = await pool.query(
                'INSERT INTO albums (id, name, img_url, external_url, publisher, publisher_id, copyright, create_at, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                [id, name, img_url, external_url, publisher, publisher_id, copyright, create_at, type])


            let setDoc = db.collection('albums').doc(id)

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

const controller = new AlbumController()
export default controller