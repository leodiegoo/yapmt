import { classToClass } from 'class-transformer';

import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';

import { IListTasksByProjectResponseDTO } from '../dtos/IListTasksByProjectResponseDTO';
import { Task } from '../infra/entities/Task';

class TaskMap {
  static toDTO(
    {
      id,
      project_id,
      description,
      owner,
      done,
      due_date,
      created_at,
      updated_at,
    }: Task,
    dayJsProvider: IDateProvider
  ): IListTasksByProjectResponseDTO {
    const task = classToClass({
      id,
      project_id,
      description,
      owner,
      done,
      due_date: dayJsProvider.convertToUTC(due_date),
      created_at,
      updated_at,
    });
    return task;
  }
}

export { TaskMap };
