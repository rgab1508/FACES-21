import {
  Box,
  Flex,
  Text,
  Center,
  Select,
  Heading,
  Badge,
} from "@chakra-ui/react";
import Head from "next/head";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import styles from "../components/Orenda.module.css";
import VideoBackground from "../components/VideoBackground";
import { motion, isValidMotionProp } from "framer-motion";

// ? Radio buttons for days.

export default function Home(props) {
  const [events, setEvents] = useState(props.events);
  const [dayQuery, setDayQuery] = useState("1");
  const MotionHeading = motion(Heading);
  const MotionText = motion(Text);
  const MotionFlex = motion(Flex);

  useEffect(() => {
    let newEvents;
    if (dayQuery == 1) {
      newEvents = props.events.filter((event) => event.day == 1);
      setEvents(newEvents);
    } else if (dayQuery == 2) {
      newEvents = props.events.filter((event) => event.day == 2);
      setEvents(newEvents);
    } else if (dayQuery == 3) {
      newEvents = props.events.filter((event) => event.day == 3);
      setEvents(newEvents);
    } else {
      setEvents(props.events);
    }
  }, [dayQuery]);

  return (
    <>
      <Head>
        <title>FACES-21</title>
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
              fontSize={{ base: "50pt", md: "60pt" }}
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
              fontSize={{ base: "70pt", md: "80pt" }}
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
          <Center
            w="100%"
            //bgGradient="radial(rgb(0, 105, 92,0.92),rgb(56, 142, 60,0.7))"
            //bgGradient="linear(to-br,rgb(81, 45, 168,0.9),rgb(81, 45, 168,0.9),rgb(56, 142, 60,0.9))"
            //bg="rgb(0,0,0,0.7)"
            bg="rgb(0,0,0,0.35)"
            py="60px"
            flexDirection="column"
            h="auto"
          >
            <Box mb={10} w="50%">
              <Select
                placeholder="Select day"
                position="relative"
                value={dayQuery}
                onChange={(e) => {
                  setDayQuery(e.target.value);
                }}
                variant="filled"
                bg="rgb(0,0,0,0.7)"
                color="white"
                _focus={{
                  bg: "rgb(0,0,0,0.6)",
                  color: "white",
                  outline: "none!important",
                }}
                zIndex="0"
              >
                <option value="1">Day 1</option>
                <option value="2">Day 2</option>
                <option value="3">Day 3</option>
              </Select>
            </Box>
            <Flex flexDirection="column" w="80%" gridGap="3">
              {events.map((evt, key) => (
                <Flex key={key} flex={1}>
                  {key % 2 == 0 ? <Box w={{ md: "60%" }} /> : null}
                  <Flex
                    borderRadius="10px"
                    w={{ base: "100%", md: "50%" }}
                    //bg="rgb(126, 87, 194)"
                    //bg="rgb(0,0,0)"
                    bgColor="#923cb5"
                    backgroundImage="linear-gradient(147deg, rgb(69, 39, 160) 0%, #000000 74%)"
                    boxShadow="xl"
                    _hover={{ boxShadow: "2xl", transform: "scale(1.1)" }}
                    sx={{ transition: "transform 0.2s, box-shadow 0.25s" }}
                    maxH="23vh"
                  >
                    <Flex flexDirection="column" w="50%" p="15px" gridGap="1">
                      <Text
                        fontWeight="bold"
                        fontSize={{ base: "auto", lg: "20pt" }}
                        color="white"
                      >
                        {evt.title}
                      </Text>
                      <Box>
                        <Badge
                          bg={evt.category == "S" ? "blue.700" : "red.700"}
                          color="white"
                          fontSize="14pt"
                          borderRadius="5px"
                        >
                          {evt.category == "S" ? "Sports" : "Cultural"}
                        </Badge>
                      </Box>
                      <Text
                        fontSize={{ base: "auto", lg: "20pt" }}
                        color="white"
                      >
                        {evt.start}
                      </Text>
                    </Flex>
                    <Flex
                      w="50%"
                      background={`url(https://faces21.herokuapp.com${evt.image})`}
                      backgroundSize="cover"
                      backgroundPosition="center"
                      backgroundRepeat="no-repeat"
                      borderRadius="10px"
                    >
                      <Box
                        h="100%"
                        w="100%"
                        bg="rgb(0,0,0,0.4)"
                        borderRadius="10px"
                      />
                    </Flex>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </Center>
        </Flex>
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  const res = await fetch("https://faces21.herokuapp.com/api/e").then(
    (response) => response.json()
  );

  return {
    props: {
      events: res.events,
    },
  };
}
