import { Company } from './../utils/types';
import { CompanyData } from '../data/companyData';

const companyData = new CompanyData();

export class CompanyController {
    getCompanies() {

        return companyData.getCompanies();
    };

    async getCompanyById(id: number) {
        const company = await companyData.getCompanyById(id);
        if (!company) throw new Error('User not found');
        return company;
    };

    async saveCompany(company: Company) {
        const existingCompany = await companyData.getCompanyByCnpjCpf(company.cnpjCpf);
        if (existingCompany) throw new Error('Company already exists');
        return companyData.saveCompany(company);
    };

    async updateCompany(id: number, company: Company) {
        await this.getCompanyById(id);
        return companyData.updateCompany(id, company);
    };

    deleteCompany(id: number) {

        return companyData.deleteCompany(id);
    };
}