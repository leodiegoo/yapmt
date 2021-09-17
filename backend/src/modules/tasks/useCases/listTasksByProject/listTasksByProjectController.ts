import { Request, Response } from 'express';

import { ListTasksByProjectUseCase } from './listTasksByProjectUseCase';

class ListTasksByProjectController {
  constructor(private listTasksByProjectUseCase: ListTasksByProjectUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { projectId } = request.params;

    const tasks = await this.listTasksByProjectUseCase.execute({
      project_id: projectId,
    });

    return response.status(200).json(tasks);
  }
}

export { ListTasksByProjectController };
