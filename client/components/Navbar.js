import {
  Box,
  Text,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Fade,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useState } from "react";

function Logo(props) {
  return (
    <Box {...props}>
      <Text fontSize="20pt" fontWeight="bold">
        FACES-21
      </Text>
    </Box>
  );
}

function MenuToggle({ toggle, isOpen }) {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <HamburgerIcon />}
    </Box>
  );
}

function MenuItems({ children, isLast, to = "/", ...rest }) {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
}

function MenuLinks({ isOpen }) {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItems to="/">Home</MenuItems>
        <MenuItems to="/">Profile</MenuItems>
        <MenuItems to="/">Events</MenuItems>
        <MenuItems to="/" isLast>
          <Button
            size="sm"
            rounded="md"
            color={["blue.400", "blue.400", "white", "white"]}
            bg={["white", "", "blue.400", "blue.400"]}
            _hover={{
              bg: ["blue.400", "blue.400", "blue.500", "blue.500"],
            }}
            textDecoration="none"
          >
            Login
          </Button>
        </MenuItems>
      </Stack>
    </Box>
  );
}

const NavbarContainer = ({ children, props }) => {
  return (
    <Flex
      as="nav"
      wrap="wrap"
      align="center"
      justify="space-between"
      mb={8}
      p={8}
      w="100%"
      bg={["blue.500", "blue.500", "blue.100", "blue.100"]}
      color={["white", "white", "blue.500", "blue.500"]}
      boxShadow="sm"
      {...props}
    >
      {children}
    </Flex>
  );
};

export default function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <NavbarContainer {...props}>
      <Logo w="auto" color={["white", "white", "blue.500", "blue.500"]} />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavbarContainer>
  );
}
