import { Flex, Link, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex
      //bgGradient="linear(to-r,rgb(69, 39, 160,0.75),rgb(69, 40, 160,0.75),rgb(69, 49, 160,0.75),rgb(0, 121, 107,0.75))"
      bg="rgb(69, 39, 160,0.75)"
      w="100%"
      h={{ md: "9vh" }}
      px={{ base: "20px", md: "50px" }}
      py={{ md: "20px" }}
      gridGap="2"
      align="center"
    >
      <Text noOfLines={2} flex={2} color="rgb(179, 157, 219)">
        Developed by <Link href="https://github.com/theabbie">Abhishek</Link>,{" "}
        <Link href="https://www.adiunni.tech/">Aditya</Link>,{" "}
        <Link href="https://github.com/rgab1508">Gabriel</Link> &{" "}
        <Link href="https://github.com/dcostat04">Trevor</Link>
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
