import { Professional } from './../utils/types';
import { ProfessionalData } from '../data/professionalData';

const professionalData = new ProfessionalData();

export class ProfessionalController {
    getProfessionals() {

        return professionalData.getProfessionals();
    };

    async getProfessionalById(id: number) {
        const professional = await professionalData.getProfessionalById(id);
        if (!professional) throw new Error('Professional not found');

        return professional;
    };

    async saveProfessional(professional: Professional) {
       const existingProfessional = await professionalData.getProfessionalByEmail(professional.email);
       if (existingProfessional) throw new Error('Professional already exists');

        return professionalData.saveProfessional(professional);
    };

    async updateProfessional(id: number, professional: Professional) {
        await this.getProfessionalById(id);
        return professionalData.updateProfessional(id, professional);
    };

    deleteProfessional(id: number) {

        return professionalData.deleteProfessional(id);
    };
}