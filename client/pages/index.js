import {
  Box,
  Flex,
  Text,
  Center,
  HStack,
  Heading,
  Badge,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import Head from "next/head";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import styles from "../components/Orenda.module.css";
import VideoBackground from "../components/VideoBackground";
import { motion, isValidMotionProp } from "framer-motion";
import { API_BASE_URL } from "../config";

// ? Radio buttons for days.

function CustomRadioButton(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        bg="rgb(0,0,0,0.4)"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "linear-gradient(147deg, rgb(17, 82, 45) 0%, #000000 74%)",
          color: "white",
          borderColor: "black",
        }}
        _focus={{
          outline: "none!important",
        }}
        px={5}
        py={3}
        color="white"
        zIndex={1}
        fontWeight="bold"
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default function Home(props) {
  const [events, setEvents] = useState(props.events);
  const [dayQuery, setDayQuery] = useState("1");
  const MotionHeading = motion(Heading);
  const MotionText = motion(Text);

  const options = ["Day 1", "Day 2", "Day 3"];
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "day",
    defaultValue: "Day 1",
    onChange: (value) => {
      setDayQuery(value);
    },
  });

  const group = getRootProps();

  useEffect(() => {
    let newEvents;
    if (dayQuery == "Day 1") {
      newEvents = props.events.filter((event) => event.day == 1);
      setEvents(newEvents);
    } else if (dayQuery == "Day 2") {
      newEvents = props.events.filter((event) => event.day == 2);
      setEvents(newEvents);
    } else if (dayQuery == "Day 3") {
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
            bg="rgb(0,0,0,0.35)"
            py="60px"
            flexDirection="column"
            h="auto"
          >
            <Center mb={10} w="50%">
              <HStack {...group}>
                {options.map((option, index) => {
                  const radio = getRadioProps({ value: option });
                  return (
                    <CustomRadioButton key={index} {...radio}>
                      {option}
                    </CustomRadioButton>
                  );
                })}
              </HStack>
            </Center>
            <Flex flexDirection="column" w="80%" gridGap="3">
              {events.map((evt, key) => (
                <Flex key={key} flex={1}>
                  {key % 2 == 0 ? <Box w={{ md: "60%" }} /> : null}
                  <Flex
                    borderRadius="10px"
                    w={{ base: "100%", md: "50%" }}
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
  const res = await fetch(`${API_BASE_URL}/api/e`).then((response) =>
    response.json()
  );

  return {
    props: {
      events: res.events,
    },
  };
}
