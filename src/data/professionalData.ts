import { Professional } from './../utils/types';

import db from '../infra/database';

export class ProfessionalData {
    getProfessionals() {
        const response = db.query('SELECT * FROM barber.professional');

        return response;
    };

    getProfessionalById(id: number) {

        return db.oneOrNone('SELECT * FROM barber.professional WHERE id = $1', [id]);
    };

    getProfessionalByEmail(email: string) {

        return db.oneOrNone('SELECT * FROM barber.professional WHERE email = $1', [email]);
    };

    saveProfessional(professional: Professional) {

        return db.one('INSERT INTO barber.professional (name, email) VALUES ($1, $2) returning *',
            [professional.name, professional.email]);
    };

    updateProfessional(id: number, professional: Professional) {

        return db.none('UPDATE barber.professional SET name = $1, email = $2 WHERE id = $3',
            [professional.name, professional.email, id]);
    };

    deleteProfessional(id: number) {

        return db.none('DELETE FROM barber.professional WHERE id = $1', [id]);
    };
}
