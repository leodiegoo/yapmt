import { Project } from '@modules/projects/infra/typeorm/entities/Project';

import { AppError } from '@shared/errors/AppError';

import { IProjectsRepository } from '../../infra/typeorm/repositories/IProjectsRepository';

interface IRequest {
  title: string;
}

class CreateProjectUseCase {
  constructor(private projectsRepository: IProjectsRepository) {}

  async execute({ title }: IRequest): Promise<Project> {
    const projectAlreadyExists = await this.projectsRepository.findByName(
      title
    );

    if (projectAlreadyExists) {
      throw new AppError('Project Already Exists!');
    }

    const project = this.projectsRepository.create({ title });

    return project;
  }
}

export { CreateProjectUseCase };
