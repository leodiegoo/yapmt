import { IProjectsRepository } from '@modules/projects/infra/typeorm/repositories/IProjectsRepository';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class DeleteProjectUseCase {
  constructor(private projectsRepository: IProjectsRepository) {}

  async execute({ id }: IRequest): Promise<void> {
    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new AppError('Project not found!');
    }

    await this.projectsRepository.delete(id);
  }
}

export { DeleteProjectUseCase };
