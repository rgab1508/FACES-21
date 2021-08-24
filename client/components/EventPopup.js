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
      <ModalContent bg="linear-gradient(147deg, rgb(17,82,45,0.9) 0%, rgb(0,0,0,0.9) 74%)">
        <ModalHeader>
          <Text color="white">Event</Text>
        </ModalHeader>
        <ModalCloseButton
          bg="white"
          color="green.300"
          _focus={{ outline: "none!important" }}
        />
        <ModalBody></ModalBody>
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
