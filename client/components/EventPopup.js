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
  Badge,
} from "@chakra-ui/react";

export default function EventPopup(props) {
  return (
    <Modal
      closeOnEsc={false}
      closeOnOverlayClick={false}
      isOpen={props.isOpen}
      onClose={props.onClose}
      size={"5xl"}
    >
      <ModalOverlay />
      <ModalContent bg="green.600">
        <ModalHeader>
          <Text color="white">Event</Text>
        </ModalHeader>
        <ModalCloseButton
          bg="white"
          color="green.300"
          _focus={{ outline: "none!important" }}
        />
        <ModalBody>
          <Flex flexDirection="column">
            <Text color="white" fontSize="17pt" fontWeight="bold">
              {props.event.title}
            </Text>
            <Text color="white" fontSize="17pt">
              {props.event.description}
            </Text>
          </Flex>
          <Flex mt="5" gridGap="5">
            <Badge
              bg="purple.700"
              color="white"
              fontSize="14pt"
              borderRadius="5px"
            >
              Day - {props.event.day}
            </Badge>
            <Badge
              bg={props.event.category == "S" ? "blue.700" : "red.700"}
              color="white"
              fontSize="14pt"
              borderRadius="5px"
            >
              {props.event.category == "S" ? "Sports" : "Cultural"}
            </Badge>
            {props.event.team_size > 1 ? (
              <Badge
                bg="yellow.500"
                color="white"
                fontSize="14pt"
                borderRadius="5px"
              >
                Group
              </Badge>
            ) : (
              ""
            )}
          </Flex>
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
