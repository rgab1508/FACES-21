import {
  Flex,
  Heading,
  Box,
  Center,
  Text,
  useDisclosure,
  Select,
  Badge,
  IconButton,
  Input,
} from "@chakra-ui/react";
import Head from "next/head";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { ChevronDownIcon, AddIcon, MinusIcon } from "@chakra-ui/icons";
import VideoBackground from "../components/VideoBackground";
import { API_BASE_URL } from "../config";
import EventCard from "../components/EventCard";
import { AnimateSharedLayout } from "framer-motion";

export default function Events(props) {
  const [events, setEvents] = useState(props.events);
  const [filterQuery, setFilterQuery] = useState("");
  const [extraQuery, setExtraQuery] = useState("");

  useEffect(() => {
    let newEvents;
    if (extraQuery == "S") {
      newEvents = props.events.filter((e) => e.category == "S");
      setEvents(newEvents);
    } else if (extraQuery == "C") {
      newEvents = props.events.filter((e) => e.category == "C");
      setEvents(newEvents);
    } else if (extraQuery == 1) {
      newEvents = props.events.filter((e) => e.day == 1);
      setEvents(newEvents);
    } else if (extraQuery == 2) {
      newEvents = props.events.filter((e) => e.day == 2);
      setEvents(newEvents);
    } else if (extraQuery == 3) {
      newEvents = props.events.filter((e) => e.day == 3);
      setEvents(newEvents);
    } else if (extraQuery == "Solo") {
      newEvents = props.events.filter((e) => e.team_size <= 1);
      setEvents(newEvents);
    } else if (extraQuery == "Group") {
      newEvents = props.events.filter((e) => e.team_size > 1);
      setEvents(newEvents);
    } else {
      setEvents(props.events);
    }
  }, [extraQuery]);

  return (
    <>
      <Head>
        <title>FACES-21 • Events</title>
        <meta name="title" content="FACES-21 • Events" />
        <meta
          name="description"
          content="Here is the list of events for this year"
        />
      </Head>
      <VideoBackground />
      <Layout>
        <Flex flexDirection="column" w="auto" h="auto">
          <Center
            flexDirection="column"
            w="100%"
            h={{ base: "66vh", md: "80vh" }}
          >
            <Heading
              p="10px"
              color="white"
              fontSize={{ base: "35pt", md: "60pt" }}
              textAlign="center"
            >
              Events we have
            </Heading>
            <Text
              w={{ base: "90%", md: "60%" }}
              p="10px"
              color="white"
              fontSize={{ base: "13pt", md: "20pt" }}
            >
              FACES offers you a variety of events to choose from. Feel free to
              pick any event of your choice, but make sure you follow the
              registration criteria.
            </Text>
          </Center>
          <Center
            py="80px"
            /*bg="green.100"*/ flexDirection="column"
            gridGap="5"
          >
            <Flex gridGap="5">
              <Select
                icon={<ChevronDownIcon />}
                value={filterQuery}
                variant="filled"
                bg="rgb(0,0,0,0.7)"
                color="white"
                placeholder="Select Filter"
                onChange={(event) => {
                  setFilterQuery(event.target.value);
                }}
                w={{ base: "40vw", md: "30vw" }}
                _focus={{ bg: "rgb(0,0,0,0.6)", color: "white" }}
                _hover={{ bg: "rgb(0,0,0)" }}
              >
                <option value="Day">Day</option>
                <option value="Participant">Participant type</option>
                <option value="Event">Event category</option>
              </Select>
              {filterQuery != "" && (
                <Select
                  w={{ base: "40vw", md: "30vw" }}
                  variant="filled"
                  placeholder={
                    filterQuery == "Day"
                      ? "Select day"
                      : filterQuery == "Participant"
                      ? "Select category"
                      : "Select event category"
                  }
                  value={extraQuery}
                  onChange={(event) => {
                    setExtraQuery(event.target.value);
                  }}
                  bg="rgb(0,0,0,0.7)"
                  color="white"
                  _focus={{ bg: "rgb(0,0,0,0.6)", color: "white" }}
                  _hover={{ bg: "rgb(0,0,0)" }}
                >
                  {filterQuery == "Day" ? (
                    <>
                      <option value={1}>Day - 1</option>
                      <option value={2}>Day - 2</option>
                      <option value={3}>Day - 3</option>
                    </>
                  ) : filterQuery == "Participant" ? (
                    <>
                      <option value="Solo">Solo</option>
                      <option value="Group">Group</option>
                    </>
                  ) : (
                    <>
                      <option value="S">E - sports</option>
                      <option value="C">Cultural</option>
                    </>
                  )}
                </Select>
              )}
            </Flex>
            <AnimateSharedLayout type="crossfade">
              {events.map(function(event, index) {
                return <EventCard key={index} event={event} />;
              })}
            </AnimateSharedLayout>
          </Center>
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
