import { Button,Flex,Heading,Input,ButtonGroup,Text } from "@chakra-ui/react";
import Head from "next/head";
import Layout from "../components/Layout";


export default function Home() {
  return (
    <>
      <Head>
        <title>FACES-21</title>
      </Head>
     
     <Flex height="100vh"alignItems="center" justifyContent="center" >
         <Flex direction="column" background="gray.100" p={12} rounded={6}>
           <Heading mb={6}>Log In</Heading>
           <Input placeholder="Roll No" variant="filled"mb={10} type="number"/>
           <Input placeholder="*******" variant="filled"mb={10} type="password"/>
           <Button colorScheme="teal">Log IN</Button>
           <Text mb={6}>For non FCRIT Students please contact:</Text>
           <Text>Celine Fernandes:</Text>
           <Text>Ritwik Saraf:</Text>
         </Flex>
      </Flex> 

    </>
  );
}
