import { ProjectsRepository } from '../../infra/typeorm/repositories/implementations/ProjectsRepository';
import { CreateProjectController } from './createProjectController';
import { CreateProjectUseCase } from './createProjectUseCase';

export default (): CreateProjectController => {
  const projectsRepository = new ProjectsRepository();

  const createProjectUseCase = new CreateProjectUseCase(projectsRepository);

  const createProjectController = new CreateProjectController(
    createProjectUseCase
  );

  return createProjectController;
};
