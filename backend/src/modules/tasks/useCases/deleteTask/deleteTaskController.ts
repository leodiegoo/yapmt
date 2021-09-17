import { Request, Response } from 'express';

import { DeleteTaskUseCase } from './deleteTaskUseCase';

class DeleteTaskController {
  constructor(private deleteTaskUseCase: DeleteTaskUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await this.deleteTaskUseCase.execute({ id });

    return response.status(204).send();
  }
}

export { DeleteTaskController };
