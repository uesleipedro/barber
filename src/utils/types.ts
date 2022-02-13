export interface Company {
    corporateName: string;
    fancyName: string;
    cnpjCpf: string;
    idAddress: number;
    idUser: number;
};

export interface User {
    name: string;
    email: string;
};

export interface Professional {
    name: string;
    email: string;
};

export interface Service {
    id?: number;
    describe: string;
    time: string;
    price: number;
};

export interface Client {
    name: string;
    email: string;
};

export interface ScheduleProps {
    idClient: number;
    idCompany: number;
    startDateTime: Date;
    endDateTime: Date;
    idService: number;
    idBarber: number;
    idPaymentMethod: number;
    totalPaymentService: number;
    idStatus: number;
};