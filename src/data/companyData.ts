import db from '../infra/database';
import { Company } from '../utils/types';

export class CompanyData {
    getCompanies() {
        const response = db.query('SELECT * FROM barber.company');
        return response;
    };

    getCompanyById(id: number) {

        return db.oneOrNone('SELECT * FROM barber.company WHERE id = $1', [id]);
    };

    getCompanyByCnpjCpf(cnpjCpf: any) {

        return db.oneOrNone('SELECT * FROM barber.company WHERE cnpj_cpf = $1', [cnpjCpf]);
    };

    saveCompany(company: Company) {

        return db.one('INSERT INTO barber.company (corporate_name, fancy_name, cnpj_cpf, id_address, id_user) VALUES ($1, $2, $3, $4, $5) returning *',
            [company.corporateName, company.fancyName, company.cnpjCpf, Number(company.idAddress), Number(company.idUser)]);
    };

    updateCompany(id: number, company: Company) {

        return db.none('UPDATE barber.company SET corporate_name = $1, fancy_name = $2, cnpj_cpf = $3, id_address = $4, id_user = $5 WHERE id = $5',
            [company.corporateName, company.fancyName, company.cnpjCpf, company.idAddress, company.idUser, id]);
    };

    deleteCompany(id: number) {

        return db.none('DELETE FROM barber.company WHERE id = $1', [id]);
    };
}
