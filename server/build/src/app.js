"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const stories_routes_1 = __importDefault(require("./routes/stories_routes"));
const podcasts_router_1 = __importDefault(require("./routes/podcasts_router"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(cors_1.default());
        this.app.use(morgan_1.default("dev"));
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(compression_1.default());
    }
    routes() {
        this.app.use('/api/stories', stories_routes_1.default);
        this.app.use('/api/podcasts', podcasts_router_1.default);
        /*
         this.app.use('/api/categories', categories)
         this.app.use('/api/persons', narratorsRoutes) */
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
    stop() {
    }
}
const app = new Server();
app.start();
//# sourceMappingURL=app.js.map