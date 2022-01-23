import { ScheduleProps } from './../utils/types';
import { ScheduleData } from "../data/scheduleData";

const scheduleData = new ScheduleData();

export class ScheduleController {
    getSchedules() {

        return scheduleData.getSchedules();
    };

    async getScheduleById(id: number) {
        const schedule = await scheduleData.getScheduleById(id);
        if (!schedule) throw new Error('Schedule not found');
        return schedule;
    };

    async saveSchedule(schedule: ScheduleProps) {
        // const existingSchedule = await scheduleData.getScheduleByCompanyAndId(user.email);
        // if (existingUser) throw new Error('User already exists');
        return scheduleData.saveSchedule(schedule);
    };

    async updateSchedule(id: number, schedule: ScheduleProps) {
        await this.getScheduleById(id);
        return scheduleData.updateSchedule(id, schedule);
    };

    deleteSchedule(id: number) {

        return scheduleData.deleteSchedule(id);
    };
}