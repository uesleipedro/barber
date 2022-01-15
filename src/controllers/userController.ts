import db from '../infra/database';

export class UserController {

    index() {
        const response = db.query('SELECT * FROM barber.user');
        return response;
    }
}