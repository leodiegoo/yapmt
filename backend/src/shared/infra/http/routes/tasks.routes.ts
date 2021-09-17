import createTaskController from '@modules/tasks/useCases/createTask';
import deleteTaskContoller from '@modules/tasks/useCases/deleteTask';
import listTasksByProjectController from '@modules/tasks/useCases/listTasksByProject';
import updateTaskController from '@modules/tasks/useCases/updateTask';
import updateTaskStatusController from '@modules/tasks/useCases/updateTaskStatus';
import { Router } from 'express';

const tasksRouter = Router();

tasksRouter.get('/project/:projectId', (request, response) => {
  return listTasksByProjectController().handle(request, response);
});
tasksRouter.post('/', (request, response) => {
  return createTaskController().handle(request, response);
});
tasksRouter.patch('/:id', (request, response) => {
  return updateTaskStatusController().handle(request, response);
});
tasksRouter.put('/:id', (request, response) => {
  return updateTaskController().handle(request, response);
});
tasksRouter.delete('/:id', (request, response) => {
  return deleteTaskContoller().handle(request, response);
});

export { tasksRouter };
