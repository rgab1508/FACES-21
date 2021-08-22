import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
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
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { API_BASE_URL } from "../config";

export default function EventPopup(props) {
  const [userState, userDispatch] = useContext(UserContext);
  const [values, setValues] = useState({
    teamName: "",
    members: [],
  });
  const [member, setMember] = useState("");

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
    if (props.event.team_size > 1 && values.teamName == "") {
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

  async function checkIfStudentExists(rollNo) {
    const response = await fetch(`${API_BASE_URL}/api/u/exists/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roll_no: rollNo }),
    });
    if (response.json().exists) {
      return true;
    } else {
      return false;
    }
  }

  function addTeamMembers(event) {
    if (!values.members.includes(member)) {
      values.members.push(member);
      setMember("");
    }
  }

  function removeTeamMembers(event) {
    values.members.pop();
    setValues({ ...values });
  }

  const handleRegister = async () => {
    if (!validateInput()) return;

    let data = {
      event_code: props.event.event_code,
      team_name: values.teamName,
      members: values.members, // Insert Array of Roll Nos,
    };

    fetch(`${API_BASE_URL}/api/e/register/`, {
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
          userDispatch({
            type: "ADD_USER",
            payload: {
              ...userState.userInfo,
              teams: [...userState.userInfo.teams, res.team],
            },
          });
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
      <ModalContent bg="rgb(46, 125, 50)">
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
            <Flex flexDirection="column" gridGap="3">
              <Flex
                bg="rgb(27, 94, 32)"
                borderRadius="10px"
                mt={4}
                flexDirection="column"
                p="20px"
                gridGap="3"
              >
                <Text color="white" fontSize="15pt" fontWeight="bold">
                  Enter teammates info
                </Text>
                <Input
                  variant="filled"
                  placeholder="Enter a team name"
                  bg="white"
                  _placeholder={{ fontSize: "14pt" }}
                  _focus={{ color: "black", bg: "white" }}
                  value={values.teamName}
                  name="teamName"
                  onChange={handleChange}
                />
                <Flex gridGap="4">
                  <Input
                    flex={3}
                    variant="filled"
                    placeholder="Enter team members (Roll no)"
                    _placeholder={{ fontSize: "14pt" }}
                    bg="white"
                    _focus={{ color: "black", bg: "white" }}
                    name="member"
                    value={member}
                    onChange={(event) => {
                      setMember(event.target.value);
                    }}
                  />
                  <IconButton
                    flex={1}
                    aria-label="Add team member"
                    icon={<AddIcon />}
                    bg="rgb(76, 175, 80)"
                    color="white"
                    _hover={{ bg: "rgb(129, 199, 132)" }}
                    onClick={addTeamMembers}
                  />
                  <IconButton
                    flex={1}
                    aria-label="Remove team member"
                    icon={<MinusIcon />}
                    bg="rgb(76, 175, 80)"
                    color="white"
                    _hover={{ bg: "rgb(129, 199, 132)" }}
                    onClick={removeTeamMembers}
                  />
                </Flex>
              </Flex>
              <Flex gridGap="2">
                {values.members.map((val) => {
                  return (
                    <Flex p="15px" borderRadius="10px" bg="rgb(27, 94, 32)">
                      <Text color="white">{val}</Text>
                    </Flex>
                  );
                })}
              </Flex>
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
