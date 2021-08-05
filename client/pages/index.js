import { Box, Flex, Text, Center, Select, Image } from "@chakra-ui/react";
import Head from "next/head";
import Layout from "../components/Layout";

export default function Home(props) {
  const events = [
    { title: "He meet", time: "10:00 AM", categ: "Cultural" },
    { title: "Badminton", time: "10:30 AM", categ: "Sports" },
    { title: "Feast", time: "11:00 AM", categ: "Fun" },
    { title: "Fresher's party", time: "12:00 PM", categ: "Fun" },
    { title: "Kabbaddi", time: "1:00 PM", categ: "Sports" },
    { title: "Crystal Maze", time: "2:00 PM", categ: "Fun" },
    { title: "DJ Party", time: "4:00 PM", categ: "Fun" },
  ];

  return (
    <>
      <Head>
        <title>FACES-21</title>
      </Head>
      <Box
        w="100%"
        h="100vh"
        as="video"
        autoPlay={true}
        loop
        zIndex="-1"
        position="fixed"
        muted
        src="NatureVideoTest.mp4"
        objectFit="cover"
      />
      <Layout>
        <Flex flexDirection="column" w="100%" h="100%">
          <Center
            bg="rgb(0,60,0,0.4)"
            flexDirection="column"
            w="100%"
            h="80vh"
            gridGap="3"
          >
            <Text fontSize="60pt" color="white" fontWeight="bold">
              FACES-21
            </Text>
            <Text color="white" fontSize="20pt">
              Peace love and plants
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
                zIndex="0"
              >
                <option value="">Day 1</option>
                <option value="">Day 2</option>
                <option value="">Day 3</option>
              </Select>
            </Box>
            <Flex flexDirection="column" w="80%" gridGap="3">
              {events.map((evt, key) => (
                <Flex key={key} flex={1}>
                  {key % 2 == 0 ? <Box w="60%" /> : null}
                  <Flex
                    borderRadius="10px"
                    w="40%"
                    bg="green.500"
                    boxShadow="xl"
                    maxH="23vh"
                  >
                    <Flex flexDirection="column" w="50%" p="15px">
                      <Text fontWeight="bold" fontSize="20pt" color="white">
                        {evt.title}
                      </Text>
                      <Text fontSize="20pt" color="white">
                        {evt.categ}
                      </Text>
                      <Text fontSize="20pt" color="white">
                        {evt.time}
                      </Text>
                    </Flex>
                    <Flex
                      w="50%"
                      background={`url(https://picsum.photos/200/300)`}
                      backgroundSize="cover"
                      backgroundPosition="center"
                      backgroundRepeat="no-repeat"
                      borderRadius="10px"
                    />
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
