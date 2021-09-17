import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { fToNow } from "../../utils/formatTime";
import { api } from "../apiClient";

export type Project = {
  id: string;
  title: string;
  createdAt: string;
};

export type GetProjectsResponse = {
  projects: Project[];
};

export async function getProjects(): Promise<GetProjectsResponse> {
  const response = await api.get("/projects");

  const { data } = response;

  const projects = data.map((project: any) => {
    return {
      id: project.id,
      title: project.title,
      createdAt: new Date(project.created_at),
      createdAtFriendly: fToNow(project.created_at),
    };
  });

  return { projects };
}

export function useProjects(options?: UseQueryOptions) {
  return useQuery(["projects"], () => getProjects(), {
    staleTime: 1000 * 60 * 1,
    ...options,
  }) as UseQueryResult<GetProjectsResponse, unknown>;
}
