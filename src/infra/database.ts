import pgPromise from 'pg-promise';
const pgp = pgPromise({});
import 'dotenv/config';

const db = pgp({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.HOST,
    port: 5432,
    database: process.env.DATABASE_NAME
});

export default db;