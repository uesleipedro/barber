import { Request, Response, Router } from 'express';
import { CompanyController } from '../controllers/companyController';

const companyController = new CompanyController();
const router = Router();

router.get('/', async (req: Request, res: Response, next) => {
    try {
        const response = await companyController.getCompanies();
        res.status(200).json(response);
    } catch (e) {
        next(e);
    }
});

// router.get('/:id', async function (req: Request, res: Response, next) {
//     try {
//         const response = await userController.getUserById(req.params.id);
//         res.json(response);
//     } catch (e) {
//         next(e);
//     }
// });

router.post('/', async (req: Request, res: Response, next) => {
    try {
        const response = await companyController.saveCompany(req.body);
        res.status(201).json(response);
    } catch (e: any) {
        next(e);
    }
});

router.put('/:id', async function (req: Request, res: Response, next) {
    try {
        await companyController.updateCompany(Number(req.params.id), req.body);
        res.status(204).end();
    } catch (e: any) {
        next(e);
    }
});


router.delete('/:id', async function (req: Request, res: Response) {
    const response = await companyController.deleteCompany(Number(req.params.id));
    res.status(204).json(response);
});

export default router;