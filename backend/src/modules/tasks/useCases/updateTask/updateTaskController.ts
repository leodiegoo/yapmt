import { Request, Response } from 'express';

import { UpdateTaskUseCase } from './updateTaskUseCase';

class UpdateTaskController {
  constructor(private updateTaskUseCase: UpdateTaskUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { due_date, owner, description } = request.body;
    const { id } = request.params;

    const task = await this.updateTaskUseCase.execute({
      due_date,
      owner,
      description,
      id,
    });

    return response.status(200).json(task);
  }
}

export { UpdateTaskController };
