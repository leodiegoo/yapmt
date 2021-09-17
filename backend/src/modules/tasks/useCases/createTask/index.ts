import { TaskRepository } from '@modules/tasks/infra/repositories/implementations/TaskRepository';

import { CreateTaskController } from './createTaskController';
import { CreateTaskUseCase } from './createTaskUseCase';

export default (): CreateTaskController => {
  const taskRepository = new TaskRepository();

  const createTaskUseCase = new CreateTaskUseCase(taskRepository);

  const createTaskController = new CreateTaskController(createTaskUseCase);

  return createTaskController;
};
