import { Box, Flex } from "@chakra-ui/layout";
import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box>
      <Flex width="100%" my="6" marginX="auto">
        <Flex
          width="100%"
          minHeight="container.sm"
          maxHeight="container.md"
          borderRadius={8}
          flexDirection="row"
        >
          {children}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Layout;
