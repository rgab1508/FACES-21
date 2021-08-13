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
  Input,
} from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function EventPopup(props) {
  const [userState, userDispatch] = useContext(UserContext);

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
            <Text color="white" fontSize="26pt" fontWeight="bold">
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
          {props.event.team_size > 1 ? (
            <Flex mt={4} flexDirection="column" p="20px" gridGap="3">
              <Text color="white" fontSize="15pt" fontWeight="bold">
                Enter teammates info
              </Text>
              <Input
                variant="filled"
                placeholder="Enter team info"
                bg="white"
                _focus={{ color: "black", bg: "white" }}
              />
            </Flex>
          ) : (
            ""
          )}
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            {JSON.stringify(userState.userInfo) != "{}" ? (
              <Button
                bg="green.400"
                color="white"
                fontWeight="bold"
                _focus={{ outline: "none!important" }}
                _hover={{ opacity: 0.8 }}
              >
                Register
              </Button>
            ) : (
              <Text fontStyle="italic" color="white" fontSize="14pt">
                Login to register
              </Text>
            )}
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
