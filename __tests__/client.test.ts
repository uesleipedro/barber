import request from 'supertest';

import { ClientController } from '../src/controllers/clientController';

const api = 'http://localhost:3000';
const clientController = new ClientController();

describe('Client tests', () => {
    const clientData = { name: 'Nêmesis', email: 'nemesis@hotmail.com' };

    it('should get clients', async () => {
        await clientController.saveClient(clientData);

        const receivedClient = await request(api).get('/client').expect(200);

        expect(receivedClient.body).toHaveLength(1);

        await clientController.deleteClient(receivedClient.body[0].id);
    });

    it('should save a client', async () => {

        const savedClient = await request(api).post('/client').send(clientData);

        expect(savedClient.status).toBe(201);
        expect(savedClient.body.name).toBe(clientData.name);
        expect(savedClient.body.email).toBe(clientData.email);

        await clientController.deleteClient(savedClient.body.id);
    });

    it('should not save a client', async () => {
        const savedClient = await request(api).post('/client').send(clientData);

        await request(api).post('/client').send(clientData).then(async (response) => {
            expect(response.status).toBe(409);

            await clientController.deleteClient(savedClient.body.id);
        });
    });

    it('should update a client', async () => {
        const savedClient = await request(api).post('/client').send(clientData);
        const clientToUpdate = { name: 'Dracula', email: 'dracula@hotmail.com' };

        await request(api).put(`/client/${savedClient.body.id}`)
            .send(clientToUpdate)
            .then(async (res) => {
                const updatedClient = await clientController.getClientById(savedClient.body.id);

                expect(res.status).toBe(204);
                expect(updatedClient.name).toBe(clientToUpdate.name);
                expect(updatedClient.email).toBe(clientToUpdate.email);

                await clientController.deleteClient(savedClient.body.id);
            });
    });

    it('should not update a client', async () => {
        const client = {id: 1};
        await request(api).put(`/client/${client.id}`).send(client).then(async (response) => {
            expect(response.status).toBe(404);
        });
    });

    it('should delete a client', async () => {
        const client = await clientController.saveClient(clientData);

        await request(api).delete(`/client/${client.id}`).then((response) => {
            expect(response.status).toBe(204);
        });
        const clients = await clientController.getClients();

        expect(clients).toHaveLength(0);
    });
});
