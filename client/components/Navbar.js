import { Box, Text, Flex, Stack, Fade, ScaleFade } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useEffect, useState } from "react";

function Logo(props) {
  return (
    <Box {...props}>
      <Text fontSize="25pt" fontWeight="bolder">
        FACES-21
      </Text>
    </Box>
  );
}

function MenuToggle({ toggle, isOpen }) {
  return (
    <Box
      align="center"
      justify="center"
      display={{ base: "block", md: "none" }}
      onClick={() => {
        if (isOpen == false) {
          document.getElementById("navbar").style.height = "60vh";
          setTimeout(() => toggle(), 200);
        } else {
          document.getElementById("navbar").style.height = "15vh";
          toggle();
        }
      }}
      sx={{ transition: "0.3s" }}
      bg="blue.600"
      borderRadius="5px"
      p="5px"
    >
      {isOpen ? <CloseIcon /> : <HamburgerIcon />}
    </Box>
  );
}

function MenuItems({ children, isLast, to = "/", ...rest }) {
  return (
    <Link href={to}>
      <Text
        w={{ base: "100%", sm: "auto" }}
        textAlign="center"
        display="block"
        p="5px"
        borderRadius="10px"
        bg={{ base: "blue.600", sm: "transparent" }}
        {...rest}
      >
        {children}
      </Text>
    </Link>
  );
}

function DrawerNavbar({ isOpen }) {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <ScaleFade initialScale={0.5} in={isOpen}>
        <Stack
          spacing={8}
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <MenuItems fontWeight="bold" fontSize="15pt" to="/">
            Home
          </MenuItems>
          <MenuItems fontWeight="bold" fontSize="15pt" to="/">
            Profile
          </MenuItems>
          <MenuItems fontWeight="bold" fontSize="15pt" to="/">
            Events
          </MenuItems>
          <MenuItems
            p="15px"
            color="white"
            bg="blue.400"
            fontSize="15pt"
            to="/"
            isLast
            borderRadius="10px"
            fontWeight="bold"
          >
            Login
          </MenuItems>
        </Stack>
      </ScaleFade>
    </Box>
  );
}

const NavbarContainer = ({ children, props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      id="navbar"
      justify="space-between"
      wrap="wrap"
      p={8}
      w="100%"
      bg={["blue.500", "blue.400", "blue.200", "blue.100"]}
      color={["white", "white", "blue.500", "blue.500"]}
      boxShadow="sm"
      maxH={{ base: "60vh", sm: "25vh", md: "15vh" }}
      sx={{ transition: " background 0.3s, height 0.4s" }}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    window.onresize = () => {
      if (window.innerWidth >= 800) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
  }, []);

  return (
    <NavbarContainer {...props}>
      <Logo w="auto" color={["white", "white", "blue.500", "blue.500"]} />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <DrawerNavbar isOpen={isOpen} />
    </NavbarContainer>
  );
}
