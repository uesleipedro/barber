import request from 'supertest';

import { CompanyController } from '../src/controllers/companyController';
import { UserController } from '../src/controllers/userController';

let company = {
    corporateName: 'Umbrela Corporation',
    fancyName: 'Umbrela Corporation',
    cnpjCpf: '48358722000149',
    idAddress: 0
};
const userData = { name: 'Nêmesis', email: 'nemesis@hotmail.com' };
const api = 'http://localhost:3000';

describe('Company tests', () => {
    const userController = new UserController();
    const companyController = new CompanyController();

    it('should get company', async () => {
        const { id: idUser } = await userController.saveUser(userData);

        const savedCompany = await companyController.saveCompany({ ...company, idUser: idUser });
        const companies = await request(api).get('/company');

        expect(companies.status).toBe(200)
        expect(companies.body).toHaveLength(1);

        await companyController.deleteCompany(savedCompany.id);
        await userController.deleteUser(idUser);
    });

    it('should save a company', async () => {
        const { id: idUser } = await userController.saveUser(userData);
        const companyData = { ...company, idUser: idUser };

        const savedCompany = await request(api).post('/company').send(companyData);

        expect(savedCompany.status).toBe(201);
        expect(savedCompany.body.corporate_name).toBe(companyData.corporateName);
        expect(savedCompany.body.fancy_name).toBe(companyData.fancyName);
        expect(savedCompany.body.cnpj_cpf).toBe(companyData.cnpjCpf);
        expect(savedCompany.body.id_address).toBe(companyData.idAddress);
        expect(savedCompany.body.id_user).toBe(companyData.idUser);

        await companyController.deleteCompany(savedCompany.body.id);
        await userController.deleteUser(idUser);
    });

    it('should not save a company', async () => {
        const { id: idUser } = await userController.saveUser(userData);
        const companyData = { ...company, idUser: idUser };

        const savedCompany = await request(api).post('/company').send(companyData);
        await request(api)
            .post('/company')
            .send(companyData)
            .expect(409);

        await companyController.deleteCompany(savedCompany.body.id);
        await userController.deleteUser(idUser);
    });

    it('should update a company', async () => {
        const { id: idUser } = await userController.saveUser(userData);
        const companyData = { ...company, idUser: idUser };
        const companyDataToUpdate = { fancy_name: 'Nome Fantasia', corporate_name: 'Razão social' };

        const savedCompany = await request(api).post('/company').send(companyData);

        await request(api)
            .put(`/company/${savedCompany.body.id}`)
            .send(companyDataToUpdate)
            .expect(204);

        const updatedCompany = await companyController.getCompanyById(savedCompany.body.id);

        expect(updatedCompany.corporate_name).toBe(companyDataToUpdate.corporate_name);
        expect(updatedCompany.fancy_name).toBe(companyDataToUpdate.fancy_name);

        await companyController.deleteCompany(savedCompany.body.id);
        await userController.deleteUser(idUser);
    });

    it('should not update a company', async () => {
        const company = { id: 1 };
        await request(api).put(`/company/${company.id}`).send(company).then(async (response) => {
            expect(response.status).toBe(404);
        });
    });

    it('should delete a company', async () => {
        const { id: idUser } = await userController.saveUser(userData);
        const companyData = { ...company, idUser: idUser };
        const savedCompany = await companyController.saveCompany(companyData);

        await request(api).delete(`/company/${savedCompany.id}`).expect(204);

        const companies = await companyController.getCompanies();
        expect(companies).toHaveLength(0);

        await userController.deleteUser(idUser);
    });
});
