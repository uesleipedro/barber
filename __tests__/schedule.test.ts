import request from 'supertest';

import { ScheduleController } from '../src/controllers/scheduleController';
import { ClientController } from '../src/controllers/clientController';
import { CompanyController } from '../src/controllers/companyController';
import { UserController } from '../src/controllers/userController';

const api = 'http://localhost:3000';
const scheduleController = new ScheduleController();
const clientController = new ClientController();
const companyController = new CompanyController();
const userController = new UserController();

describe('Schedule tests', () => {
    const scheduleData = {
        startDateTime: new Date(),
        endDateTime: new Date(),
        idService: 1,
        idBarber: 1,
        idPaymentMethod: 1,
        totalPaymentService: 200.00,
        idStatus: 1
    };
    const companyData = {
        corporateName: 'Umbrela Corporation',
        fancyName: 'Umbrela Corporation',
        cnpjCpf: '48358722000149',
        idAddress: 0
    };
    const clientData = { name: 'Nêmesis', email: 'nemesis@hotmail.com' };
    const userData = { name: 'Nêmesis', email: 'nemesis@hotmail.com' };
    const mock: any = {};

    beforeAll(async () => {
        mock.client = await clientController.saveClient(clientData);
        mock.user = await userController.saveUser(userData);
        mock.company = await companyController.saveCompany({ ...companyData, idUser: mock.user.id });
    });

    it('should get schedule', async () => {
        const scheduleDataToSubmit = { ...scheduleData, idClient: mock.client.id, idCompany: mock.company.id };
        await scheduleController.saveSchedule(scheduleDataToSubmit);

        const receivedSchedule = await request(api).get('/schedule').expect(200);

        expect(receivedSchedule.body).toHaveLength(1);

        await scheduleController.deleteSchedule(receivedSchedule.body[0].id);
    });

    it('should save a schedule', async () => {
        const scheduleDataToSubmit = { ...scheduleData, idClient: mock.client.id, idCompany: mock.company.id };
        const savedSchedule = await request(api).post('/schedule').send(scheduleDataToSubmit);

        expect(savedSchedule.status).toBe(201);
        expect(savedSchedule.body.id_client).toBe(scheduleDataToSubmit.idClient);
        expect(savedSchedule.body.id_company).toBe(scheduleDataToSubmit.idCompany);

        await scheduleController.deleteSchedule(savedSchedule.body.id);
    });

    //NÃO DEVE SALVAR SE O MESMO RANGE DE DATA JÁ ESTIVER SENDO UTILIZADO
    // it('should not save a schedule', async () => {
    //     const scheduleDataToSubmit = { ...scheduleData, idClient: mock.client.id, idCompany: mock.company.id };
    //     const savedSchedule = await request(api).post('/schedule').send(scheduleDataToSubmit);

    //     await request(api).post('/schedule').send(scheduleDataToSubmit).then(async (response) => {
    //         expect(response.status).toBe(409);

    //         await clientController.deleteClient(savedClient.body.id);
    //     });
    // });

    it('should update a schedule', async () => {
        const scheduleDataToSubmit = { ...scheduleData, idClient: mock.client.id, idCompany: mock.company.id };
        const savedSchedule = await request(api).post('/schedule').send(scheduleDataToSubmit);

        const scheduleToUpdate = { idPaymentMethod: 1, idBarber: 2 };

        await request(api).put(`/schedule/${savedSchedule.body.id}`)
            .send(scheduleToUpdate)
            .then(async (res) => {
                const updatedSchedule = await scheduleController.getScheduleById(savedSchedule.body.id);

                expect(res.status).toBe(204);
                expect(updatedSchedule.id_payment_method).toBe(scheduleToUpdate.idPaymentMethod);
                expect(updatedSchedule.id_barber).toBe(scheduleToUpdate.idBarber);

                await scheduleController.deleteSchedule(savedSchedule.body.id);
            });
    });

    //NÃO DEVE ATUALIZAR CASO HAJA CONFLITO DE HORÁRIOS
    // it('should not update a client', async () => {
    //     const client = {id: 1};
    //     await request(api).put(`/client/${client.id}`).send(client).then(async (response) => {
    //         expect(response.status).toBe(404);
    //     });
    // });

    it('should delete a schedule', async () => {
        const scheduleDataToSubmit = { ...scheduleData, idClient: mock.client.id, idCompany: mock.company.id };
        const schedule = await scheduleController.saveSchedule(scheduleDataToSubmit);

        await request(api).delete(`/schedule/${schedule.id}`).then((response) => {
            expect(response.status).toBe(204);
        });
        const schedules = await scheduleController.getSchedules();

        expect(schedules).toHaveLength(0);
    });


    afterAll(async () => {
        await companyController.deleteCompany(mock.company.id);
        await userController.deleteUser(mock.user.id);
        await clientController.deleteClient(mock.client.id);
    })
});
