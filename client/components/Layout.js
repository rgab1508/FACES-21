import Navbar from "./Navbar";
import { Flex } from "@chakra-ui/react";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Flex flexDirection="column" minH="100%" minW="100%">
        {children}
      </Flex>
      <Footer />
    </>
  );
}
