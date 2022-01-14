import express, { Request, Response } from 'express';

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
        this.app.get('/', (req: Request, res: Response) => {
            res.send("Hello, class!");
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