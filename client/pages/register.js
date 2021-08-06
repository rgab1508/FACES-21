import { Button,Flex,Heading,Input,ButtonGroup,Select,Text } from "@chakra-ui/react";
import Head from "next/head";
import Layout from "../components/Layout";


export default function register() {
  return (
    <>
      <Head>
        <title>FACES-21</title>
      </Head>
     
     <Flex height="120vh"background="green.100"alignItems="center" justifyContent="center" >
         <Flex direction="column" background="green.200" p={62} rounded={62}>
           <Heading mb={10}></Heading>
           <Heading mb={6}>Register</Heading>
           <Input placeholder="Roll No" variant="filled"mb={5} type="number"/>
           <Input placeholder="College Email-ID" variant="filled"mb={5} type="email"/>
           <Input placeholder="Name" variant="filled"mb={5} type="text"/>
           <Select bg="white" _focus={{ outline: "none!important" }} placeholder="Select Department" position="relative"mb={5} zIndex="0" >
                <option value="">Computer</option>
                <option value="">IT</option>
                <option value="">EXTC</option>
                <option value="">Electrical</option>
                <option value="">Mechanical</option>
            </Select>
            <Select bg="white" _focus={{ outline: "none!important" }} placeholder="Select Semester" position="relative" mb={5} zIndex="0" >
                <option value="">Sem 3</option>
                <option value="">Sem 5</option>
                <option value="">Sem 7</option>
            </Select>
           <Input placeholder="Phone No" variant="filled"mb={5} type="tel"/>
           <Input placeholder="Enter Your Password" variant="filled"mb={5} type="password"/>
           <Input placeholder="Retype Your Password" variant="filled"mb={5} type="password"/>
           <Button colorScheme="green">Register</Button>
           
         </Flex>
      </Flex> 

    </>
  );
}
