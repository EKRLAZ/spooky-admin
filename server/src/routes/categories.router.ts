import { Router } from 'express'

import categories from '../controllers/categories.controller';

class CategoriesRouter {
    router: Router

    constructor() {
        this.router = Router()
        this.routes()
    }

    routes() {

        this.router.get('/', categories.get.bind(categories))
        this.router.post('/', categories.create.bind(categories))

    
    }

}

const router = new CategoriesRouter()

export default router.router