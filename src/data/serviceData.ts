import { Service } from './../utils/types';

import db from '../infra/database';

export class ServiceData {
    getServices() {
        const response = db.query('SELECT * FROM barber.service');

        return response;
    };

    getServiceById(id: number) {

        return db.oneOrNone('SELECT * FROM barber.service WHERE id = $1', [id]);
    };

    getServiceByDescribe(describe: string) {

        return db.oneOrNone('SELECT * FROM barber.service WHERE describe = $1', [describe]);
    };

    saveService(service: Service) {

        return db.one('INSERT INTO barber.service (describe, time, price) VALUES ($1, $2, $3) returning *',
            [service.describe, service.time, service.price]);
    };

    updateService(id: number, service: Service) {

        return db.none('UPDATE barber.service SET describe = $1, time = $2, price = $3 WHERE id = $4',
            [service.describe, service.time, service.price, id]);
    };

    deleteService(id: number) {

        return db.none('DELETE FROM barber.service WHERE id = $1', [id]);
    };
}
