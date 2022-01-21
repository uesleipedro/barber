import express, { Request, Response, NextFunction } from 'express';

import userRoute from './routes/userRoute';
import companyRoute from './routes/companyRoute';

export const app = express();

app.use(express.json());
app.use('/user', userRoute);
app.use('/company', companyRoute);
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error.message ===
        'User already exists'
        || error.message === 'Company already exists'
    ) {
        return res.status(409).send(error.message);
    }

    if (error.message === 
        'User not found'
        || error.message === 'Company not found'
    ) {
        return res.status(404).send(error.message);
    }

    return res.status(500).send(error.message);
});




