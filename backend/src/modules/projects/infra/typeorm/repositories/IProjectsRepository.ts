import { Project } from '../entities/Project';

interface ICreateProjectDTO {
  title: string;
}

interface IProjectsRepository {
  findByName(title: string): Promise<Project>;
  list(): Promise<Project[]>;
  create({ title }: ICreateProjectDTO): Promise<Project>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Project>;
}

export { IProjectsRepository, ICreateProjectDTO };
