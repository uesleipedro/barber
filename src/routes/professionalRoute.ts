import { Request, Response, NextFunction, Router } from 'express';
import { ProfessionalController } from '../controllers/professionalController';

const professionalController = new ProfessionalController();
const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await professionalController.getProfessionals();
        res.status(200).json(response);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await professionalController.getProfessionalById(Number(req.params.id));
        res.json(response);
    } catch (e) {
        next(e);
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await professionalController.saveProfessional(req.body);
        res.status(201).json(response);
    } catch (e) {
        next(e);
    }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await professionalController.updateProfessional(Number(req.params.id), req.body);
        res.status(204).end();
    } catch (e) {
        next(e);
    }
});


router.delete('/:id', async (req: Request, res: Response) => {
    const response = await professionalController.deleteProfessional(Number(req.params.id));
    res.status(204).json(response);
});

export default router;