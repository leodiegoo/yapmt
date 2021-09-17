import { IListTasksByProjectResponseDTO } from '@modules/tasks/dtos/IListTasksByProjectResponseDTO';
import { TaskMap } from '@modules/tasks/mapper/TaskMap';

import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';

import { ITasksRepository } from '../../infra/repositories/ITaskRepository';

interface IRequest {
  project_id: string;
}

class ListTasksByProjectUseCase {
  constructor(
    private tasksRepository: ITasksRepository,
    private dayJsDateProvider: IDateProvider
  ) {}

  async execute({
    project_id,
  }: IRequest): Promise<IListTasksByProjectResponseDTO[]> {
    const tasks = await this.tasksRepository.findByProject(project_id);

    const toDto = tasks.map((task) => {
      return TaskMap.toDTO(task, this.dayJsDateProvider);
    });

    return toDto;
  }
}

export { ListTasksByProjectUseCase };
