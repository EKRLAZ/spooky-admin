import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import compression from 'compression'

import StoriesRoutes  from './routes/stories_routes'
import PodcastsRouter from './routes/podcasts_router'
import UtilRouter from "./routes/util_router";
import PublisherRouter from './routes/publisher.router';
import SeriesRouter  from './routes/series.router'
import AlbumsRouter  from './routes/albums.router'

 
import CategoriesRouter from './routes/categories.router';
 
class Server {

    public app: express.Application
    

    constructor() {

        this.app = express()
        this.config()
        this.routes()
    
    }


    config() {

        this.app.set('port', process.env.PORT || 3000)

        this.app.use(cors())   
        this.app.use(morgan("dev"))
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended: true}))        
        this.app.use(compression())



    }


    routes() {
 
        this.app.use('/api/tales', StoriesRoutes)
        this.app.use('/api/podcasts', PodcastsRouter)
        this.app.use('/api/publishers', PublisherRouter)
        this.app.use('/api/series', SeriesRouter)
        this.app.use('/api/categories', CategoriesRouter)
        this.app.use('/api/albums', AlbumsRouter)

        this.app.use('/api/util/', UtilRouter)

  
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }

    stop() {
        
    }
}

const app =  new Server()
app.start()