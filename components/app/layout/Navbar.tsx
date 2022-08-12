import { useLogoutMutation } from "@/generated/generated";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Link as Clink,
  chakra,
  Container,
  Flex,
  HStack,
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
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Navlinks from "./Inner/Navlinks";

interface Props {
  isAuth: boolean;
}

const Navbar: React.FC<Props> = ({ isAuth }) => {
  const [{ fetching }, logout] = useLogoutMutation();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <chakra.header id="header">
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Container maxW="container.xl">
          <Flex h={16} alignItems="center" justifyContent="space-between">
            <Box>
              <Image
                src="/assets/images/logo.jpg"
                height="50px"
                width="50px"
                alt="logo.png"
              />
            </Box>
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              minW={"50%"}
            >
              <HStack flexBasis={1} as="nav" spacing="5" h="100%" p="16px">
                <Navlinks />
              </HStack>
              <Stack direction={"row"} spacing={7}>
                {isAuth ? (
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
                        <Avatar
                          size={"lg"}
                          bg="teal.500"
                          //  src={
                          //   "https://avatars.dicebear.com/api/male/username.svg"
                          // }
                        />
                      </Center>
                      <br />
                      <Center>
                        <p>Username</p>
                      </Center>
                      <br />
                      <MenuDivider />
                      <MenuItem>Your Servers</MenuItem>
                      <MenuItem>Account Settings</MenuItem>
                      <MenuItem isDisabled={fetching} onClick={() => logout()}>
                        Logout
                      </MenuItem>
                    </MenuList>
                  </Menu>
                ) : (
                  <Link href="/auth/login" passHref>
                    <Clink>
                      <Button
                        display={{ base: "none", md: "inline-flex" }}
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
                <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
              </Stack>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </chakra.header>
  );
};

export default Navbar;
