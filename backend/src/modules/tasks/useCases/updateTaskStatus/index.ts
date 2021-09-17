import { TaskRepository } from '@modules/tasks/infra/repositories/implementations/TaskRepository';

import { UpdateTaskStatusController } from './updateTaskStatusController';
import { UpdateTaskStatusUseCase } from './updateTaskStatusUseCase';

export default (): UpdateTaskStatusController => {
  const taskRepository = new TaskRepository();

  const updateTaskStatusUseCase = new UpdateTaskStatusUseCase(taskRepository);

  const updateTaskStatusController = new UpdateTaskStatusController(
    updateTaskStatusUseCase
  );

  return updateTaskStatusController;
};
