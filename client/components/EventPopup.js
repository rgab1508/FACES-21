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
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export default function EventPopup(props) {
  const [userState, userDispatch] = useContext(UserContext);
  const [values, setValues] = useState({
    teamName: "Team 1",
    members: [1019121],
  });

  const toast = useToast();

  const handleChange = (e) => {
    setValues((prevValues) => {
      return {
        ...prevValues,
        [e.target.name]: [e.target.value],
      };
    });
  };

  const clearValues = () => setValues({ teamName: "", members: [] });

  const validateInput = () => {
    if (values.teamName == "") {
      toast({
        title: "Please Enter a valid Team Name",
        position: "top-right",
        duration: 3000,
        status: "error",
      });
      return false;
    }
    if (props.event.team_size > 1) {
      // TEAM Event
      if (
        props.event.is_team_size_strict &&
        values.members.length != props.event.team_size
      ) {
        toast({
          title: `This Event has a Strict Team Size of ${props.event.team_size}`,
          position: "top-right",
          duration: 3000,
          status: "error",
        });
        return false;
      }
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateInput()) return;

    const apiUrl = "https://faces21.herokuapp.com/api/e/register/";
    let data = {
      event_code: props.event.event_code,
      team_name: values.teamName,
      members: values.members, // Insert Array of Roll Nos,
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + userState.userInfo.token,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast({
            title: res.detail,
            duration: 3000,
            status: "success",
            position: "top-right",
          });
          clearValues();
        } else {
          console.log(res);
          toast({
            title: res.detail,
            duration: 3000,
            status: "error",
            position: "top-right",
          });
        }
      })
      .catch((e) => {
        console.log(e);
        toast({
          title: e.detail,
          position: "top-right",
          duration: 3000,
          status: "error",
        });
      });
  };

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
                value={values.teamName}
                name="teamName"
                onChange={handleChange}
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
                onClick={() => handleRegister(props.event)}
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
