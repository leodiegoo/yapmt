import React, { useState } from "react";
import { Flex, Heading, Icon, Input, VStack } from "@chakra-ui/react";

import ProjectsSidebar from "../components/ProjectsSidebar";

import type { NextPage } from "next";
import { useRouter } from "next/router";

import { useMutation } from "react-query";
import { api } from "../services/apiClient";
import { queryClient } from "../services/queryClient";
import { AxiosError } from "axios";

import Layout from "../components/Layout";

type CreateProjectFormData = {
  title: string;
};

const NewProject: NextPage = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const createProject = useMutation(
    async (data: CreateProjectFormData) => {
      const response = await api.post(`/projects/`, data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("projects");
        router.push(`/?projectId=${data.id}`);
      },
      onError: (error: AxiosError) => {
        console.error({ error });
      },
    }
  );

  const onBlurInput = async () => {
    try {
      if (inputValue) {
        await createProject.mutateAsync({ title: inputValue });
      }
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
          <Flex flexDir="row" flex="1">
            <Heading size="lg" fontWeight="medium" width="100%">
              <Input
                fontSize="3xl"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={onBlurInput}
                onKeyDown={(e) => {
                  if (e.key == "Enter") onBlurInput();
                }}
                variant="flushed"
                size="lg"
                placeholder="Type new project name and hit enter"
                width="100%"
                load
              />
            </Heading>
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          alignItems="flex-start"
          alignContent="flex-start"
          justifyContent="flex-start"
          my="10"
        >
          <VStack width="100%" spacing={10} alignItems="flex-start"></VStack>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default NewProject;
