import { ICreateTaskDTO } from '@modules/tasks/dtos/ICreateTaskDTO';
import { getRepository, Repository } from 'typeorm';

import { Task } from '../../entities/Task';
import { ITasksRepository } from '../ITaskRepository';

class TaskRepository implements ITasksRepository {
  private repository: Repository<Task>;

  constructor() {
    this.repository = getRepository(Task);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<Task> {
    const task = await this.repository.findOne(id);
    return task;
  }

  async findByProject(project_id: string): Promise<Task[]> {
    const tasks = await this.repository.find({
      where: { project_id },
      order: { due_date: 'ASC', created_at: 'ASC' },
    });
    return tasks;
  }

  async create({
    description,
    done,
    due_date,
    owner,
    project_id,
    id,
  }: ICreateTaskDTO): Promise<Task> {
    const task = this.repository.create({
      description,
      done,
      due_date,
      owner,
      project_id,
      id,
    });

    await this.repository.save(task);

    return task;
  }
}

export { TaskRepository };
