import { Task } from '@modules/tasks/infra/entities/Task';

import { AppError } from '@shared/errors/AppError';

import { ITasksRepository } from '../../infra/repositories/ITaskRepository';

interface IRequest {
  id: string;
  done: boolean;
}

class UpdateTaskStatusUseCase {
  constructor(private tasksRepository: ITasksRepository) {}

  async execute({ id, done }: IRequest): Promise<Task> {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new AppError('Task not found!');
    }

    task.done = done;

    await this.tasksRepository.create(task);

    return task;
  }
}

export { UpdateTaskStatusUseCase };
