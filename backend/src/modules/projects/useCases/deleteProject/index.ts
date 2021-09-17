import { ProjectsRepository } from '@modules/projects/infra/typeorm/repositories/implementations/ProjectsRepository';

import { DeleteProjectController } from './deleteProjectController';
import { DeleteProjectUseCase } from './deleteProjectUseCase';

export default (): DeleteProjectController => {
  const projectsRepository = new ProjectsRepository();

  const deleteProjectUseCase = new DeleteProjectUseCase(projectsRepository);

  const deleteProjectController = new DeleteProjectController(
    deleteProjectUseCase
  );

  return deleteProjectController;
};
