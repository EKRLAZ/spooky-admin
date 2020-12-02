import { Router } from 'express';
import controller from '../controllers/series.controller';

class SeriesRouter {

    router: Router

    constructor() {
        this.router =  Router()
        this.routes()
    }


    routes() { 

        this.router.get('/', controller.get.bind(controller))
        this.router.post('/',  controller.create.bind(controller))
    

        /*             this.router.post('/facebook-id/', podcasts.getFacebookId.bind(podcasts))
        this.router.post('/youtube-id/', podcasts.getYoutubeId.bind(podcasts))
  
          this.router.get('/:id', stories.geById);
                */

    }
}

const router = new SeriesRouter()
export default router.router