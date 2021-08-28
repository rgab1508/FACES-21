import { Flex, Link, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex
      //bgGradient="linear(to-r,rgb(69, 39, 160,0.75),rgb(69, 40, 160,0.75),rgb(69, 49, 160,0.75),rgb(0, 121, 107,0.75))"
      bg="rgb(69, 39, 160,0.75)"
      w="100%"
      h={{ md: "9vh" }}
      // px={{ base: "20px", md: "50px" }}
      // py={{ md: "20px" }}
      py="20px"
      gridGap="2"
      align="center"
    >
      <Flex
        width="90%"
        mx="auto"
        flexDir={["column-reverse", "row", "row", "row"]}
        align="center"
      >
        <Text noOfLines={2} flex={2} color="rgb(179, 157, 219)">
          Developed by{" "}
          <Link target="_blank" href="https://github.com/theabbie">
            Abhishek
          </Link>
          ,{" "}
          <Link target="_blank" href="https://www.adiunni.tech/">
            Aditya
          </Link>
          ,{" "}
          <Link target="_blank" href="https://github.com/rgab1508">
            Gabriel
          </Link>{" "}
          &{" "}
          <Link target="_blank" href="https://github.com/dcostat04">
            Trevor
          </Link>
        </Text>
        <Text
          flex={1}
          as="a"
          href={"https://fcrit.ac.in"}
          //color="rgb(0, 172, 193)"
          color="rgb(179, 157, 219)"
          textAlign={["center", "end", "end", "end"]}
        >
          F.C.R.I.T
        </Text>
      </Flex>
    </Flex>
  );
}
