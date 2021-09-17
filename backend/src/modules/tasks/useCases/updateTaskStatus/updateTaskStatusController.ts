import { Request, Response } from 'express';

import { UpdateTaskStatusUseCase } from './updateTaskStatusUseCase';

class UpdateTaskStatusController {
  constructor(private updateTaskStatusUseCase: UpdateTaskStatusUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { done } = request.body;
    const { id } = request.params;

    const task = await this.updateTaskStatusUseCase.execute({
      done,
      id,
    });

    return response.status(200).json(task);
  }
}

export { UpdateTaskStatusController };
