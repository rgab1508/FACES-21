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

export default function Home(props) {
  const [events, setEvents] = useState(props.events);
  const [dayQuery, setDayQuery] = useState("1");

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
        <Flex flexDirection="column" w="100%" h="100%">
          <Center
            bg="rgb(0,60,0,0.4)"
            flexDirection="column"
            w="100%"
            h="100vh"
            gridGap="3"
          >
            <Heading fontSize={{ md: "50pt" }} color="white" fontWeight="bold">
              FACES-21
            </Heading>
            <Text
              className={styles.scriptina}
              fontWeight="bold"
              color="white"
              fontSize={{ base: "40pt", md: "90pt" }}
              textAlign="center"
            >
              Orenda
            </Text>
          </Center>
          <Center
            py="50px"
            flexDirection="column"
            w="100%"
            bg="green.100"
            h="auto"
          >
            <Box mb={10} w="50%" borderRadius="5px" border="1px solid white">
              <Select
                bg="white"
                _focus={{ outline: "none!important" }}
                placeholder="Select day"
                position="relative"
                value={dayQuery}
                onChange={(e) => {
                  setDayQuery(e.target.value);
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
                  {key % 2 == 0 ? <Box w={{ lg: "60%" }} /> : null}
                  <Flex
                    borderRadius="10px"
                    w={{ base: "100%", lg: "40%" }}
                    bg="green.500"
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
                        bg="rgb(0,60,0,0.4)"
                        borderRadius="10px"
                      ></Box>
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
