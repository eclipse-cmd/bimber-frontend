import AuthWrapper from "@/components/auth/AuthWrapper";
import PasswordField from "@/components/layout/form-group/PasswordField";
import { useResetPasswordMutation } from "@/generated/generated";
import createUrqlClient from "@/services/core/urql/createUrqlClient";
import { toErrorMap } from "@/services/helper/toErrorMap";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Heading,
  Link as Clink,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const ResetPassword: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const [, resetPassword] = useResetPasswordMutation();
  const [tokenError, setTokenError] = useState("");

  const { token } = router.query;

  return (
    <AuthWrapper title="Reset-password">
      <Stack
        flexDir="column"
        mb="2"
        minW={"100%"}
        justifyContent="center"
        alignItems="center"
      >
        <Heading color="teal.400" mb={5}>
          Reset password
        </Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <Formik
            initialValues={{
              password: "",
              password_confirmation: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              const response = await resetPassword({
                payload: {
                  ...values,
                  token: token as string,
                },
              });

              const { errors, status } = response.data?.resetPassword!;

              if (!status) {
                const error = toErrorMap(errors!);

                if (error.token) {
                  setTokenError(error.token);
                }
                setErrors(error);
                return;
              }

              router.push("/auth/login");
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
                  {tokenError ? (
                    <Box maxWidth={450} m={"auto"} w={"100%"}>
                      <Alert status="error">
                        <AlertIcon />
                        <small>
                          {tokenError}. Get{" "}
                          <Link href="/auth/forgot-password" passHref>
                            <Clink
                              fontWeight="semibold"
                              textDecoration="underline"
                              color={"teal.500"}
                            >
                              token
                            </Clink>
                          </Link>{" "}
                          again
                        </small>
                      </Alert>
                    </Box>
                  ) : null}

                  <PasswordField name="password" placeholder="New password" />
                  <PasswordField
                    name="password_confirmation"
                    placeholder="Confirm password"
                    showPasswordToggler={false}
                  />

                  <Button
                    isLoading={isSubmitting}
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                  >
                    Reset Password
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </AuthWrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ResetPassword);
