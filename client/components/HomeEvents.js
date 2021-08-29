import {
  Center,
  Flex,
  Box,
  HStack,
  useRadio,
  Text,
  useRadioGroup,
  Badge,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config";

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
        fontWeight="bold"
        w={{ base: "20vw", lg: "auto" }}
        fontSize={{ base: "10pt", md: "13pt" }}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default function HomeEvents({ events }) {
  const options = ["All", "Day 1", "Day 2", "Day 3"];
  const [dayQuery, setDayQuery] = useState("All");
  const [eves, setEvents] = useState(events);
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "day",
    onChange: (value) => {
      setDayQuery(value);
    },
    defaultValue: "All",
  });

  const group = getRootProps();

  useEffect(() => {
    let newEvents;
    if (dayQuery == "Day 1") {
      newEvents = events.filter((event) => event.day == 1);
      setEvents(newEvents);
    } else if (dayQuery == "Day 2") {
      newEvents = events.filter((event) => event.day == 2);
      setEvents(newEvents);
    } else if (dayQuery == "Day 3") {
      newEvents = events.filter((event) => event.day == 3);
      setEvents(newEvents);
    } else {
      setEvents(events);
    }
  }, [dayQuery]);

  return (
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
              <CustomRadioButton c={false} key={index} {...radio}>
                {option}
              </CustomRadioButton>
            );
          })}
        </HStack>
      </Center>
      <Flex flexDirection="column" w="80%" gridGap="3">
        {eves.map((evt, key) => (
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
              minH="23vh"
              flexDirection={{ base: "column-reverse", md: "row" }}
            >
              <Flex
                align={{ base: "center", md: "initial" }}
                justify={{ base: "center", md: "initial" }}
                flexDirection="column"
                w={{ base: "100%", md: "50%" }}
                p={{ base: "5px", md: "15px" }}
                gridGap="1"
              >
                <Text
                  fontWeight="bold"
                  fontSize={{ base: "12pt", lg: "20pt" }}
                  color="white"
                >
                  {evt.title}
                </Text>
                <Box>
                  <Badge
                    bg={evt.category == "S" ? "blue.700" : "red.700"}
                    color="white"
                    fontSize={{ base: "9pt", md: "14pt" }}
                    borderRadius="5px"
                  >
                    {evt.category == "S" ? "Sports" : "Cultural"}
                  </Badge>
                </Box>
                <Text fontSize={{ base: "12pt", lg: "20pt" }} color="white">
                  {evt.start}
                </Text>
              </Flex>
              <Box
                overflow="hidden"
                w={{ base: "100%", md: "50%" }}
                h={{ base: "15vh", md: "auto" }}
                borderRadius="10px"
              >
                <Flex
                  background={`url(${API_BASE_URL}${evt.image})`}
                  backgroundSize="cover"
                  backgroundPosition="center"
                  backgroundRepeat="no-repeat"
                  w="100%"
                  h="100%"
                  transition="0.2s all"
                  _hover={{ transform: "scale(1.1)" }}
                >
                  <Box
                    h="100%"
                    w="100%"
                    bg="rgb(0,0,0,0.4)"
                    borderRadius="10px"
                  />
                </Flex>
              </Box>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Center>
  );
}
