import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link as Clink,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaLock, FaUserAlt } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaShow = chakra(FaEye);
const CFaHide = chakra(FaEyeSlash);

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        minW={"100%"}
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaUserAlt color="gray.300" />
                  </InputLeftElement>
                  <Input type="email" placeholder="Email address" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    <CFaLock color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  <InputRightElement width="3.5rem">
                    <Button
                      h="1.75rem"
                      bg={"none"}
                      size="sm"
                      onClick={handleShowClick}
                    >
                      {showPassword ? <CFaHide /> : <CFaShow />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link href={"/auth/forgot-password"} passHref>
                    <Clink>Forgot password?</Clink>
                  </Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?
        <Link href="/auth/register" passHref>
          <Clink color="teal.500" ml={"10px"}>
            Register
          </Clink>
        </Link>
      </Box>
    </Flex>
  );
};

export default Login;
