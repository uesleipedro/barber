import {Request, Response, Router} from 'express';
import { UserController } from '../controllers/userController';
const userController = new UserController();

const router = Router();

router.get('/', async function (req: Request, res: Response) {
    const response = await userController.index()
    res.json(response);
});

router.get('/:id', async function (req: Request, res: Response) {
    
});

router.post('/', async function (req: Request, res: Response) {
    
});

router.put('/:id', async function (req: Request, res: Response) {
    
});

router.delete('/:id', async function (req: Request, res: Response) {
    
});

export default router;