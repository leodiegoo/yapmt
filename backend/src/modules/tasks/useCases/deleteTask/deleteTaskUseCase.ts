import { AppError } from '@shared/errors/AppError';

import { ITasksRepository } from '../../infra/repositories/ITaskRepository';

interface IRequest {
  id: string;
}

class DeleteTaskUseCase {
  constructor(private tasksRepository: ITasksRepository) {}

  async execute({ id }: IRequest): Promise<void> {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new AppError('Task not found!');
    }

    await this.tasksRepository.delete(id);
  }
}

export { DeleteTaskUseCase };
