
import request from 'supertest';

import { ServiceController } from '../src/controllers/serviceController';

const api = 'http://localhost:3000';
const serviceController = new ServiceController();

describe('Service tests', () => {
    const serviceData = {
        describe: 'Corte na tesoura',
        time: '00:45:00',
        price: 25.9
    };

    it('should get services', async () => {
        const service = await serviceController.saveService(serviceData);

        await request(api).get('/service').then((response) => {
            expect(response.status).toBe(200);
            const services = response.body;
            expect(services).toHaveLength(1);
        });

        await serviceController.deleteService(service.id);
    });

    it('should save a service', async () => {

        await request(api).post('/service').send(serviceData).then(async (response) => {
            expect(response.status).toBe(201);
            const service = response.body;
            expect(service.describe).toBe(serviceData.describe);
            expect(service.time).toBe(serviceData.time);
            expect(Number(service.price)).toBe(serviceData.price);

            await serviceController.deleteService(service.id);
        });
    });

    it('should not save a services', async () => {
        var serviceId: any = 0;

        await request(api).post('/service').send(serviceData).then((res) => serviceId = res.body.id);
        await request(api).post('/service').send(serviceData).then(async (response) => {
            expect(response.status).toBe(409);
            await serviceController.deleteService(serviceId);
        });
    });

    it('should update a service', async () => {
        await request(api).post('/service').send(serviceData)
            .then(async (response) => {

                const describe = 'Barba';
                const time = '00:50:00';
                const price = 10;

                await request(api).put(`/service/${response.body.id}`).send({ describe, time, price }).then(async (response2) => {
                    const updatedService = await serviceController.getServiceById(response.body.id);

                    expect(response2.status).toBe(204);
                    expect(updatedService.describe).toBe(describe);
                    expect(updatedService.time).toBe(time);
                    expect(Number(updatedService.price)).toBe(price);

                    await serviceController.deleteService(response.body.id);
                });
            });
    });

    it('should not update a service', async () => {
        const service = {
            id: 1
        };
        await request(api).put(`/service/${service.id}`).send(serviceData).then(async (response) => {
            expect(response.status).toBe(404);
        });
    });

    it('should delete a service', async () => {
        const service = await serviceController.saveService(serviceData);

        await request(api).delete(`/service/${service.id}`).then((response) => {
            expect(response.status).toBe(204);
        });

        const services = await serviceController.getServices();
        expect(services).toHaveLength(0);
    });
});
