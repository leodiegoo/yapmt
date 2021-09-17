import { ProjectsRepository } from '../../infra/typeorm/repositories/implementations/ProjectsRepository';
import { ListProjectsController } from './listProjectsController';
import { ListProjectsUseCase } from './listProjectsUseCase';

export default (): ListProjectsController => {
  const projectsRepository = new ProjectsRepository();

  const listProjectsUseCase = new ListProjectsUseCase(projectsRepository);

  const listProjectsController = new ListProjectsController(
    listProjectsUseCase
  );

  return listProjectsController;
};
