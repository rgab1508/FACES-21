import { Box, Text, Flex, Stack, Fade, ScaleFade } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useEffect, useState } from "react";

function Logo(props) {
  return (
    <Box {...props}>
      <Text fontSize="25pt" fontWeight="bolder">
        {props.visible && "FACES-21"}
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
          document.getElementById("navbar").style.height = "19vh";
          toggle();
        }
      }}
      sx={{ transition: "0.3s" }}
      bg="green.600"
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
        bg={{ base: "green.600", sm: "transparent" }}
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
      bg={{ base: "green.500", md: "transparent" }}
      p={{ base: "20px", md: "0px" }}
      borderRadius="15px"
    >
      <ScaleFade initialScale={0.5} in={isOpen}>
        <Stack
          spacing={8}
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <MenuItems
            _hover={{ bg: "green.300" }}
            fontWeight="bold"
            fontSize="15pt"
            to="/"
            sx={{ transition: "background 0.2s" }}
          >
            Home
          </MenuItems>
          <MenuItems
            _hover={{ bg: "green.300" }}
            fontWeight="bold"
            fontSize="15pt"
            to="/"
            sx={{ transition: "background 0.2s" }}
          >
            Profile
          </MenuItems>
          <MenuItems
            _hover={{ bg: "green.300" }}
            fontWeight="bold"
            fontSize="15pt"
            to="/"
            sx={{ transition: "background 0.2s" }}
          >
            Events
          </MenuItems>
          <MenuItems
            p="15px"
            color="white"
            bg="green.300"
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

const NavbarContainer = (props) => {
  const [background, setBackground] = useState("transparent");
  useEffect(() => {
    window.addEventListener("scroll", () => {
      let y = window.scrollY;
      if (y >= 500) {
        setBackground("green.400");
        props.setVisible(true);
      } else {
        setBackground("transparent");
        props.setVisible(false);
      }
    });
  }, []);

  return (
    <Flex
      as="nav"
      align="center"
      id="navbar"
      justify="space-between"
      wrap="wrap"
      p="20px"
      w="100%"
      bg={`${background}`}
      color={["white", "white", "white", "white"]}
      maxH={{ base: "60vh", sm: "25vh", md: "19vh" }}
      sx={{ transition: " background 0.2s, height 0.4s" }}
      position="fixed"
      {...props}
    >
      {props.children}
    </Flex>
  );
};

export default function Navbar(props) {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.onresize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
  }, []);

  return (
    <NavbarContainer setVisible={setVisible} {...props}>
      <Logo
        w="auto"
        visible={visible}
        color={["white", "white", "white", "white"]}
      />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <DrawerNavbar isOpen={isOpen} />
    </NavbarContainer>
  );
}
