import React, { useContext } from "react";
import { Button, Flex, VStack, Link, Text } from "@chakra-ui/react";

import { RiAddLine } from "react-icons/ri";
import { ActiveLink } from "../ActiveLink";
import { AppContext } from "../../contexts/AppContext";
import { useRouter } from "next/router";

const ProjectsSidebar = () => {
  const { projects } = useContext(AppContext);
  const router = useRouter();

  return (
    <Flex
      as="aside"
      w="72"
      minH="calc(100vh - 8rem)"
      ml="12"
      py="8"
      shadow="0 0 20px rgba(0, 0, 0, 0.05)"
      borderRadius={8}
      backgroundColor="blackAlpha.300"
      direction="column"
    >
      <VStack spacing="4" pr="8" alignItems="stretch">
        <Text fontWeight="bold" color="gray.600" fontSize="small" px={8}>
          Projects
        </Text>
        {projects?.projects.map((project) => (
          <ActiveLink
            href={`/?projectId=${project.id}`}
            passHref
            key={project.id}
          >
            <Link
              display="flex"
              alignItems="center"
              py="1"
              pl={8}
              borderLeft="3px solid"
            >
              <Text ml="4" fontSize="medium" fontWeight="medium">
                {project.title}
              </Text>
            </Link>
          </ActiveLink>
        ))}
      </VStack>

      <Button
        variant="link"
        alignSelf="flex-start"
        display="flex"
        alignItems="center"
        py="1"
        ml={8}
        mt="auto"
        onClick={() => router.push("/new-project")}
      >
        <RiAddLine size="20" />
        <Text ml="4" fontSize="medium" fontWeight="medium">
          New project
        </Text>
      </Button>
    </Flex>
  );
};

export default ProjectsSidebar;
