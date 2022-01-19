
import db from '../infra/database';

export class UserData {
    getUsers() {
        const response = db.query('SELECT * FROM barber.user');
        return response;
    };

    getUserById(id: any) {

        return db.oneOrNone('SELECT * FROM barber.user WHERE id = $1', [id]);
    };

    getUserByEmail(email: any) {

        return db.oneOrNone('SELECT * FROM barber.user WHERE email = $1', [email]);
    };

    saveUser(post: any) {

        return db.one('INSERT INTO barber.user (name, email) VALUES ($1, $2) returning *', [post.name, post.email]);
    };

    updateUser(id: any, user: any) {

        return db.none('UPDATE barber.user SET name = $1, email = $2 WHERE id = $3', [user.name, user.email, id]);
    };

    deleteUser(id: any) {

        return db.none('DELETE FROM barber.user WHERE id = $1', [id]);
    };
}
