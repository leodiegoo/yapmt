import { isYesterday, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { fToNow, isAfter } from "../../utils/formatTime";
import { api } from "../apiClient";

export type Task = {
  id: string;
  description: string;
  owner: string;
  done: boolean;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  dueDateFriendly: string;
  projectId: string;
};

type GetTasksResponse = {
  tasks: Task[];
};

export async function getTasksByProjectId(
  projectId: string
): Promise<GetTasksResponse> {
  const response = await api.get(`/tasks/project/${projectId}`);

  const { data } = response;

  const tasks = data.map((task: any) => {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      owner: task.owner,
      done: task.done,
      dueDate: utcToZonedTime(parseISO(task.due_date), "UTC"),
      dueDateFriendly: fToNow(task.due_date).toLowerCase(),
      createdAt: new Date(task.created_at),
      updatedAt: new Date(task.updated_at),
      projectId: task.project_id,
    };
  });

  return { tasks };
}

export function useTasks(projectId: string, options?: UseQueryOptions) {
  return useQuery(
    ["tasks", [projectId]],
    () => getTasksByProjectId(projectId),
    {
      staleTime: 1000 * 60 * 1,
      ...options,
    }
  ) as UseQueryResult<GetTasksResponse, unknown>;
}
