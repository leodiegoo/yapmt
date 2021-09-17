interface IListTasksByProjectResponseDTO {
  id: string;
  project_id: string;
  description: string;
  owner: string;
  done: boolean;
  due_date: string;
  created_at: Date;
  updated_at: Date;
}

export { IListTasksByProjectResponseDTO };
