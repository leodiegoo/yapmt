import { TaskRepository } from '@modules/tasks/infra/repositories/implementations/TaskRepository';

import { DayjsDateProvider } from '@shared/providers/DateProvider/implementations/DayjsDateProvider';

import { ListTasksByProjectController } from './listTasksByProjectController';
import { ListTasksByProjectUseCase } from './listTasksByProjectUseCase';

export default (): ListTasksByProjectController => {
  const taskRepository = new TaskRepository();
  const dayJsDateProvider = new DayjsDateProvider();

  const listTasksByProjectUseCase = new ListTasksByProjectUseCase(
    taskRepository,
    dayJsDateProvider
  );

  const listTasksByProjectController = new ListTasksByProjectController(
    listTasksByProjectUseCase
  );

  return listTasksByProjectController;
};
