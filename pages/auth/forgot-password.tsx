import AuthWrapper from "@/components/auth/AuthWrapper";
import InputField from "@/components/layout/form-group/InputField";
import { useForgotPasswordMutation } from "@/generated/generated";
import createUrqlClient from "@/services/core/urql/createUrqlClient";
import { toErrorMap } from "@/services/helper/toErrorMap";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  chakra,
  Heading,
  Link as Clink,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";

const CFaEmail = chakra(FaEnvelope);

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  const [, forgotPassword] = useForgotPasswordMutation();
  const toast = useToast();
  const [status, setStatus] = useState<boolean>(false);

  return (
    <AuthWrapper title="forgot-password">
      <Stack
        flexDir="column"
        mb="2"
        minW={"100%"}
        justifyContent="center"
        alignItems="center"
      >
        <Heading color="teal.400" mb={5}>
          Recover password
        </Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <Formik
            initialValues={{ email: "" }}
            onSubmit={async (values, { setErrors }) => {
              const response = await forgotPassword({ payload: values });

              const { errors, status } = response.data?.forgotPassword!;

              if (!status) {
                const error = toErrorMap(errors!);
                setErrors(error);
                toast({
                  description: error.forgotPassword ?? "An error occured",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
                return;
              }

              setStatus(status as boolean);
              values.email = "";
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
                  {status && (
                    <Box maxWidth={450} m={"auto"} w={"100%"}>
                      <Alert status="success" variant="subtle">
                        <AlertIcon />
                        <small>
                          You will receive a link to reset your password in your
                          email, if you are registered with us.
                        </small>
                      </Alert>
                    </Box>
                  )}
                  <InputField
                    type="email"
                    name="email"
                    inputIcon={<CFaEmail color="gray.300" />}
                    placeholder="Email address"
                  />
                  <Button
                    isLoading={isSubmitting}
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                  >
                    Recover Password
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
      <Box>
        Go back
        <Link href="/auth/login" passHref>
          <Clink color="teal.500" ml={"10px"}>
            Login
          </Clink>
        </Link>
      </Box>
    </AuthWrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
