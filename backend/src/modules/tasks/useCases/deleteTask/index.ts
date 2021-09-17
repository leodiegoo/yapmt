import { TaskRepository } from '@modules/tasks/infra/repositories/implementations/TaskRepository';

import { DeleteTaskController } from './deleteTaskController';
import { DeleteTaskUseCase } from './deleteTaskUseCase';

export default (): DeleteTaskController => {
  const taskRepository = new TaskRepository();

  const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);

  const deleteTaskController = new DeleteTaskController(deleteTaskUseCase);

  return deleteTaskController;
};
