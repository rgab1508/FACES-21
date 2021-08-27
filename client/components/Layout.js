import Navbar from "./Navbar";
import { Flex } from "@chakra-ui/react";
import Footer from "./Footer";
import CriteriaStrip from "./CriteriaStrip";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Layout({ children, notFixed }) {
  const [userState, userDispatch] = useContext(UserContext);

  return (
    <>
      {userState.isLoggedIn && <CriteriaStrip />}
      <Navbar notFixed={notFixed} />
      <Flex flexDirection="column" minH="100%" minW="100%">
        {children}
      </Flex>
      <Footer />
    </>
  );
}
