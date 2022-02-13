import { Request, Response, Router } from 'express';
import { ServiceController } from '../controllers/serviceController';

const serviceController = new ServiceController();
const router = Router();

router.get('/', async (req: Request, res: Response, next) => {
    try {
        const response = await serviceController.getServices();
        res.status(200).json(response);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req: Request, res: Response, next) => {
    try {
        const response = await serviceController.getServiceById(Number(req.params.id));
        res.json(response);
    } catch (e) {
        next(e);
    }
});
 
router.post('/', async (req: Request, res: Response, next) => {
    try {
        const response = await serviceController.saveService(req.body);
        res.status(201).json(response);
    } catch (e) {
        next(e);
    }
});

router.put('/:id', async (req: Request, res: Response, next) => {
    try {
        await serviceController.updateService(Number(req.params.id), req.body);
        res.status(204).end();
    } catch (e) {
        next(e);
    }
});


router.delete('/:id', async (req: Request, res: Response) => {
    const response = await serviceController.deleteService(Number(req.params.id));
    res.status(204).json(response);
});

export default router;