import { Router } from 'express'
import utils from "../controllers/util.controller";

class UtilRouter {

    router: Router

    constructor() {
        this.router = Router()
        this.routes()
    }

    private routes() {
        this.router.post('/facebook-id/', utils.getFacebookId.bind(utils))
        this.router.post('/youtube-id/', utils.getYoutubeId.bind(utils))
    }
}

const utilRouter = new UtilRouter()
export default utilRouter.router