import { Router } from 'express'
 
import stories from '../controllers/stories_controller'
 

class StoriesRoutes {
    
    router: Router

    constructor() {
        this.router = Router()
        this.routes()
    }

    routes() {

        this.router.get('/', stories.get.bind(stories))

             
        // this.router.get('/:id', stories.geById);
        this.router.post('/', stories.create.bind(stories))     

    }

}


const storiesRoutes = new StoriesRoutes() 
export default storiesRoutes.router;