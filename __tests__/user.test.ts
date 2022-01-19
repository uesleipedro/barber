
import crypto from 'crypto';
import request from 'supertest';

import { UserController } from '../src/controllers/userController';

const generate = function () {
    return crypto.randomBytes(20).toString('hex');
};
const api = 'http://localhost:3000';
const userController = new UserController();

describe('Users tests', () => {

    it('should get users', async () => {
        const user1 = await userController.saveUser({ name: generate(), email: generate() });
        const user2 = await userController.saveUser({ name: generate(), email: generate() });

        await request(api).get('/user').then((response) => {
            expect(response.status).toBe(200);
            const users = response.body;
            expect(users).toHaveLength(2);
        });

        await userController.deleteUser(user1.id);
        await userController.deleteUser(user2.id);
    });

    it('should save a users', async () => {
        const data = { name: generate(), email: generate() };

        await request(api).post('/user').send(data).then(async (response) => {
            expect(response.status).toBe(201);
            const user = response.body;
            expect(user.name).toBe(data.name);
            expect(user.email).toBe(data.email);
            await userController.deleteUser(user.id);
        });
    });

    it('should not save a users', async () => {
        const data = { name: generate(), email: generate() };

        var userId: any = 0;
        await request(api).post('/user').send(data).then((res) => userId = res.body.id);
        await request(api).post('/user').send(data).then(async (response) => {
            expect(response.status).toBe(409);
            await userController.deleteUser(userId);
        });
    });

    it('should update a users', async () => {
        await request(api).post('/user').send({ name: generate(), email: generate() })
            .then(async (response) => {

                const name = generate();
                const email = generate();

                await request(api).put(`/user/${response.body.id}`).send({ name, email }).then(async (response2) => {
                    const updatedUser = await userController.getUserById(response.body.id);

                    expect(response2.status).toBe(204);
                    expect(updatedUser.name).toBe(name)
                    expect(updatedUser.email).toBe(email)

                    await userController.deleteUser(response.body.id);
                });
            });


    });

    it('should not update a users', async () => {
        const user = {
            id: 1
        };
        await request(api).put(`/user/${user.id}`).send(user).then(async (response) => {
            expect(response.status).toBe(404);
        });
    });

    it('should delete a users', async () => {
        const user = await userController.saveUser({ name: generate(), email: generate() });

        await request(api).delete(`/user/${user.id}`).then((response) =>{
            expect(response.status).toBe(204);
        });

        const users = await userController.getUsers();
        expect(users).toHaveLength(0);
    });
});
