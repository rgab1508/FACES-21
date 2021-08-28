import { Flex, Text, Center, Heading } from "@chakra-ui/react";
import Head from "next/head";
import Layout from "../components/Layout";
import styles from "../components/Orenda.module.css";
import VideoBackground from "../components/VideoBackground";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../config";
import HomeEvents from "../components/HomeEvents";

// ? Radio buttons for days.

export default function Home(props) {
  const MotionHeading = motion(Heading);
  const MotionText = motion(Text);

  return (
    <>
      <Head>
        <title>FACES-21</title>
        <meta name="title" content="FACES-21 • Events" />
        <meta
          name="description"
          content="Annual sports and cultural festival organised at F.C.R.I.T"
        />
      </Head>
      <VideoBackground />
      <Layout>
        <Flex flexDirection="column" minW="100%" minH="100%">
          <Center
            bg="rgb(0,0,0,0.35)"
            flexDirection="column"
            w="100%"
            h="100vh"
            gridGap="10"
          >
            <MotionHeading
              fontSize={{ base: "40pt", md: "60pt" }}
              color="white"
              fontWeight="bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 10,
              }}
              mb={{ md: "30px" }}
            >
              FACES-21
            </MotionHeading>
            <MotionText
              className={styles.scriptina}
              color="white"
              fontSize={{ base: "55pt", md: "80pt" }}
              textAlign="center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 10,
              }}
              pr={7}
            >
              Orenda
            </MotionText>
          </Center>
          <HomeEvents events={props.events} />
        </Flex>
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  const res = await fetch(`${API_BASE_URL}/api/e`).then((response) =>
    response.json()
  );

  return {
    props: {
      events: res.events,
    },
    revalidate: 10,
  };
}
