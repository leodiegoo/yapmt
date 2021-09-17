import { Task } from '@modules/tasks/infra/entities/Task';

import { ITasksRepository } from '../../infra/repositories/ITaskRepository';

interface IRequest {
  description: string;
  owner: string;
  done: boolean;
  due_date: Date;
  project_id: string;
}

class CreateTaskUseCase {
  constructor(private tasksRepository: ITasksRepository) {}

  async execute({
    description,
    owner,
    done,
    due_date,
    project_id,
  }: IRequest): Promise<Task> {
    const task = await this.tasksRepository.create({
      description,
      owner,
      done,
      due_date,
      project_id,
    });

    return task;
  }
}

export { CreateTaskUseCase };
