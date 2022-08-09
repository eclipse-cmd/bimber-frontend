import { Link as Clink, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const Navlinks: React.FC = () => {
  return (
    <>
      <Link href="/home" passHref>
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
          home
        </Clink>
      </Link>
      <Link href="/post" passHref>
        <Clink
          px={5}
          py={2}
          m="0"
          textTransform="capitalize"
          fontWeight="semibold"
          rounded={"sm"}
          color={useColorModeValue("teal.900", "teal.100")}
          _hover={{
            textDecoration: "none",
            bg: useColorModeValue("teal.900", "teal.100"),
            color: useColorModeValue("teal.100", "teal.900"),
          }}
        >
          posts
        </Clink>
      </Link>
      <Link href="/link" passHref>
        <Clink
          px={5}
          py={2}
          m="0"
          textTransform="capitalize"
          fontWeight="semibold"
          rounded={"sm"}
          color={useColorModeValue("teal.900", "teal.100")}
          _hover={{
            textDecoration: "none",
            bg: useColorModeValue("teal.900", "teal.100"),
            color: useColorModeValue("teal.100", "teal.900"),
          }}
        >
          link
        </Clink>
      </Link>
    </>
  );
};

export default Navlinks;
