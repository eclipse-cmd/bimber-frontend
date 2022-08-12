import AppWrapper from "@/components/app/AppWrapper";
import Navbar from "@/components/app/layout/Navbar";
import { useAuthQuery, usePostsQuery } from "@/generated/generated";
import createUrqlClient from "@/services/core/urql/createUrqlClient";
import { isServer } from "@/services/helper/isServer";
import { Box, Center, Container, Flex, Spinner } from "@chakra-ui/react";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";

const Index: NextPage = () => {
  const [{ data, fetching }] = useAuthQuery({ pause: isServer() });
  const [{ data: posts, fetching: fetchingPosts }] = usePostsQuery();

  return (
    <AppWrapper>
      <Navbar isAuth={data?.auth !== null} />
      {fetchingPosts ? (
        <Center minH="60vh">
          <Spinner color="teal.600" />
        </Center>
      ) : (
        <Container maxW="container.xl">
          <Box pt={10}>
            <ul>
              {posts!.posts.length < 1 ? (
                <Center>
                  <h3>No posts</h3>
                </Center>
              ) : (
                posts?.posts.map((post, i) => <li key={i}>{post.title}</li>)
              )}
            </ul>
          </Box>
        </Container>
      )}
    </AppWrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
