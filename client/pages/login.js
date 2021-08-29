import Head from "next/head";
import {
  Heading,
  Text,
  Box,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Flex,
  Center,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import styles from "../components/Orenda.module.css";
import { useRouter } from "next/router";
import { API_BASE_URL } from "../config";
import VideoBackground from "../components/VideoBackground";
import * as cookie from "cookie";

export default function Login(props) {
  var [rollNo, setRn] = useState("");
  var [password, setPw] = useState("");
  var [loading, setLoading] = useState(false);
  var [show, setShow] = useState(false);
  const [visible, setVisible] = useState(true);
  const toast = useToast();
  const [userState, userDispatch] = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (JSON.stringify(userState.userInfo) != "{}") {
      setVisible(false);
      router.replace("/");
    }
  }, [userState]);

  async function handleLogin(e) {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/u/auth/login/`, {
        username: parseInt(rollNo, 10),
        password: password,
      });
      if (res.status == 200) {
        userDispatch({
          type: "LOGIN_USER",
        });
        userDispatch({
          type: "ADD_USER",
          payload: { ...res.data.user, token: res.data.token },
        });
        window.document.cookie = cookie.serialize("token", res.data.token);
        toast({
          title: "Successfully logged in",
          status: "success",
          duration: 3000,
          position: "top-right",
        });
        router.back();
        setLoading(false);
      } else {
        throw new Error("Login failed. Please try again");
      }
    } catch (error) {
      toast({
        title: `${error}`,
        status: "error",
        duration: 2000,
        position: "top-right",
      });
      setRn("");
      setPw("");
      setLoading(false);
    }
  }

  return (
    <Box onMouseUp={() => setShow(false)}>
      <Head>
        <title>FACES-21 | Login</title>
      </Head>
      <VideoBackground />
      <Center
        flexDirection="column"
        height="100vh"
        bg="rgb(0,0,0,0.4)"
        position="relative"
        zIndex="5"
      >
        {visible && (
          <Flex
            direction="column"
            bgGradient="linear-gradient(147deg, rgb(17,82,45,0.9) 0%, rgb(0,0,0,0.9) 74%)"
            p={12}
            borderRadius="10px"
            w={{ base: "auto", md: "50%" }}
          >
            <Center flexDirection="column" gridGap="6">
              <Heading fontSize={{ base: "25pt", md: "50pt" }} color="white">
                FACES-21
              </Heading>
              <Text
                mt={2}
                fontWeight="normal"
                color="white"
                className={styles.scriptina}
                fontSize={{ base: "30pt", md: "40pt" }}
              >
                Orenda
              </Text>
              <Text fontSize="30pt" my={0} color="white">
                Login
              </Text>
            </Center>
            <FormControl mt={4}>
              <FormLabel fontSize="15pt" fontWeight="bold" color="white">
                Roll no.
              </FormLabel>
              <Input
                placeholder="Roll No"
                value={rollNo}
                onChange={(e) => {
                  setRn(e.target.value);
                }}
                variant="filled"
                type="number"
                _focus={{ bg: "green.200" }}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel fontSize="15pt" fontWeight="bold" color="white">
                Password
              </FormLabel>
              <InputGroup>
                <Input
                  placeholder="*******"
                  value={password}
                  onChange={(e) => {
                    setPw(e.target.value);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleLogin();
                    }
                  }}
                  variant="filled"
                  mb={10}
                  type={show ? "text" : "password"}
                  _focus={{ bg: "green.200" }}
                />
                <InputRightElement>
                  <ViewIcon
                    cursor="pointer"
                    onMouseDown={() => setShow(true)}
                    onTouchStart={() => setShow(true)}
                    onTouchMove={() => setShow(true)}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              isLoading={loading}
              loadingText="Logging in"
              onClick={handleLogin}
              color="white"
              bg="rgb(67, 160, 71)"
              variant="solid"
              _hover={{ opacity: 1 }}
              _active={{ opacity: 1 }}
            >
              Login
            </Button>
          </Flex>
        )}
      </Center>
    </Box>
  );
}

export async function getServerSideProps({ req, res }) {
  const cookies = cookie.parse(req.headers.cookie || "");
  if (cookies.token) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
  }
  return { props: {} };
}
