import { Center, Flex } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import DefaultHead from "../layout/Head";

interface AuthWrapper {
  children: React.ReactNode;
  title?: string;
}

const AuthWrapper: React.FC<AuthWrapper> = ({ children, title = "" }) => {
  return (
    <>
      <DefaultHead title={title} />
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
        <Center h="200px" width="auto" mb={"20px"}>
          <Image
            src="/assets/images/logo.jpg"
            width={120}
            height={100}
            alt="bubi.png"
          />
        </Center>
        {children}
      </Flex>
    </>
  );
};

export default AuthWrapper;
