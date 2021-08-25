import Navbar from "./Navbar";
import { Flex } from "@chakra-ui/react";
import Footer from "./Footer";

export default function Layout({ children, notFixed }) {
  return (
    <>
      <Navbar notFixed={notFixed} />
      <Flex flexDirection="column" minH="100%" minW="100%">
        {children}
      </Flex>
      <Footer />
    </>
  );
}
