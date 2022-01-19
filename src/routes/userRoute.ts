import { Request, Response, Router } from 'express';
import { UserController } from '../controllers/userController';

const userController = new UserController();
const router = Router();

router.get('/', async function (req: Request, res: Response, next) {
    try {
        const response = await userController.getUsers();
        res.status(200).json(response);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async function (req: Request, res: Response, next) {
    try {
        const response = await userController.getUserById(req.params.id);
        res.json(response);
    } catch (e) {
        next(e);
    }
});

router.post('/', async function (req: Request, res: Response, next) {
    try {
        const response = await userController.saveUser(req.body);
        res.status(201).json(response);
    } catch (e: any) {
        next(e);
    }
});

router.put('/:id', async function (req: Request, res: Response, next) {
    try {
        await userController.updateUser(req.params.id, req.body);
        res.status(204).end();
    } catch (e: any) {
        next(e);
    }
});


router.delete('/:id', async function (req: Request, res: Response) {
    const response = await userController.deleteUser(req.params.id);
    res.status(204).json(response);
});

export default router;