import Head from "next/head";
import {
  Heading,
  Text,
  Box,
  Input,
  Button,
  Flex,
  Center,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import styles from "../components/Orenda.module.css";
import { useRouter } from "next/router";
import { API_BASE_URL } from "../config";
import VideoBackground from "../components/VideoBackground";

export default function Login(props) {
  var [rollNo, setRn] = useState("");
  var [password, setPw] = useState("");
  var [loading, setLoading] = useState(false);
  const toast = useToast();
  const [userState, userDispatch] = useContext(UserContext);
  const router = useRouter();

  async function handleLogin(e) {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/u/auth/login/`, {
        username: parseInt(rollNo, 10),
        password: password,
      });
      if (res.status == 200) {
        userDispatch({
          type: "ADD_USER",
          payload: { ...res.data.user, token: res.data.token },
        });
        toast({
          title: "Successfully logged in",
          status: "success",
          duration: 3000,
          position: "top-right",
        });
        router.back();
        setLoading(false);
      } else {
        throw new Error(res.data.message);
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
    <>
      <Head>
        <title>FACES-21</title>
      </Head>
      <VideoBackground />
      <Navbar />
      <Center flexDirection="column" height="100vh" bg="rgb(0,60,0,0.4)">
        <Flex
          direction="column"
          background="green.400"
          p={12}
          borderRadius="10px"
          w={{ base: "auto", md: "50%" }}
        >
          <Center flexDirection="column">
            <Heading fontSize={{ base: "25pt", md: "50pt" }} color="white">
              FACES-21
            </Heading>
            <Text
              mt={2}
              fontWeight="bold"
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
            <FormLabel fontWeight="bold" color="white">
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
            <FormLabel fontWeight="bold" color="white">
              Password
            </FormLabel>
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
              type="password"
              _focus={{ bg: "green.200" }}
            />
          </FormControl>
          <Button
            isLoading={loading}
            loadingText="Logging in"
            onClick={handleLogin}
            colorScheme="green"
          >
            Login
          </Button>
        </Flex>
      </Center>
    </>
  );
}
