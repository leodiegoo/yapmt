import createProjectController from '@modules/projects/useCases/createProject';
import deleteProjectController from '@modules/projects/useCases/deleteProject';
import listProjectsController from '@modules/projects/useCases/listProjects';
import { Router } from 'express';

const projectsRouter = Router();

projectsRouter.get('/', (request, response) => {
  return listProjectsController().handle(request, response);
});

projectsRouter.post('/', (request, response) => {
  return createProjectController().handle(request, response);
});

projectsRouter.delete('/:id', (request, response) => {
  return deleteProjectController().handle(request, response);
});

export { projectsRouter };
