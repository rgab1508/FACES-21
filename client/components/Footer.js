import { Flex, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex
      //bgGradient="linear(to-r,rgb(69, 39, 160,0.75),rgb(69, 40, 160,0.75),rgb(69, 49, 160,0.75),rgb(0, 121, 107,0.75))"
      bg="rgb(69, 39, 160,0.75)"
      w="100%"
      h={{ md: "8vh" }}
      px={{ base: "20px", md: "50px" }}
      py="20px"
      gridGap="2"
    >
      <Text noOfLines={2} flex={2} color="rgb(179, 157, 219)">
        Developed by Aditya, Abhishek, Trevor & Gabriel
      </Text>
      <Text
        flex={1}
        as="a"
        href={"https://fcrit.ac.in"}
        //color="rgb(0, 172, 193)"
        color="rgb(179, 157, 219)"
        textAlign="end"
      >
        F.C.R.I.T
      </Text>
    </Flex>
  );
}
