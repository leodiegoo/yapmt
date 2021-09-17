import { Request, Response } from 'express';

import { CreateTaskUseCase } from './createTaskUseCase';

class CreateTaskController {
  constructor(private createTasktUseCase: CreateTaskUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { description, owner, done, due_date, project_id } = request.body;

    const task = await this.createTasktUseCase.execute({
      description,
      owner,
      done,
      due_date,
      project_id,
    });

    return response.status(200).json(task);
  }
}

export { CreateTaskController };
