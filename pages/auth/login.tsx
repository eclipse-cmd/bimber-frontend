import AuthWrapper from "@/components/auth/AuthWrapper";
import InputField from "@/components/layout/form-group/InputField";
import PasswordField from "@/components/layout/form-group/PasswordField";
import { useLoginMutation } from "@/generated/generated";
import { toErrorMap } from "@/services/helper/toErrorMap";
import {
  Avatar,
  Box,
  Button,
  chakra,
  FormControl,
  FormHelperText,
  Heading,
  Link as Clink,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FaEnvelope } from "react-icons/fa";

const CFaEmail = chakra(FaEnvelope);

const Login: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const [, login] = useLoginMutation();

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
            initialValues={{ email: "thoyorshi@gmail.com", password: "secret" }}
            onSubmit={async (values, { setErrors }) => {
              const response = await login({ payload: values });

              const { errors, user } = response.data?.login!;

              if (!user) {
                const error = toErrorMap(errors!);
                setErrors(error);
                toast({
                  description: error.login ?? "Login failed",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
                return;
              }

              console.log(user);
              router.push("/");
            }}
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
                    type="email"
                    name="email"
                    inputIcon={<CFaEmail color="gray.300" />}
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
