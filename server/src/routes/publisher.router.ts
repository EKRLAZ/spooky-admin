import { Router } from "express"
import publisher from "../controllers/publisher.controller"

class PublisherRouter {

    router: Router

    constructor() {
        this.router = Router()
        this.routes()
    }

    routes() { 

        this.router.get('/', publisher.get.bind(publisher))
        this.router.post('/',  publisher.create.bind(publisher))


    }

}

const routes = new PublisherRouter()

export default routes.router