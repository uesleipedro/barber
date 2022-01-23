import 'dotenv/config';
import { app } from './app';

const port = (process.env.PORT || '3000');

const server =
    app.listen(port, () => console.log(`running on port ${port}`));

process.on('SIGINT', () => {
    server.close();
    console.log('Connection closed');
});
