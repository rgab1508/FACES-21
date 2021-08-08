import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Box,
  Flex,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

export default function EventPopup(props) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size={"5xl"}>
      <ModalOverlay />
      <ModalContent bg="green.300">
        <ModalHeader>
          <Text color="white">Event</Text>
        </ModalHeader>
        <ModalCloseButton
          bg="white"
          color="green.300"
          _focus={{ outline: "none!important" }}
        />
        <ModalBody>
          <Text color="white" fontSize="17pt" fontWeight="bold">
            {props.event.title}
          </Text>
          <Text color="white" fontSize="17pt">
            {props.event.description}
          </Text>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button
              bg="green.400"
              color="white"
              fontWeight="bold"
              _focus={{ outline: "none!important" }}
              _hover={{ opacity: 0.8 }}
            >
              Register
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
