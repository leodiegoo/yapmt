import { Project } from '@modules/projects/infra/typeorm/entities/Project';

import { IProjectsRepository } from '../../infra/typeorm/repositories/IProjectsRepository';

class ListProjectsUseCase {
  constructor(private projectsRepository: IProjectsRepository) {}

  async execute(): Promise<Project[]> {
    const projects = await this.projectsRepository.list();

    return projects;
  }
}

export { ListProjectsUseCase };
