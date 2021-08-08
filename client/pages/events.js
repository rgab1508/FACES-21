import {
  Flex,
  Box,
  Center,
  Text,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import Head from "next/head";
import Layout from "../components/Layout";
import EventPopup from "../components/EventPopup";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function Events(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [event, setEvent] = useState();
  const [events, setEvents] = useState(props.events);
  const [filterQuery, setFilterQuery] = useState("");
  const [extraQuery, setExtraQuery] = useState("");

  console.log(events);

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
      </Head>
      <Box
        w="100%"
        h="80vh"
        as="video"
        autoPlay={true}
        loop
        zIndex="-1"
        position="fixed"
        muted
        src="NatureVideoTest.mp4"
        objectFit="cover"
      />
      <Layout />
      <Flex flexDirection="column" w="100vw" h="auto">
        <Center flexDirection="column" w="100%" h="80vh" bg="rgb(0,60,0,0.4)">
          <Text p="10px" color="white" fontWeight="bold" fontSize="60pt">
            Events we have
          </Text>
        </Center>
        <Center py="80px" bg="green.100" flexDirection="column" gridGap="5">
          <Flex gridGap="5">
            <Select
              icon={<ChevronDownIcon />}
              value={filterQuery}
              variant="filled"
              placeholder="Select option"
              onChange={(event) => {
                setFilterQuery(event.target.value);
              }}
              w="30vw"
            >
              <option value="Day">Day</option>
              <option value="Participant">Participant type</option>
              <option value="Event">Event category</option>
            </Select>
            {filterQuery != "" && (
              <Select
                w="30vw"
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
                    <option value="S">Sports</option>
                    <option value="C">Cultural</option>
                  </>
                )}
              </Select>
            )}
          </Flex>
          {events.map(function (event, index) {
            return (
              <Flex
                key={index}
                w={{ base: "90%", lg: "60%" }}
                h="auto"
                flexDirection="row"
                bg="green.500"
                borderRadius="10px"
                onClick={() => {
                  setEvent(event);
                  onOpen();
                }}
              >
                <Box p="15px" w="50%">
                  <Text color="white" fontWeight="bold" fontSize="20pt">
                    {event.title}
                  </Text>
                  <Text
                    w="100%"
                    noOfLines={3}
                    isTruncated
                    color="white"
                    fontSize="16pt"
                  >
                    {event.description}
                  </Text>
                </Box>
                <Box
                  background={`url(https://faces21.herokuapp.com/media/${event.image})`}
                  backgroundSize="cover"
                  backgroundPosition="center"
                  backgroundRepeat="no-repeat"
                  borderRadius="10px"
                  w="50%"
                ></Box>
              </Flex>
            );
          })}
          {event != undefined && (
            <EventPopup isOpen={isOpen} onClose={onClose} event={event} />
          )}
        </Center>
      </Flex>
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
