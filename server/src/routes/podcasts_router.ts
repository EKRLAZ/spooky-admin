import { Router } from 'express'
import podcasts from '../controllers/podcasts_controller'

class PodcastsRouter {

    router: Router

    constructor() {
        this.router = Router()
        this.routes()
    }

    routes() {

        this.router.get('/', podcasts.podcasts.bind(podcasts))
        this.router.post('/', podcasts.create.bind(podcasts))
        this.router.get('/parsear', podcasts.parsePodcast.bind(podcasts))
        this.router.get('/read', podcasts.read.bind(podcasts))




    }

}

const podcastsRouter = new PodcastsRouter()

export default podcastsRouter.router