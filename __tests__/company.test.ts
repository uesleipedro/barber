import crypto from 'crypto';
import request from 'supertest';

import { CompanyController } from '../src/controllers/companyController';

const generateString = () => {
    return crypto.randomBytes(20).toString('hex');
};
const generateNumber = () => {
    return Number(Math.floor(Math.random() * 11111) + 99999);
};

const companyData = () => {
    return {
        corporateName: generateString(),
        fancyName: generateString(),
        cnpjCpf: String(generateNumber()),
        idAddress: generateNumber(),
        idUser: generateNumber()
    }
};

const api = 'http://localhost:3000';
const companyController = new CompanyController();

describe('Company tests', () => {

    it('should get company', async () => {
        const company1 = await companyController.saveCompany(companyData());
        const company2 = await companyController.saveCompany(companyData());

        await request(api)
            .get('/company')
            .expect(200)
            .expect(async (res) => {
                const companies = res.body;
                expect(companies).toHaveLength(2);

                await companyController.deleteCompany(company1.id);
                await companyController.deleteCompany(company2.id);
            });
    });

    it('should save a company', async () => {
        const company = companyData();

        await request(api)
            .post('/company')
            .send(companyData())
            .expect(201)
            .expect(async (res) => {
                res.body.corporate_name = company.corporateName;
                res.body.fancy_name = company.fancyName;
                res.body.cnpj_cpf = company.cnpjCpf;
                res.body.id_address = company.idAddress;
                res.body.id_user = company.idUser;

                await companyController.deleteCompany(res.body.id);
            });
    });


    it('should not save a company', async () => {
        const data = companyData();
        var companyId: any = 0;

        await request(api).post('/company').send(data).then((res) => companyId = res.body.id);
        await request(api)
            .post('/company')
            .send(data)
            .expect(409);

        await companyController.deleteCompany(companyId);
    });

    it('should update a company', async () => {
        const company = companyData();
       
        let companyResponse: any = {};
        await request(api).post('/company').send(companyData()).then((res) => companyResponse = res.body);

        await request(api)
            .put(`/company/${companyResponse.id}`)
            .send({ fancy_name: company.fancyName, corporate_name: company.corporateName })
            .expect(204)
            .expect(async (res) => {
                const updatedCompany = await companyController.getCompanyById(companyResponse.id);
                updatedCompany.corporate_name = company.corporateName;
                updatedCompany.fancy_name = company.fancyName;
                await companyController.deleteCompany(companyResponse.id);
            });
    });

    it('should not update a company', async () => {
        const company = {
            id: 1
        };
        await request(api).put(`/company/${company.id}`).send(company).then(async (response) => {
            expect(response.status).toBe(404);
        });
    });

    it('should delete a company', async () => {
        const company = await companyController.saveCompany(companyData());

        await request(api)
            .delete(`/company/${company.id}`)
            .expect(204);

        const companies = await companyController.getCompanies();
        expect(companies).toHaveLength(0);
    });
});
