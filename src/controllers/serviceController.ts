import { Service } from './../utils/types';
import { ServiceData } from '../data/serviceData';

const serviceData = new ServiceData();

export class ServiceController {
    getServices() {

        return serviceData.getServices();
    };

    async getServiceById(id: number) {
        const service = await serviceData.getServiceById(id);
        if (!service) throw new Error('Service not found');

        return service;
    };

    async saveService(service: Service) {
        const existingService = await serviceData.getServiceByDescribe(service.describe);
        if (existingService) throw new Error('Service already exists');

        return serviceData.saveService(service);
    };

    async updateService(id: number, service: Service) {
        await this.getServiceById(id);
        return serviceData.updateService(id, service);
    };

    deleteService(id: number) {

        return serviceData.deleteService(id);
    };
}