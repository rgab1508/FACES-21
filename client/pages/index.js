import { Flex, Text, Center, Heading } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import styles from "../components/Orenda.module.css";
import VideoBackground from "../components/VideoBackground";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../config";
import HomeEvents from "../components/HomeEvents";
import Sponsor1 from "../public/sp1.png";
import Sponsor2 from "../public/sp2.jpg";

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
            <Text
              fontWeight="bold"
              color="white"
              fontSize={{ base: "large", md: "35pt" }}
            >
              REGISTRATIONS CLOSED
            </Text>
          </Center>
          <Flex bg="rgb(0,0,0,0.35)">
            <Flex
              mx="auto"
              gridGap={2}
              flexDir={["column", "column", "row", "row"]}
            >
              <Image src={Sponsor1} alt="sponsor image" />
              <Image src={Sponsor2} alt="sponsor image" />
            </Flex>
          </Flex>
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
