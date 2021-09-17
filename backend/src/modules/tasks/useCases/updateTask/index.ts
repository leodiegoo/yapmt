import { TaskRepository } from '@modules/tasks/infra/repositories/implementations/TaskRepository';

import { UpdateTaskController } from './updateTaskController';
import { UpdateTaskUseCase } from './updateTaskUseCase';

export default (): UpdateTaskController => {
  const taskRepository = new TaskRepository();

  const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);

  const updateTaskController = new UpdateTaskController(updateTaskUseCase);

  return updateTaskController;
};
