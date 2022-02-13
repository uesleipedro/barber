import { ScheduleProps } from './../utils/types';
import db from '../infra/database';

export class ScheduleData {
    getSchedules() {
        const response = db.query('SELECT * FROM barber.schedule');
        return response;
    };

    getScheduleById(id: number) {

        return db.oneOrNone('SELECT * FROM barber.schedule WHERE id = $1', [id]);
    };

    getUserByEmail(email: string) {

        return db.oneOrNone('SELECT * FROM barber.user WHERE email = $1', [email]);
    };

    saveSchedule(schedule: ScheduleProps) {
        const camelToSnakeCase = (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

        let fields = '';
        Object.keys(schedule).map((field) => { fields += `${camelToSnakeCase(field)},` });
        fields = fields.slice(0, -1);
        const values = Object.values(schedule);
        
        return db.one(`INSERT INTO barber.schedule (${fields}) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`, values);
    };

    updateSchedule(id: number, schedule: ScheduleProps) {
        const camelToSnakeCase = (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

        let fields = '';
        Object.keys(schedule).map((field, index) => { fields += `${camelToSnakeCase(field)} = $${index + 1},` });
        fields = fields.slice(0, -1);

        let values = Object.values(schedule);
        values.push(id);

        return db.none(`UPDATE barber.schedule SET ${fields} WHERE id = $${values.length}`, values);
    };

    deleteSchedule(id: number) {

        return db.none('DELETE FROM barber.schedule WHERE id = $1', [id]);
    };
}
