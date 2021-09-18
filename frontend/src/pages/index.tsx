import React, { useContext, useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  VStack,
} from "@chakra-ui/react";

import ProjectsSidebar from "../components/ProjectsSidebar";
import TaskList from "../components/TaskLIst";

import type { NextPage } from "next";
import { useRouter } from "next/router";

import { RiDeleteBinLine } from "react-icons/ri";

import { useMutation } from "react-query";
import { api } from "../services/apiClient";
import { queryClient } from "../services/queryClient";
import { AxiosError } from "axios";
import { Project } from "../services/hooks/useProjects";

import { AppContext } from "../contexts/AppContext";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const router = useRouter();
  const [confirmDeleteIsOpen, setConfirmDeleteOpen] = useState(false);
  const onCloseConfirmDelete = () => setConfirmDeleteOpen(false);
  const cancelDelete = useRef<any>();

  const { projectId: queryProjectId = "" } = router.query;

  const {
    selectedProject,
    setSelectedProject,
    setSelectedProjectId,
    selectedProjectId,
    tasksStatus,
    isLoadingProject,
    projects,
  } = useContext(AppContext);

  useEffect(() => {
    if (!isLoadingProject && !queryProjectId && projects?.projects) {
      router.push(`/?projectId=${projects?.projects[0].id}`);
      setSelectedProject(projects?.projects[0]);
      setSelectedProjectId(projects?.projects[0].id || "");
    } else if (!isLoadingProject) {
      setSelectedProjectId(queryProjectId.toString() || "");
      setSelectedProject(
        projects?.projects.find(
          (project) => project.id === queryProjectId.toString()
        ) || ({} as Project)
      );
    }
  }, [
    queryProjectId,
    projects,
    router,
    setSelectedProjectId,
    isLoadingProject,
    selectedProject,
    setSelectedProject,
  ]);

  const deleteProject = useMutation(
    async (id: string) => {
      await api.delete(`/projects/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("projects");
        router.push("/");
      },
      onError: (error: AxiosError) => {
        console.error({ error });
      },
    }
  );

  const handleDeleteProject = async (id: string) => {
    try {
      await deleteProject.mutateAsync(id);
      onCloseConfirmDelete();
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <Layout>
      <ProjectsSidebar />

      <Flex
        flexDirection="column"
        borderRadius={4}
        p="8"
        marginX="auto"
        width="container.lg"
      >
        <Flex flexDir="column">
          <Flex flexDir="row">
            <Flex>
              <Heading size="lg" fontWeight="medium">
                {selectedProject.title}{" "}
                <span title="completed/late/total">
                  {`(${tasksStatus.completed}/${tasksStatus.late}/${tasksStatus.total})`}
                </span>
              </Heading>
            </Flex>
            <Box justifyContent="center" alignSelf="center" ml="5">
              <Button
                size="xs"
                variant="ghost"
                colorScheme="red"
                onClick={() => setConfirmDeleteOpen(true)}
              >
                <Icon as={RiDeleteBinLine} /> delete project
              </Button>
            </Box>
          </Flex>
          <Divider />
        </Flex>
        <Flex
          flexDirection="column"
          alignItems="flex-start"
          alignContent="flex-start"
          justifyContent="flex-start"
          my="10"
        >
          <VStack width="100%" spacing={10} alignItems="flex-start">
            <TaskList />
          </VStack>
        </Flex>
      </Flex>
      <AlertDialog
        isOpen={confirmDeleteIsOpen}
        leastDestructiveRef={cancelDelete}
        onClose={onCloseConfirmDelete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Project
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can not undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelDelete} onClick={onCloseConfirmDelete}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleDeleteProject(selectedProjectId)}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Layout>
  );
};

export default Home;
