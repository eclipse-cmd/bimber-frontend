import AuthWrapper from "@/components/auth/AuthWrapper";
import InputField from "@/components/layout/form-group/InputField";
import PasswordField from "@/components/layout/form-group/PasswordField";
import { useRegisterMutation } from "@/generated/generated";
import {
  Avatar,
  Box,
  Button,
  chakra,
  Heading,
  Link as Clink,
  Stack,
  Toast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Link from "next/link";
import React from "react";
import { useToast } from "@chakra-ui/react";
import { FaEnvelope, FaUserAlt } from "react-icons/fa";
import { toErrorMap } from "@/services/helper/toErrorMap";
import { useRouter } from "next/router";

const CFaUserAlt = chakra(FaUserAlt);
const CFaEmail = chakra(FaEnvelope);

const Register: React.FC = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  const toast = useToast();

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
            initialValues={{
              firstname: "emmanuel",
              lastname: "popoola",
              email: "thoyorshi@gmail.com",
              password: "secret",
            }}
            onSubmit={async (values, { setErrors }) => {
              const response = await register({ payload: values });
              const { errors, user } = response.data?.register!;

              if (errors) {
                const error = toErrorMap(errors);
                setErrors(error);
                toast({
                  title: "Registration failed.",
                  description: error.register,
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
                return;
              }

              router.push("/");
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Stack
                  spacing={4}
                  p="1rem"
                  backgroundColor="whiteAlpha.900"
                  boxShadow="md"
                >
                  <InputField
                    name="firstname"
                    inputIcon={<CFaUserAlt color="gray.300" />}
                    placeholder="First name"
                  />

                  <InputField
                    name="lastname"
                    inputIcon={<CFaUserAlt color="gray.300" />}
                    placeholder="Last name"
                  />

                  <InputField
                    name="email"
                    inputIcon={<CFaEmail color="gray.300" />}
                    placeholder="Email address"
                  />

                  <PasswordField name="password" placeholder="Password" />

                  <Button
                    isLoading={isSubmitting}
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

//2:54
