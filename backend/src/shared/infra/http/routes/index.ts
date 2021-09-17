import { Router } from 'express';

import { projectsRouter } from './projects.routes';
import { tasksRouter } from './tasks.routes';

const router = Router();

router.use('/projects', projectsRouter);
router.use('/tasks', tasksRouter);

export { router };
