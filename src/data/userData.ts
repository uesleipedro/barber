import { User } from './../utils/types';

import db from '../infra/database';

export class UserData {
    getUsers() {
        const response = db.query('SELECT * FROM barber.user');
        return response;
    };

    getUserById(id: number) {

        return db.oneOrNone('SELECT * FROM barber.user WHERE id = $1', [id]);
    };

    getUserByEmail(email: string) {

        return db.oneOrNone('SELECT * FROM barber.user WHERE email = $1', [email]);
    };

    saveUser(user: User) {

        return db.one('INSERT INTO barber.user (name, email) VALUES ($1, $2) returning *', [user.name, user.email]);
    };

    updateUser(id: number, user: User) {

        return db.none('UPDATE barber.user SET name = $1, email = $2 WHERE id = $3', [user.name, user.email, id]);
    };

    deleteUser(id: number) {

        return db.none('DELETE FROM barber.user WHERE id = $1', [id]);
    };
}
