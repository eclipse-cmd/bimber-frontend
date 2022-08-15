import { useAuthQuery, useLogoutMutation, User } from "@/generated/generated";
import createUrqlClient from "@/services/core/urql/createUrqlClient";
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  IconButton,
  Link as Clink,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Links = [
  {
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    label: "Home",
    path: "/home",
  },
];

const NavLink = ({ link }: { link: { label: string; path: string } }) => (
  <Link href={link.path} passHref>
    <Clink
      textTransform="capitalize"
      fontWeight="semibold"
      px={5}
      py={2}
      m="0"
      rounded={"sm"}
      color={useColorModeValue("teal.900", "teal.100")}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("teal.900", "teal.100"),
        color: useColorModeValue("teal.100", "teal.900"),
      }}
    >
      {link.label}
    </Clink>
  </Link>
);

const Navbar = () => {
  const [, logout] = useLogoutMutation();
  const [{ data, fetching }] = useAuthQuery();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    if (!fetching) {
      setUser(data?.auth as User | null);
    }
  }, [fetching, data?.auth]);

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Container maxW="container.xl" px={{ base: "0", md: "4" }}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />

          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Image
                src="/assets/images/logo.jpg"
                height="50px"
                width="50px"
                alt="logo.png"
              />
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link, index) => (
                <NavLink key={index} link={link} />
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              {user ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"sm"} bg="teal.500" />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar size={"lg"} bg="teal.500" />
                    </Center>
                    <br />
                    <Center>
                      <p style={{ textTransform: "capitalize" }}>
                        {user.firstname}
                      </p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem onClick={() => logout()}>Logout</MenuItem>
                    <Button w={"100%"} onClick={toggleColorMode}>
                      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                    </Button>
                  </MenuList>
                </Menu>
              ) : (
                <Link href="/auth/login" passHref>
                  <Clink>
                    <Button
                      fontSize={"sm"}
                      fontWeight={600}
                      color={"white"}
                      bg={"teal.600"}
                      _hover={{
                        bg: "teal.800",
                      }}
                    >
                      Login
                    </Button>
                  </Clink>
                </Link>
              )}
            </Stack>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link, index) => (
                <NavLink key={index} link={link} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
};

export default withUrqlClient(createUrqlClient)(Navbar);
