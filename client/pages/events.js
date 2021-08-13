import {
  Flex,
  Heading,
  Box,
  Center,
  Text,
  useDisclosure,
  Select,
  Badge,
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
          <Heading p="10px" color="white" fontSize="60pt">
            Events we have
          </Heading>
          <Text w="60%" p="10px" color="white" fontSize="20pt">
            FACES offers you a variety of events to choose from. Feel free to
            pick any event of your choice, but make sure you follow the
            registration criteria.
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
                boxShadow="lg"
                sx={{
                  transition:
                    "box-shadow 0.3s , transform 0.3s, margin-bottom 0.3s",
                }}
                _hover={{
                  boxShadow: "2xl",
                  transform: "scale(1.1)",
                  marginBottom: "20px",
                }}
              >
                <Box p="15px" w="50%">
                  <Text color="white" fontWeight="bold" fontSize="20pt">
                    {event.title}
                  </Text>
                  <Text w="100%" noOfLines={2} color="white" fontSize="16pt">
                    {event.description}
                  </Text>
                  <Text
                    w="100%"
                    noOfLines={2}
                    color="white"
                    fontWeight="bold"
                    fontSize="16pt"
                  >
                    {event.start} - {event.end}
                  </Text>
                </Box>
                <Box
                  //background={`url(https://faces21.herokuapp.com${event.image})`}
                  background={`url(https://drive.google.com/file/d/19Jz0zSQD8AOkrBJxDSrMfByATuHQclqx/view?usp=sharing)`}
                  backgroundSize="cover"
                  backgroundPosition="center"
                  backgroundRepeat="no-repeat"
                  borderRadius="10px"
                  w="50%"
                >
                  <Flex
                    p="10px"
                    bg="rgb(52, 130, 39,0.4)"
                    h="100%"
                    w="100%"
                    flexDirection="column"
                    borderRadius="10px"
                    gridGap="2"
                  >
                    <Badge
                      ml="auto"
                      bg="purple.700"
                      color="white"
                      fontSize="14pt"
                      borderRadius="5px"
                    >
                      Day - {event.day}
                    </Badge>
                    <Badge
                      ml="auto"
                      bg={event.category == "S" ? "blue.700" : "red.700"}
                      color="white"
                      fontSize="14pt"
                      borderRadius="5px"
                    >
                      {event.category == "S" ? "Sports" : "Cultural"}
                    </Badge>
                    {event.team_size > 1 ? (
                      <Badge
                        ml="auto"
                        bg="yellow.500"
                        color="white"
                        fontSize="14pt"
                        borderRadius="5px"
                      >
                        Group
                      </Badge>
                    ) : null}
                  </Flex>
                </Box>
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
