import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  GetProjectsResponse,
  Project,
  useProjects,
} from "../services/hooks/useProjects";
import { Task, useTasks } from "../services/hooks/useTasks";
import { isAfter } from "../utils/formatTime";

type AppProviderProps = {
  children: ReactNode;
};

type AppContextData = {
  tasks: Task[];
  projects: GetProjectsResponse | undefined;
  selectedProject: Project;
  setSelectedProject: Dispatch<SetStateAction<Project>>;
  selectedProjectId: string;
  setSelectedProjectId: Dispatch<SetStateAction<string>>;
  tasksStatus: {
    completed: number;
    late: number;
    total: number;
  };
  isLoadingProject: boolean;
};

export const AppContext = createContext({} as AppContextData);

export function AppProvider({ children }: AppProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<GetProjectsResponse | undefined>();
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [tasksStatus, setTasksStatus] = useState<{
    completed: number;
    late: number;
    total: number;
  }>({ completed: 0, late: 0, total: 0 });
  const [selectedProject, setSelectedProject] = useState<Project>(
    {} as Project
  );

  const { data: projectsData, isLoading } = useProjects();

  useEffect(() => {
    setProjects(projectsData);
  }, [projectsData]);

  const { data: taskData } = useTasks(selectedProjectId, {
    enabled: !!selectedProjectId,
  });

  useEffect(() => {
    setTasks(taskData?.tasks || []);
  }, [taskData]);

  useEffect(() => {
    const completed = tasks.filter((task) => task.done).length;
    const late = tasks.filter(
      (task) => !task.done && isAfter(task.dueDate)
    ).length;
    const total = tasks.length;
    setTasksStatus({ completed, late, total });
  }, [tasks]);

  return (
    <AppContext.Provider
      value={{
        tasks,
        projects,
        selectedProjectId,
        setSelectedProjectId,
        tasksStatus,
        isLoadingProject: isLoading,
        selectedProject,
        setSelectedProject,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
