import HomeAside from "@/components/app/layout/HomeAside";
import Navbar from "@/components/app/layout/Navbar";
import AppWrapper from "@/components/layout/AppWrapper";
import { usePostsQuery } from "@/generated/generated";
import createUrqlClient from "@/services/core/urql/createUrqlClient";
import { Box, Center, Container, Flex, Spinner } from "@chakra-ui/react";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";

const Index: NextPage = () => {
  const [{ data: posts, fetching: fetchingPosts }] = usePostsQuery();

  return (
    <AppWrapper>
      <Navbar pageProps={undefined} />
      {fetchingPosts ? (
        <Center minH="60vh">
          <Spinner color="teal.600" />
        </Center>
      ) : (
        <Container maxW="container.xl">
          <Box minH="100vh">
            <Flex
              color="white"
              flexDirection={{ base: "column", md: "row" }}
              justifyContent={{ base: "center", md: "space-between" }}
            >
              <Box width={{ base: "100%", md: "70%" }} px={4} overflow="hidden">
                <Box pt={10}>
                  <ul>
                    {posts!.posts.length < 1 ? (
                      <Center>
                        <h3>No posts</h3>
                      </Center>
                    ) : (
                      posts?.posts.map((post, i) => (
                        <li key={i}>{post.title}</li>
                      ))
                    )}
                  </ul>
                </Box>
              </Box>
              <Box width={{ base: "100%", md: "30%" }} px={4} overflow="hidden">
                <HomeAside />
              </Box>
            </Flex>
          </Box>
        </Container>
      )}
    </AppWrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
