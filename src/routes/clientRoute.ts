import { Request, Response, Router } from 'express';
import { ClientController } from '../controllers/clientController';

const clientController = new ClientController();
const router = Router();

router.get('/', async (req: Request, res: Response, next) => {
    try {
        const response = await clientController.getClients();
        res.status(200).json(response);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req: Request, res: Response, next) =>{
    try {
        const response = await clientController.getClientById(Number(req.params.id));
        res.json(response);
    } catch (e) {
        next(e);
    }
});

router.post('/', async (req: Request, res: Response, next) => {
    try {
        const response = await clientController.saveClient(req.body);
        res.status(201).json(response);
    } catch (e: any) {
        next(e);
    }
});

router.put('/:id', async (req: Request, res: Response, next) => {
    try {
        await clientController.updateClient(Number(req.params.id), req.body);
        res.status(204).end();
    } catch (e: any) {
        next(e);
    }
});


router.delete('/:id', async (req: Request, res: Response) => {
    const response = await clientController.deleteClient(Number(req.params.id));
    res.status(204).json(response);
});

export default router;