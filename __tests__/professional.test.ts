
import request from 'supertest';

import { ProfessionalController } from '../src/controllers/professionalController';

const api = 'http://localhost:3000';
const professionalController = new ProfessionalController();

describe('Professional tests', () => {
    const professionalData = {
        name: 'Ueslei Pedro Rangel',
        email: 'ielseu@email.com',
    };

    it('should get professional', async () => {
        const professional = await professionalController.saveProfessional(professionalData);

        await request(api).get('/professional').then((response) => {
            expect(response.status).toBe(200);
            const professionals = response.body;
            expect(professionals).toHaveLength(1);
        });

        await professionalController.deleteProfessional(professional.id);
    });

    it('should save a professional', async () => {

        await request(api).post('/professional').send(professionalData).then(async (response) => {
            expect(response.status).toBe(201);
            const professional = response.body;
            expect(professional.name).toBe(professionalData.name);
            expect(professional.email).toBe(professionalData.email);

            await professionalController.deleteProfessional(professional.id);
        });
    });

    it('should not save a professional', async () => {
        var professionalId: any = 0;

        await request(api).post('/professional').send(professionalData).then((res) => professionalId = res.body.id);
        await request(api).post('/professional').send(professionalData).then(async (response) => {
            expect(response.status).toBe(409);
            await professionalController.deleteProfessional(professionalId);
        });
    });

    it('should update a professional', async () => {
        await request(api).post('/professional').send(professionalData)
            .then(async (response) => {

                const name = 'Ueslei Pedro';
                const email = 'teste@teste.com';

                await request(api).put(`/professional/${response.body.id}`).send({ name, email }).then(async (response2) => {
                    const updatedProfessisonal = await professionalController.getProfessionalById(response.body.id);

                    expect(response2.status).toBe(204);
                    expect(updatedProfessisonal.name).toBe(name);
                    expect(updatedProfessisonal.email).toBe(email);

                    await professionalController.deleteProfessional(response.body.id);
                });
            });
    });

    it('should not update a professional', async () => {
        const professional = {
            id: 1
        };
        await request(api).put(`/professional/${professional.id}`).send(professionalData).then(async (response) => {
            expect(response.status).toBe(404);
        });
    });

    it('should delete a professional', async () => {
        const professional = await professionalController.saveProfessional(professionalData);

        await request(api).delete(`/professional/${professional.id}`).then((response) => {
            expect(response.status).toBe(204);
        });

        const professionals = await professionalController.getProfessionals();
        expect(professionals).toHaveLength(0);
    });
});
