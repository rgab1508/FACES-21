import Navbar from "./Navbar";
import { Flex, useDisclosure } from "@chakra-ui/react";
import Footer from "./Footer";
import CriteriaStrip from "./CriteriaStrip";
import { useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import COVID from "../components/COVID";

export default function Layout({ children, notFixed }) {
  const [userState, userDispatch] = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [userState.userInfo]);

  return (
    <>
      {userState.isLoggedIn && <CriteriaStrip />}
      <Navbar notFixed={notFixed} />
      <Flex flexDirection="column" minH="100%" minW="100%">
        {children}
      </Flex>
      <Footer />
      {userState.userInfo.token && !userState.userInfo.COVID && (
        <COVID
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={() => {
            onClose();
            userDispatch({
              type: "ADD_USER",
              payload: { ...userState.userInfo, COVID: true },
            });
          }}
        />
      )}
    </>
  );
}
