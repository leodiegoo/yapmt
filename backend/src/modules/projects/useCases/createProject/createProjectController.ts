import { Request, Response } from 'express';

import { CreateProjectUseCase } from './createProjectUseCase';

class CreateProjectController {
  constructor(private createProjectUseCase: CreateProjectUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { title } = request.body;

    const project = await this.createProjectUseCase.execute({ title });

    return response.status(200).json(project);
  }
}

export { CreateProjectController };
