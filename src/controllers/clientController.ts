import { Client } from './../utils/types';
import { ClientData } from '../data/clientData';

const clientData = new ClientData();

export class ClientController {
    getClients() {

        return clientData.getClients();
    };

    async getClientById(id: number) {
        const client = await clientData.getClientById(id);
        if (!client) throw new Error('Client not found');
        return client;
    };

    async saveClient(client: Client) {
        const existingClient = await clientData.getClientByEmail(client.email);
        if(existingClient) throw new Error('Client already exists');
        return clientData.saveClient(client);
    };

    async updateClient(id: number, client: Client) {
        await this.getClientById(id);
        return clientData.updateClient(id, client);
    };

    deleteClient(id: number) {

        return clientData.deleteClient(id);
    };
}