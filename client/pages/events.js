import { Flex, Box, Center, Text, useDisclosure } from "@chakra-ui/react";
import Head from "next/head";
import Layout from "../components/Layout";
import EventPopup from "../components/EventPopup";
import { useState } from "react";

export default function Events(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [event, setEvent] = useState();

  var events = [
    {
      day: "",
      start: "",
      end: "",
      title: "Hello world",
      description:
        "This is important to remember. Love isn't like pie. You don't need to divide it among all your friends and loved ones. No matter how much love you give, you can always give more. It doesn't run out, so don't try to hold back giving it as if it may one day run out. Give it freely and as much as you want.",
      image: "",
      seats: "",
      maxSeats: "",
      category: "",
      isSeminar: false,
      teamSize: 5,
      isTeamSizeStrict: false,
      entryFee: "",
      prizeMoney: "",
    },
    {
      day: "",
      start: "",
      end: "",
      title: "I am back",
      description:
        "It was a scrape that he hardly noticed. Sure, there was a bit of blood but it was minor compared to most of the other cuts and bruises he acquired on his adventures. There was no way he could know that the rock that produced the cut had alien genetic material on it that was now racing through his bloodstream. He felt perfectly normal and continued his adventure with no knowledge of what was about to happen to him.",
      image: "",
      seats: "",
      maxSeats: "",
      category: "",
      isSeminar: false,
      teamSize: 5,
      isTeamSizeStrict: false,
      entryFee: "",
      prizeMoney: "",
    },
  ];

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
                  background={`url(https://source.unsplash.com/random)`}
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
