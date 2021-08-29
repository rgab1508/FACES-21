import {
  Box,
  Text,
  Flex,
  Stack,
  ScaleFade,
  Button,
  useToast,
  Heading,
  Icon,
  useDisclosure,
  createIcon,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Cart from "./Cart";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { API_BASE_URL } from "../config";
import * as cookie from "cookie";

const ShoppingCartIcon = createIcon({
  displayName: "shopping cart",
  viewBox: "0 0 576 512",
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      fill="currentColor"
      d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"
    />
  ),
});

function Logo(props) {
  return (
    <Box {...props}>
      <Heading fontSize="25pt" fontWeight="bolder">
        {props.visible == 1 && "FACES-21"}
      </Heading>
    </Box>
  );
}

function MenuToggle({ toggle, isOpen }) {
  return (
    <Flex direction="column" justifyContent="flex-start" p="15px">
      <Box
        // align="center"
        // justify="center"
        display={{ base: "block", md: "none" }}
        onClick={() => {
          if (isOpen == false) {
            document.getElementById("navbar").style.height = "60vh";
            setTimeout(() => toggle(), 200);
          } else {
            document.getElementById("navbar").style.height = "17vh";
            toggle();
          }
        }}
        // sx={{ transition: "0.3s" }}
        bg="green.600"
        borderRadius="5px"
        p="5px"
      >
        {isOpen ? (
          <CloseIcon boxSize="25px" p={1} color="white" />
        ) : (
          <HamburgerIcon boxSize="25px" p={0.3} color="white" />
        )}
      </Box>
    </Flex>
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
        background={{ base: "transparent", sm: "transparent" }}
        cursor="pointer"
        {...rest}
      >
        {children}
      </Text>
    </Link>
  );
}

function DrawerNavbar({ isOpen, cart }) {
  const [userState, userDispatch] = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    if (JSON.stringify(userState.userInfo) == "{}") {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
    setIsLoading(false);
  }, [userState.userInfo]);

  const handleLogout = () => {
    fetch(`${API_BASE_URL}/api/u/auth/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + userState.userInfo.token,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast({
            title: "Successfully Logged Out!",
            status: "success",
            duration: 2000,
            position: "top-right",
          });
          userDispatch({
            type: "REMOVE_USER",
          });
          window.document.cookie = cookie.serialize("token", "", {
            path: "/",
            expires: new Date(0),
          });
          window.location.href = "/";
        } else {
          toast({
            title: "Error logging out, Please Try Again...",
            status: "error",
            duration: 2000,
            position: "top-right",
          });
        }
      })
      .catch((e) => {
        console.log(e);
        toast({
          title: "Error logging out",
          status: "error",
          duration: 2000,
          position: "top-right",
        });
      });
  };

  return isLoading ? (
    <></>
  ) : (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
      background={{
        base: "linear-gradient(147deg, #000000 0%,rgb(69, 39, 160) 74%)",
        md: "transparent",
      }}
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
            _hover={{ bg: "rgb(81, 45, 168)" }}
            fontWeight="bold"
            fontSize="15pt"
            to="/"
            sx={{ transition: "background 0.2s" }}
          >
            Home
          </MenuItems>
          {loggedIn && (
            <MenuItems
              _hover={{ bg: "rgb(81, 45, 168)" }}
              fontWeight="bold"
              fontSize="15pt"
              to="/me"
              sx={{ transition: "background 0.2s" }}
            >
              Profile
            </MenuItems>
          )}

          <MenuItems
            _hover={{ bg: "rgb(81, 45, 168)" }}
            fontWeight="bold"
            fontSize="15pt"
            to="/events"
            sx={{ transition: "background 0.2s" }}
          >
            Events
          </MenuItems>

          {!loggedIn ? (
            <Box borderRadius="10px">
              <Button
                _hover={{ bg: "rgb(81, 45, 168)" }}
                color="white"
                bg="transparent"
                fontSize="15pt"
                fontWeight="bold"
              >
                <Link href="/login">Login</Link>
              </Button>
            </Box>
          ) : (
            <Box p="15px" borderRadius="10px">
              <Button
                _hover={{ bg: "rgb(81, 45, 168)" }}
                color="white"
                bg="transparent"
                fontSize="15pt"
                fontWeight="bold"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          )}
          <Box
            display={["none", "none", "unset", "unset"]}
            p="15px"
            borderRadius="10px"
          >
            <Button
              _hover={{ bg: "rgb(81, 45, 168)" }}
              color="white"
              bg="transparent"
              fontSize="15pt"
              fontWeight="bold"
              position="relative"
              onClick={cart.onOpen}
            >
              <Icon as={ShoppingCartIcon} />
              <Flex
                justifyContent="center"
                alignItems="center"
                w="20px"
                h="20px"
                as="span"
                position="absolute"
                top="0px"
                right="-5px"
                borderRadius="100px"
                backgroundColor="red"
                color="white"
                fontWeight="bold"
                fontSize="12px"
              >
                <Text color="white">
                  {userState.userInfo.teams
                    ? userState.userInfo.teams.filter((tm) => tm && !tm.is_paid)
                        .length
                    : 0}
                </Text>
              </Flex>
            </Button>
          </Box>
        </Stack>
      </ScaleFade>
      <Cart isOpen={cart.isOpen} onClose={cart.onClose} loggedIn={loggedIn} />
    </Box>
  );
}

const NavbarContainer = (props) => {
  const [background, setBackground] = useState("transparent");
  const { setVisible, ...rest } = props;
  useEffect(() => {
    window.addEventListener("scroll", () => {
      let y = window.scrollY;
      if (y >= 500) {
        setBackground("rgb(17,82,45,0.6)");
        setVisible(1);
      } else {
        setBackground("transparent");
        setVisible(0);
      }
    });
  }, []);

  return (
    <Flex
      as="nav"
      id="navbar"
      justify={{ base: "flex-end", md: "space-between" }}
      wrap="wrap"
      p="20px"
      w="100%"
      background={`${background}`}
      color="white"
      maxH={{ base: "60vh", sm: "25vh", md: "19vh" }}
      sx={{ transition: "background 0.2s " }}
      position={props.notFixed ? "relative" : "fixed"}
      zIndex="3"
      {...rest}
    >
      {props.children}
    </Flex>
  );
};

export default function Navbar(props) {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const [visible, setVisible] = useState(0);
  const [userState, userDispatch] = useContext(UserContext);
  const [cartItemsLength, setCartItemsLength] = useState(0);

  const cart = useDisclosure();

  useEffect(() => {
    if (userState.isLoggedIn) {
      console.log(userState.isLoggedIn);
      let newCartItemsLength = 0;
      userState.userInfo.teams.map((t) => {
        if (t && !t.is_paid) newCartItemsLength += 1;
      });
      setCartItemsLength(newCartItemsLength);
    }
  }, [userState.userInfo]);

  useEffect(() => {
    window.onresize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    window.innerWidth >= 768 ? setIsOpen(true) : setIsOpen(false);
  }, []);

  return (
    <NavbarContainer setVisible={setVisible} {...props}>
      <Logo
        w="auto"
        visible={visible}
        color={["white", "white", "white", "white"]}
      />
      <Box
        display={["unset", "unset", "none", "none"]}
        p="15px"
        borderRadius="10px"
      >
        <Button
          _hover={{ bg: "rgb(81, 45, 168)" }}
          color="white"
          bg="transparent"
          fontSize="15pt"
          fontWeight="bold"
          position="relative"
          onClick={cart.onOpen}
        >
          <Icon as={ShoppingCartIcon} />
          <Flex
            justifyContent="center"
            alignItems="center"
            w="20px"
            h="20px"
            as="span"
            position="absolute"
            top="0px"
            right="-5px"
            borderRadius="100px"
            backgroundColor="red"
            color="white"
            fontWeight="bold"
            fontSize="12px"
          >
            <Text color="white">{cartItemsLength}</Text>
          </Flex>
        </Button>
      </Box>
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <DrawerNavbar isOpen={isOpen} cart={cart} />
    </NavbarContainer>
  );
}
