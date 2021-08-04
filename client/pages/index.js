import { Flex, Text } from "@chakra-ui/react";
import Head from "next/head";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>FACES-21</title>
      </Head>
      <Flex align="center" justify="center" w="100%" h="100%">
        <Layout>
          <Flex w="100%" p="10px">
            <Text color="black" fontWeight="bold" fontSize="14pt">
              This website is under development
            </Text>
          </Flex>
        </Layout>
      </Flex>
    </>
  );
}
