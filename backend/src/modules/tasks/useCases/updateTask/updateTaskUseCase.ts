import { Task } from '@modules/tasks/infra/entities/Task';

import { AppError } from '@shared/errors/AppError';

import { ITasksRepository } from '../../infra/repositories/ITaskRepository';

interface IRequest {
  id: string;
  description: string;
  owner: string;
  due_date: Date;
}

class UpdateTaskUseCase {
  constructor(private tasksRepository: ITasksRepository) {}

  async execute({ id, description, owner, due_date }: IRequest): Promise<Task> {
    let task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new AppError('Task not found!');
    }

    task = { ...task, description, owner, due_date };

    await this.tasksRepository.create(task);

    return task;
  }
}

export { UpdateTaskUseCase };
