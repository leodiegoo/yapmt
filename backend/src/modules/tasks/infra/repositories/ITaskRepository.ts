import { ICreateTaskDTO } from '@modules/tasks/dtos/ICreateTaskDTO';

import { Task } from '../entities/Task';

interface ITasksRepository {
  findByProject(project_id: string): Promise<Task[]>;
  findById(id: string): Promise<Task>;
  create(data: ICreateTaskDTO): Promise<Task>;
  delete(id: string): Promise<void>;
}

export { ITasksRepository };
