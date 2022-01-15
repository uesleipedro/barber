import express, { Request, Response } from 'express';
import userRoute from './routes/userRoute';

class Server {
    private app: express.Application;

    constructor() {
        this.app = express();
        this.configuration();
        this.routes();
    }

    public configuration() {
        this.app.set('port', process.env.PORT || 3000);
    }

    public routes() {
        this.app.use('/user', userRoute);
        this.app.get('/', (req, res) =>{
            res.send("API ON");
        });
    }

    public start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server is listening in port ${this.app.get('port')}.`)
        })
    }
}

const server = new Server();
server.start();