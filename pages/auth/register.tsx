import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link as Clink,
  Stack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUserAlt,
} from "react-icons/fa";
import AuthWrapper from "@/components/auth/AuthWrapper";

const CFaUserAlt = chakra(FaUserAlt);
const CFaEmail = chakra(FaEnvelope);
const CFaLock = chakra(FaLock);
const CFaShow = chakra(FaEye);
const CFaHide = chakra(FaEyeSlash);

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  //Functions
  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <AuthWrapper title="Register">
      <Stack
        flexDir="column"
        mb="2"
        minW={"100%"}
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Thanks for joining us.</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, handleSubmit }) => (
              <Form>
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
                      <Input type="text" placeholder="First name" />
                    </InputGroup>
                  </FormControl>

                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <CFaUserAlt color="gray.300" />
                      </InputLeftElement>
                      <Input type="text" placeholder="Last name" />
                    </InputGroup>
                  </FormControl>

                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <CFaEmail color="gray.300" />
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
                          bg={"none"}
                          h="1.75rem"
                          size="sm"
                          onClick={handleShowClick}
                        >
                          {showPassword ? (
                            <CFaHide color="gray.500" />
                          ) : (
                            <CFaShow color="gray.500" />
                          )}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  <Button
                    isLoading={false}
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                  >
                    Register
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
      <Box>
        Already have an account?
        <Link href="/auth/login" passHref>
          <Clink color="teal.500" ml={"10px"}>
            Login
          </Clink>
        </Link>
      </Box>
    </AuthWrapper>
  );
};

export default Register;
