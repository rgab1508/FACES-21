import Navbar from "./Navbar";
import { Flex } from "@chakra-ui/react";

export default function Layout({ children }) {
  return (
    <>
      <Flex flexDirection="column" minH="100%" minW="100%">
        <Navbar />
        {children}
      </Flex>
    </>
  );
}
