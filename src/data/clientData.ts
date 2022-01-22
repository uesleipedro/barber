import { Client } from './../utils/types';
import db from '../infra/database';

export class ClientData {
    getClients() {
        const response = db.query('SELECT * FROM barber.client');
        return response;
    };

    getClientById(id: number) {

        return db.oneOrNone('SELECT * FROM barber.client WHERE id = $1', [id]);
    };

    getClientByEmail(email: string) {

        return db.oneOrNone('SELECT * FROM barber.client WHERE email = $1', [email]);
    };

    saveClient(client: Client) {

        return db.one('INSERT INTO barber.client (name, email) VALUES ($1, $2) returning *', [client.name, client.email]);
    };

    updateClient(id: number, client: Client) {

        return db.none('UPDATE barber.client SET name = $1, email = $2 WHERE id = $3', [client.name, client.email, id]);
    };

    deleteClient(id: number) {

        return db.none('DELETE FROM barber.client WHERE id = $1', [id]);
    };
}
