import { Request, Response, Router } from 'express';
import { ScheduleController } from '../controllers/scheduleController';

const scheduleController = new ScheduleController();
const router = Router();

router.get('/', async (req: Request, res: Response, next) => {
    try {
        const response = await scheduleController.getSchedules();
        res.status(200).json(response);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req: Request, res: Response, next) => {
    try {
        const response = await scheduleController.getScheduleById(Number(req.params.id));
        res.json(response);
    } catch (e) {
        next(e);
    }
});

router.post('/', async (req: Request, res: Response, next) => {
    try {
        const response = await scheduleController.saveSchedule(req.body);
        res.status(201).json(response);
    } catch (e: any) {
        next(e);
    }
});

router.put('/:id', async (req: Request, res: Response, next) => {
    try {
        await scheduleController.updateSchedule(Number(req.params.id), req.body);
        res.status(204).end();
    } catch (e: any) {
        next(e);
    }
});


router.delete('/:id', async (req: Request, res: Response) => {
    const response = await scheduleController.deleteSchedule(Number(req.params.id));
    res.status(204).json(response);
});

export default router;