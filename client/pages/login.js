import Head from "next/head";
import {
  Heading,
  Box,
  Input,
  Button,
  Flex,
  Center,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";

export default function Login(props) {
  return (
    <>
      <Head>
        <title>FACES-21</title>
      </Head>
      <Box
        w="100%"
        h="100vh"
        as="video"
        autoPlay={true}
        loop
        zIndex="-1"
        position="fixed"
        muted
        src="NatureVideoTest.mp4"
        objectFit="cover"
      />
      <Navbar />
      <Center flexDirection="column" height="100vh" bg="rgb(0,60,0,0.4)">
        <Flex
          direction="column"
          background="green.400"
          p={12}
          borderRadius="10px"
          w="50%"
        >
          <Center flexDirection="column">
            <Heading fontSize="50pt" color="white">
              FACES-21
            </Heading>
            <Heading mb={6} color="white">
              Login
            </Heading>
          </Center>
          <FormControl mt={4}>
            <FormLabel fontWeight="bold" color="white">
              Roll no.
            </FormLabel>
            <Input
              placeholder="Roll No"
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
              variant="filled"
              mb={10}
              type="password"
              _focus={{ bg: "green.200" }}
            />
          </FormControl>
          <Button colorScheme="green">Login</Button>
        </Flex>
      </Center>
    </>
  );
}
