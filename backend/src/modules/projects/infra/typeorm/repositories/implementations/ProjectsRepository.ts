import { getRepository, Repository } from 'typeorm';

import { Project } from '../../entities/Project';
import { ICreateProjectDTO, IProjectsRepository } from '../IProjectsRepository';

class ProjectsRepository implements IProjectsRepository {
  private repository: Repository<Project>;

  constructor() {
    this.repository = getRepository(Project);
  }

  async findById(id: string): Promise<Project> {
    const project = await this.repository.findOne(id);

    return project;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async create({ title }: ICreateProjectDTO): Promise<Project> {
    const project = this.repository.create({
      title,
    });

    await this.repository.save(project);

    return project;
  }

  async findByName(title: string): Promise<Project> {
    const project = await this.repository.findOne({ title });

    return project;
  }

  async list(): Promise<Project[]> {
    const projects = await this.repository.find({
      order: {
        created_at: 'ASC',
      },
    });
    return projects;
  }
}

export { ProjectsRepository };
