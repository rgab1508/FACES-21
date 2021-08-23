import { Box, Flex, Badge, Text, IconButton, Input } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { useState } from "react";

export default function EventCard({ event, readOnly, key }) {
  const MotionFlex = motion(Flex, { forwardMotionProps: true });
  const MotionBox = motion(Box, { forwardMotionProps: true });
  const [isOpen, setOpen] = useState(false);
  const [values, setValues] = useState({
    teamName: "",
    members: [],
  });
  const [member, setMember] = useState("");

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

  return (
    <MotionFlex
      layout
      key={key}
      w={{ base: "90%", lg: "60%" }}
      h="auto"
      flexDirection="column"
      //bg="rgb(17,82,45,0.8)"
      bgColor="rgb(0,0,0,0.6)"
      backgroundImage="linear-gradient(147deg, rgb(17,82,45,0.9) 0%, rgb(0,0,0,0.9) 74%)"
      borderRadius="10px"
      boxShadow="lg"
      _hover={{
        boxShadow: "2xl",
      }}
      onClick={() => setOpen(!isOpen)}
      transition="height 0.3s"
    >
      <MotionFlex
        layout
        sx={{
          transition: "all 0.3s",
        }}
        flexDirection="row"
      >
        <MotionBox layout p="15px" w="50%">
          {!isOpen && (
            <>
              <Text color="white" fontWeight="bold" fontSize="20pt">
                {event.title}
              </Text>

              <Text w="100%" noOfLines={2} color="white" fontSize="16pt">
                {event.description}
              </Text>

              <Text
                w="100%"
                noOfLines={2}
                color="white"
                fontWeight="bold"
                fontSize="16pt"
              >
                {event.start} - {event.end}
              </Text>
            </>
          )}
        </MotionBox>
        <MotionBox
          layout
          background={`url(https://faces21.herokuapp.com${event.image})`}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          borderRadius="10px"
          w="50%"
        >
          {!isOpen && (
            <MotionFlex
              layout
              p="10px"
              bg="rgb(69, 39, 160,0.4)"
              h="100%"
              w="100%"
              flexDirection="column"
              borderRadius="10px"
              gridGap="2"
            >
              <Badge
                ml="auto"
                bg="purple.700"
                color="white"
                fontSize="14pt"
                borderRadius="5px"
              >
                Day - {event.day}
              </Badge>
              <Badge
                ml="auto"
                bg={event.category == "S" ? "blue.700" : "red.700"}
                color="white"
                fontSize="14pt"
                borderRadius="5px"
              >
                {event.category == "S" ? "Sports" : "Cultural"}
              </Badge>
              {event.team_size > 1 ? (
                <Badge
                  ml="auto"
                  bg="yellow.500"
                  color="white"
                  fontSize="14pt"
                  borderRadius="5px"
                >
                  Group
                </Badge>
              ) : null}
            </MotionFlex>
          )}
        </MotionBox>
      </MotionFlex>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            layout
            bg="linear-gradient(147deg, rgb(17,82,45,0.9) 0%, rgb(0,0,0,0.9) 74%)"
            w="100%"
            style={{ padding: "15px" }}
            p="15px"
            borderRadius="10px"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 1 }}
          >
            <AnimateSharedLayout>
              <MotionFlex layout flexDirection="column">
                <Text color="white" fontSize="26pt" fontWeight="bold">
                  {event.title}
                </Text>
                <Text color="white" fontSize="17pt">
                  {event.description}
                </Text>
              </MotionFlex>
              <MotionFlex layout mt="5" gridGap="5">
                <Badge
                  bg="purple.700"
                  color="white"
                  fontSize="14pt"
                  borderRadius="5px"
                >
                  Day - {event.day}
                </Badge>
                <Badge
                  bg={event.category == "S" ? "blue.700" : "red.700"}
                  color="white"
                  fontSize="14pt"
                  borderRadius="5px"
                >
                  {event.category == "S" ? "Sports" : "Cultural"}
                </Badge>
                {event.team_size > 1 ? (
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
              </MotionFlex>
              {event.team_size > 1 ? (
                <MotionFlex layout flexDirection="column" gridGap="3">
                  <MotionFlex
                    layout
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
                    <MotionFlex layout gridGap="4">
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
                    </MotionFlex>
                  </MotionFlex>
                  <MotionFlex layout gridGap="2">
                    {values.members.map((val) => {
                      return (
                        <Flex p="15px" borderRadius="10px" bg="rgb(27, 94, 32)">
                          <Text color="white">{val}</Text>
                        </Flex>
                      );
                    })}
                  </MotionFlex>
                </MotionFlex>
              ) : (
                ""
              )}
            </AnimateSharedLayout>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionFlex>
  );
}
