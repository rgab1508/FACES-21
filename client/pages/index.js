import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>FACES-21</title>
      </Head>
      <Flex align="center" justify="center" w="100%" h="100%">
        <Layout>This is under development</Layout>
      </Flex>
    </>
  );
}
