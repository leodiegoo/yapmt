interface ICreateTaskDTO {
  description: string;
  owner: string;
  done: boolean;
  due_date: Date;
  project_id: string;
  id?: string;
}

export { ICreateTaskDTO };
