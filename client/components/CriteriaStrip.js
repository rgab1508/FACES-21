import { InfoIcon } from "@chakra-ui/icons";
import {
  Box,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import { UserContext } from "../context/UserContext";

const CriteriaStrip = () => {
  const [userState, userDispatch] = useContext(UserContext);
  const [criteria, setCriteria] = useState(null);
  const [smDevice, setSmDevice] = useState(true);
  const crModal = useDisclosure();

  const handleResize = () => {
    if (window.innerWidth >= 766) setSmDevice(false);
    else setSmDevice(true);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/u/criteria/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + userState.userInfo.token,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setCriteria(JSON.parse(res.criteria));
        }
      })
      .catch(console.log);
  }, []);

  const CriteriaBoxes = () => {
    return (
      <>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          transform="skew(315deg)"
          width={smDevice ? "unset" : "18%"}
          color="whitesmoke"
          bgColor={criteria && criteria[1] ? "rgb(69, 39, 160)" : "black"}
          p={smDevice ? 3 : "unset"}
        >
          <Text transform="skew(-315deg)">Day 1</Text>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          transform="skew(315deg)"
          width={smDevice ? "unset" : "18%"}
          color="whitesmoke"
          bgColor={criteria && criteria[2] ? "rgb(69, 39, 160)" : "black"}
          p={smDevice ? 3 : "unset"}
        >
          <Text transform="skew(-315deg)">Day 2</Text>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          transform="skew(315deg)"
          width={smDevice ? "unset" : "18%"}
          color="whitesmoke"
          bgColor={criteria && criteria[3] ? "rgb(69, 39, 160)" : "black"}
          p={smDevice ? 3 : "unset"}
        >
          <Text transform="skew(-315deg)">Day 3</Text>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          transform="skew(315deg)"
          width={smDevice ? "unset" : "18%"}
          color="whitesmoke"
          bgColor={criteria && criteria.S >= 1 ? "rgb(69, 39, 160)" : "black"}
          p={smDevice ? 3 : "unset"}
        >
          <Text transform="skew(-315deg)">
            Sports ({criteria ? criteria.S : 0}/1){" "}
          </Text>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          transform="skew(315deg)"
          width={smDevice ? "unset" : "18%"}
          color="whitesmoke"
          bgColor={criteria && criteria.C >= 2 ? "rgb(69, 39, 160)" : "black"}
          p={smDevice ? 3 : "unset"}
        >
          <Text transform="skew(-315deg)">
            Cultural ({criteria ? criteria.C : 0}/2)
          </Text>
        </Box>
      </>
    );
  };

  const CriteriaModal = () => {
    return (
      <Modal isOpen={crModal.isOpen} onClose={crModal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="whitesmoke" bgColor="black">
            Critera{" "}
          </ModalHeader>
          <ModalCloseButton color="whitesmoke" />
          <ModalBody
            pt={20}
            pb={5}
            px={5}
            color="whitesmoke"
            bg="linear-gradient(147deg, rgb(69, 39, 160) 0%, #000000 74%)"
          >
            <Box flexDir="column" gridGap={5} display="flex" w="90%" mx="auto">
              <CriteriaBoxes />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <Box
      // bg="linear-gradient(147deg, rgb(69, 39, 160) 0%, #000000 74%)"
      bgColor="black"
      h="30px"
      width="100%"
      position="sticky"
      top="0"
      left="0"
      display="flex"
      opacity="0.7"
      overflow="hidden"
      zIndex="3"
    >
      <CriteriaModal />
      {!smDevice ? (
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            transform="skew(315deg)"
            width="10%"
            color="whitesmoke"
            bgColor={"black"}
          >
            <Text transform="skew(-315deg)">Criteria</Text>
          </Box>
          <CriteriaBoxes />
        </>
      ) : (
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mx="auto"
            w="90%"
            color="white"
          >
            <Text>See Criteria </Text>
            {/* <IconButton as={InfoIcon} onClick={crModal.onOpen} /> */}
            <InfoIcon onClick={crModal.onOpen} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default CriteriaStrip;
