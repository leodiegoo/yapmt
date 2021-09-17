import { Box, Input, Button, Checkbox, Text, useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { format } from "date-fns";
import React, { useContext, useState } from "react";
import { RiEdit2Line, RiDeleteBin4Line, RiAddLine } from "react-icons/ri";
import { useMutation } from "react-query";
import { AppContext } from "../../contexts/AppContext";
import { api } from "../../services/apiClient";
import { Task } from "../../services/hooks/useTasks";
import { queryClient } from "../../services/queryClient";
import { createDate, isAfter } from "../../utils/formatTime";

type CreateTaskFormData = {
  description: string;
  owner: string;
  due_date: string;
  done: boolean;
  project_id: string;
};

type UpdateTaskStatusFormData = {
  done: boolean;
  id: string;
};

type UpdateTaskFormData = {
  id: string;
  description: string;
  owner: string;
  due_date: string;
};

const TaskList = () => {
  const [inputValue, setInputValue] = useState("");
  const [addTaskInputValue, setAddTaskInputValue] = useState("");

  const [mouseHover, setMouseHover] = useState<{ [x: number]: boolean }>({});
  const [isEditing, setIsEditing] = useState<{ [x: number]: boolean }>({});
  const [isAdditing, setIsAdditing] = useState<boolean>(false);

  const toast = useToast();

  const { tasks, selectedProjectId } = useContext(AppContext);

  const handleChecked = async (task: Task) => {
    try {
      await updateStatusTask.mutateAsync({ done: !task.done, id: task.id });
    } catch (error) {
      console.error({ error });
    }
  };

  const handleDelete = async (index: number, id: string) => {
    try {
      await deleteTask.mutateAsync(id);
      setMouseHover({ [index]: false });
    } catch (error) {
      console.error({ error });
    }
  };

  const onBlurInputDescription = async (index: number, task: Task) => {
    try {
      const [description, owner, due] = inputValue.split(",");
      await updateTask.mutateAsync({
        description,
        owner,
        due_date: createDate(due),
        id: task.id,
      });
      setIsEditing({ [index]: false });
      setInputValue("");
    } catch (error) {
      console.error({ error });
    }
  };

  const onBlurAddTask = async () => {
    try {
      if (!addTaskInputValue) {
        setIsAdditing(false);
      } else {
        const [description, owner, due] = addTaskInputValue.split(",");
        if (!owner) {
          toast({
            title: "Ops!",
            description: "Please enter the owner.",
            status: "warning",
            isClosable: true,
          });
        } else if (!due) {
          toast({
            title: "Ops!",
            description: "Please enter the due date.",
            status: "warning",
            isClosable: true,
          });
        } else {
          const newTask: CreateTaskFormData = {
            description: description.trim(),
            owner: owner.trim(),
            due_date: createDate(due),
            done: false,
            project_id: selectedProjectId,
          };
          await createTask.mutateAsync(newTask);
          setIsAdditing(false);
          setAddTaskInputValue("");
        }
      }
    } catch (error) {
      console.error({ error });
    }
  };

  const createTask = useMutation(
    async (task: CreateTaskFormData) => {
      const response = await api.post("/tasks", task);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
      },
      onError: (error: AxiosError) => {
        console.error({ error });
      },
    }
  );

  const updateStatusTask = useMutation(
    async (data: UpdateTaskStatusFormData) => {
      const response = await api.patch(`/tasks/${data.id}`, {
        done: data.done,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
      },
      onError: (error: AxiosError) => {
        console.error({ error });
      },
    }
  );

  const updateTask = useMutation(
    async (data: UpdateTaskFormData) => {
      const response = await api.put(`/tasks/${data.id}`, {
        owner: data.owner,
        description: data.description,
        due_date: data.due_date,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
      },
      onError: (error: AxiosError) => {
        console.error({ error });
      },
    }
  );

  const deleteTask = useMutation(
    async (id: string) => {
      await api.delete(`/tasks/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
      },
      onError: (error: AxiosError) => {
        console.error({ error });
      },
    }
  );

  return (
    <>
      {tasks.map((task, index) =>
        isEditing[index] ? (
          <Box width="100%" key={task.id}>
            <Input
              size="lg"
              fontSize="2xl"
              variant="flushed"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={() => onBlurInputDescription(index, task)}
              onKeyDown={(e) => {
                if (e.key == "Enter") onBlurInputDescription(index, task);
              }}
              autoFocus
            />
          </Box>
        ) : (
          <Checkbox
            w="100%"
            size="lg"
            isChecked={task.done}
            onChange={() => handleChecked(task)}
            key={task.id}
            onMouseEnter={() => setMouseHover({ [index]: true })}
            onMouseLeave={() => setMouseHover({ [index]: false })}
          >
            <Text
              fontSize="2xl"
              textDecoration={task.done ? "line-through" : "none"}
            >
              {task.description}
              <Text as="span" fontSize="2xl" ml="5" color="gray.400">
                {task.owner}
              </Text>
              <Text
                as="span"
                fontSize="2xl"
                ml="5"
                color={
                  !task.done && isAfter(task.dueDate) ? "red.600" : "gray.400"
                }
              >
                {task.dueDateFriendly}
              </Text>{" "}
              {mouseHover[index] && (
                <Box as="span" position="absolute">
                  <Button
                    title="Edit"
                    size="sm"
                    color="whiteAlpha.900"
                    variant="ghost"
                    ml="5"
                    onClick={() => {
                      setIsEditing({ [index]: true });
                      setInputValue(
                        `${task.description}, ${task.owner}, ${format(
                          task.dueDate,
                          "M/dd"
                        )}`
                      );
                    }}
                  >
                    <RiEdit2Line />
                  </Button>
                  <Button
                    title="Delete"
                    size="sm"
                    color="whiteAlpha.900"
                    variant="ghost"
                    ml="1"
                    onClick={() => handleDelete(index, task.id)}
                  >
                    <RiDeleteBin4Line />
                  </Button>
                </Box>
              )}
            </Text>
          </Checkbox>
        )
      )}

      {isAdditing && (
        <Box width="100%">
          <Input
            size="lg"
            value={addTaskInputValue}
            placeholder="type new task, @owner, due date (M/d)"
            onChange={(e) => setAddTaskInputValue(e.target.value)}
            onBlur={() => onBlurAddTask()}
            autoFocus
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                if (!addTaskInputValue) {
                  toast({
                    title: "Ops!",
                    description:
                      "Please enter description, owner and due date!",
                    status: "warning",
                    isClosable: true,
                  });
                } else {
                  onBlurAddTask();
                }
              }
            }}
          />
        </Box>
      )}

      <Button
        variant="link"
        alignSelf="flex-start"
        display="flex"
        alignItems="center"
        py="1"
        ml={8}
        mt="auto"
        onClick={() => setIsAdditing(true)}
      >
        <RiAddLine size="20" />
        <Text ml="4" fontSize="medium" fontWeight="medium">
          Add Task
        </Text>
      </Button>
    </>
  );
};

export default TaskList;
