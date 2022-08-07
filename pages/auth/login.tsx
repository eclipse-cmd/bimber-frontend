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
import { Form, Formik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaLock, FaUserAlt } from "react-icons/fa";
import AuthWrapper from "@/components/auth/AuthWrapper";
import InputField from "@/components/layout/form-group/InputField";
import PasswordField from "@/components/layout/form-group/PasswordField";

const CFaUserAlt = chakra(FaUserAlt);

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  //Functions
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <AuthWrapper title="Login">
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
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <Stack
                  spacing={4}
                  p="1rem"
                  backgroundColor="whiteAlpha.900"
                  boxShadow="md"
                >
                  <InputField
                    name="email"
                    inputIcon={<CFaUserAlt color="gray.300" />}
                    placeholder="Email address"
                  />
                  <PasswordField name="password" placeholder="Password" />
                  <FormControl>
                    <FormHelperText textAlign="right">
                      <Link href={"/auth/forgot-password"} passHref>
                        <Clink>Forgot password?</Clink>
                      </Link>
                    </FormHelperText>
                  </FormControl>
                  <Button
                    isLoading={isSubmitting}
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                  >
                    Login
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
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
    </AuthWrapper>
  );
};

export default Login;
