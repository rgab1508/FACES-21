/** @format */

import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

const COVID = ({ isOpen, onOpen, onClose }) => {
  return (
    <Modal
      isCentered
      size={{ base: "md", md: "2xl" }}
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent
        backgroundImage="linear-gradient(147deg, rgb(69, 39, 160) 0%, #000000 74%)"
        color="white"
        m={2}
      >
        <ModalHeader>COVID Guidelines For offline events</ModalHeader>
        <ModalBody>
          <Flex pl={4}>
            <ReactMarkdown
              children={`
* It is mandatory for all participants to wear a mask.
* Minimum 1st dosage of vaccination is compulsary for everyone. Also, please carry your certificate for COVID-19 Vaccination along with your proof else else you won't be allowed entry.
* All participants in attendance must practice 2m (6 feet) physical distancing.
* Please carry a bottle of water, a bottle of Hand Sanitizer and a mask along with you.
* Please ensure that there is no mass gathering within college premises, If observed, the council will be compelled to dismiss the participants immediately.
* Participants are only allowed to be on college premises 15 minutes before the commencement of their respective events. They are supposed to leave as soon as their events are over unless told otherwise.
* Participants are required to carry their College ID Cards along with them for ID Verification.
`}
            />
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            bg="linear-gradient(147deg, #000000 0%,rgb(17, 82, 45) 74%)"
            _hover={{
              opacity: 0.8,
            }}
            _active={{
              opacity: 0.8,
            }}
            m={3}
            onClick={onClose}
            color="white"
          >
            ACCEPT
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default COVID;
