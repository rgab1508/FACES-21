import {
  Box,
  Flex,
  Badge,
  Text,
  IconButton,
  Input,
  Collapse,
  Button,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, CheckIcon, MinusIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { API_BASE_URL } from "../config";
import AlertDialogBox from "./AlertDialogBox";
import ReactMarkdown from "react-markdown";

export default function EventCard({ event, readOnly }) {
  const [userState, userDispatch] = useContext(UserContext);
  const [isOpen, setOpen] = useState(false);
  const [values, setValues] = useState({
    teamName: "",
    members: [],
  });
  const [member, setMember] = useState("");
  const [isRegistered, setIsRegitered] = useState(false);
  const [names, setNames] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertContent, setAlertContent] = useState("");

  const toast = useToast();

  useEffect(() => {
    let newIsRegistered = false;
    if (userState.isLoggedIn) {
      userState.userInfo.teams.map((t) => {
        if (t.event.event_code == event.event_code) {
          newIsRegistered = true;
        }
      });
    }
    setIsRegitered(newIsRegistered);
  }, []);

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
    if (event.team_size > 1 && values.teamName == "") {
      toast({
        title: "Please Enter a valid Team Name",
        position: "top-right",
        duration: 3000,
        status: "error",
      });
      return false;
    }
    if (event.team_size > 1) {
      // TEAM Event
      if (
        event.is_team_size_strict &&
        values.members.length != event.team_size
      ) {
        toast({
          title: `This Event has a Strict Team Size of ${event.team_size}`,
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
    let res = await response.json();
    if (res.success) {
      setNames({ ...names, [rollNo]: res.name });
      return res.exists;
    } else return false;
  }

  const handleRegister = async () => {
    if (!validateInput()) return;

    let data = {
      event_code: event.event_code,
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

  async function addTeamMembers(event) {
    let roll_no = Number.parseInt(member);
    if (Number.isNaN(roll_no)) {
      toast({
        title: "Please Enter a Valid Roll No.",
        status: "error",
        position: "top-right",
        duration: 2000,
      });
      return;
    }
    if (roll_no <= 99999 || roll_no >= 9999999) {
      toast({
        title: "Please Enter a Valid Roll No.",
        status: "error",
        position: "top-right",
        duration: 2000,
      });
      return;
    }
    if (values.members.includes(roll_no)) {
      toast({
        title: "Student Already Added!",
        status: "info",
        position: "top-right",
        duration: 2000,
      });
      return;
    }
    if (!(await checkIfStudentExists(roll_no))) {
      toast({
        title: "Roll No. Doesn't Exist!",
        status: "error",
        position: "top-right",
        duration: 2000,
      });
      return;
    }
    values.members.push(roll_no);
    setMember("");
  }

  function removeTeamMembers(event) {
    values.members.pop();
    setValues({ ...values });
  }

  return (
    <Flex
      w={["90%", "90%", "75%", "60%"]}
      h="auto"
      flexDirection="column"
      bgColor="rgb(0,0,0,0.6)"
      backgroundImage="linear-gradient(147deg, rgb(17,82,45,0.9) 0%, rgb(0,0,0,0.9) 74%)"
      borderRadius="10px"
      boxShadow="lg"
      _hover={{
        boxShadow: "2xl",
      }}
      cursor="pointer"
      sx={{ transition: "box-shadow 0.2s ease-in-out, height 1s" }}
    >
      {alertContent && (
        <AlertDialogBox
          content={alertContent}
          open={alertOpen}
          setOpen={setAlertOpen}
          closeBtn={true}
          submitText="Confirm"
          onClose={handleRegister}
        />
      )}
      <Flex
        flexDirection={{ base: "column-reverse", md: "row" }}
        minH={{ md: "170px" }}
        onClick={() => setOpen(!isOpen)}
      >
        <Box
          sx={{ transition: "all 0.5s" }}
          p="15px"
          w={{ base: "100%", md: "50%" }}
        >
          <Text
            color="white"
            fontWeight="bold"
            fontSize={{
              base: isOpen ? "13pt" : "11pt",
              md: isOpen ? "25pt" : "20pt",
            }}
          >
            {event.title}
          </Text>
          {!isOpen && (
            <Flex w={{ md: "100%" }} overflow="hidden">
              <Text
                sx={{ transition: "font-size 0.3s" }}
                noOfLines={{ base: 2, md: 2 }}
                color="white"
                fontSize={{ base: "9pt", md: "16pt" }}
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                fontStyle="italic"
              >
                Click here to learn more
              </Text>
            </Flex>
          )}
          <Text
            mt={3}
            w="100%"
            noOfLines={2}
            color="white"
            fontWeight="bold"
            fontSize={{ base: "9pt", md: "16pt" }}
          >
            {event.start} - {event.end}
          </Text>
        </Box>
        <Box
          overflow="hidden"
          borderRadius="10px"
          position="relative"
          w={{ base: "100%", md: "50%" }}
          h={{ base: "15vh", md: "auto" }}
        >
          <Flex
            p="10px"
            flexDirection="column"
            borderRadius="10px"
            gridGap="2"
            position="absolute"
            right={0}
            zIndex={1}
          >
            <Badge
              ml="auto"
              bg="purple.900"
              color="white"
              fontSize={{ base: "10pt", md: "14pt" }}
              borderRadius="5px"
            >
              Day - {event.day}
            </Badge>
            <Badge
              ml="auto"
              bg={event.category == "S" ? "blue.700" : "red.700"}
              color="white"
              fontSize={{ base: "10pt", md: "14pt" }}
              borderRadius="5px"
            >
              {event.category == "S" ? "E-sports" : "Cultural"}
            </Badge>
            {event.team_size > 1 ? (
              <Badge
                ml="auto"
                bg="yellow.500"
                color="white"
                fontSize={{ base: "10pt", md: "14pt" }}
                borderRadius="5px"
              >
                Group
              </Badge>
            ) : null}
          </Flex>
          <Box
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundImage={`url(${API_BASE_URL}${event.image})`}
            borderRadius="10px"
            w="100%"
            h="100%"
            transition="0.2s all"
            _hover={{ transform: "scale(1.1)" }}
          ></Box>
        </Box>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Flex
          flexDirection="column"
          bg="linear-gradient(147deg, rgb(17,82,45,0.9) 0%, rgb(0,0,0,0.9) 74%)"
          w="100%"
          p="15px"
          borderRadius="10px"
          gridGap="3"
        >
          <Flex
            color="white"
            className="listMarginLeft"
            fontSize={{ base: "12pt", md: "17pt" }}
            flexDirection="column"
          >
            <ReactMarkdown children={event.description} />
          </Flex>
          <Flex p="15px" gridGap="5" flexDir="column">
            {event.team_size > 1 && (
              <Text
                color="white"
                fontWeight="bold"
                fontSize={{ base: "12pt", md: "17pt" }}
              >
                Team size : {event.team_size}{" "}
                {event.is_team_size_strict ? "(Strict)" : "(Not Strict)"}
              </Text>
            )}
            {/* <Text
              fontSize={{ base: "12pt", md: "17pt" }}
              color={event.max_seats - event.seats < 10 ? "red" : "white"}
              fontWeight="bold"
            >
              Seats booked: {event.seats} / {event.max_seats}
            </Text> */}
            <Text
              fontSize={{ base: "12pt", md: "18pt" }}
              color="white"
              fontWeight="bold"
            >
              Event price:{" "}
              {event.entry_fee != 0 ? `${event.entry_fee} Rs` : "Free"}
            </Text>
          </Flex>
          {JSON.stringify(userState.userInfo) != "{}" &&
            event.team_size > 1 &&
            !isRegistered && (
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
                    Enter team mate information{" "}
                    <span style={{ color: "red" }}>
                      Enter your own ROLL NO as well !!
                    </span>
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
                <Flex gridGap="2" wrap="wrap">
                  {values.members.map((val) => {
                    return (
                      <Flex p="15px" borderRadius="10px" bg="rgb(27, 94, 32)">
                        <Text color="white">{names[val] || val}</Text>
                      </Flex>
                    );
                  })}
                </Flex>
              </Flex>
            )}
          <Flex justifyContent="flex-end">
            {JSON.stringify(userState.userInfo) != "{}" ? (
              isRegistered ? (
                <Box
                  display="flex"
                  p={2}
                  // color="whitesmoke"
                  gridGap={2}
                  alignItems="center"
                  bgColor="green.200"
                  borderRadius="md"
                >
                  <Text>Registered</Text>
                  <CheckIcon color="green" />
                </Box>
              ) : (
                <Button
                  bg="green.400"
                  color="white"
                  fontWeight="bold"
                  _focus={{ outline: "none!important" }}
                  _hover={{ opacity: 0.8 }}
                  onClick={() => {
                    setAlertContent([
                      "Are you Sure you would like to register for this event? It can only be undone with admin intervention",
                    ]);
                    setAlertOpen(true);
                  }}
                >
                  Register
                </Button>
              )
            ) : (
              <Text fontStyle="italic" mr={5} color="white" fontSize="large">
                Login to register
              </Text>
            )}
          </Flex>
        </Flex>
      </Collapse>
    </Flex>
  );
}
