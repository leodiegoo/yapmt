import { Request, Response } from 'express';

import { DeleteProjectUseCase } from './deleteProjectUseCase';

class DeleteProjectController {
  constructor(private deleteProjectUseCase: DeleteProjectUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await this.deleteProjectUseCase.execute({ id });

    return response.status(204).send();
  }
}

export { DeleteProjectController };
