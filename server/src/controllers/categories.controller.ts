import { Request, Response } from 'express';
import pool from '../psql-conn';
import db from '../conexion';
import fs from 'fs-extra'
import { QueryResult } from 'pg';

import { v5 as uuidv5 } from 'uuid';


class CategoriesController {


    async get(request: Request, response: Response) {


        try {


            // 00000000-0000-0000-0000-000000000000

            let result: QueryResult = await pool.query('SELECT * FROM categories')

            return response.status(200).json(result.rows)

        } catch (error) {

            console.log(error);

            return response.status(500).json('Internal Server Error')
        }


    }


    async create(request: Request, response: Response) {

        let categoriestsRef = db.collection('categories')

        console.log(Object.keys(request.body).length);

        if (Object.keys(request.body).length == 0) {
            response.status(400).json({
                "code": 400,
                "message": "The server did not understand the request."
            })
        } else {

        }



        /*         try {
        
                    const { id, name, description, img_url, create_at, type } = request.body
        
                    let result = await pool.query('INSERT INTO categories (id, name, description, img_url, create_at, type, explicit) VALUES ($1, $2, $3, $4, $5, $6)',
                        [id, name, description, img_url, create_at, type])
        
                    if (result.rowCount > 0) {
        
                        await categoriestsRef.doc(id).set(request.body)
        
                        response.status(200).json({
                            "message": "Successfully added.",
                            "body": request.body
                        })
                    }
        
                } catch (error) {
                    
                    response.status(500).json({
                        "message": "Oppss !! ALgo salio mal",
                        "body": error
                    })
                } */


    }
}

const controller = new CategoriesController()
export default controller