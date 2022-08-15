import React from "react";

import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";

interface HomeAsideProps {}

const HomeAside: React.FC<HomeAsideProps> = ({}) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      w="full"
      pos="fixed"
      h="full"
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
      </Flex>
    </Box>
  );
};
// 5:25

export default HomeAside;
