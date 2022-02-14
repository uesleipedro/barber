import express, { Request, Response, NextFunction } from 'express';

import userRoute from './routes/userRoute';
import clientRoute from './routes/clientRoute';
import companyRoute from './routes/companyRoute';
import serviceRoute from './routes/serviceRoute';
import professionalRoute from './routes/professionalRoute';
import scheduleRoute from './routes/scheduleRoute';

export const app = express();

app.use(express.json());
app.use('/user', userRoute);
app.use('/client', clientRoute);
app.use('/company', companyRoute);
app.use('/service', serviceRoute);
app.use('/professional', professionalRoute);
app.use('/schedule', scheduleRoute);
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error.message ===
        'User already exists'
        || error.message === 'Company already exists'
        || error.message === 'Client already exists'
        || error.message === 'Service already exists'
        || error.message === 'Professional already exists'
    ) {
        return res.status(409).send(error.message);
    }

    if (error.message === 
        'User not found'
        || error.message === 'Company not found'
        || error.message === 'Client not found'
        || error.message === 'Service not found'
        || error.message === 'Professional not found'
    ) {
        return res.status(404).send(error.message);
    }

    return res.status(500).send(error.message);
});




