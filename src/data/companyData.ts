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

    getCompanyByCnpjCpf(cnpjCpf: string) {

        return db.oneOrNone('SELECT * FROM barber.company WHERE cnpj_cpf = $1', [cnpjCpf]);
    };

    saveCompany(company: Company) {

        return db.one('INSERT INTO barber.company (corporate_name, fancy_name, cnpj_cpf, id_address, id_user) VALUES ($1, $2, $3, $4, $5) returning *',
            [company.corporateName, company.fancyName, company.cnpjCpf, Number(company.idAddress), Number(company.idUser)]);
    };

    updateCompany(id: number, company: Company) {
        const camelToSnakeCase = (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

        let fields = '';
        Object.keys(company).map((field, index) => { fields += `${camelToSnakeCase(field)} = $${index + 1},` });
        fields = fields.slice(0, -1);

        let values = Object.values(company);
        values.push(id);

        return db.none(`UPDATE barber.company SET ${fields} WHERE id = $${values.length}`, values);
    };

    deleteCompany(id: number) {

        return db.none('DELETE FROM barber.company WHERE id = $1', [id]);
    };
}
