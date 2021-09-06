import Head from "next/head";
import {
  Box,
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  Button,
  Flex,
  Center,
  FormControl,
  FormLabel,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Avatar,
  AvatarBadge,
  Alert,
  AlertIcon,
  AlertTitle,
  Badge,
  Text,
  useRadio,
  useRadioGroup,
  useToast,
  createIcon,
  Icon,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import Layout from "../components/Layout";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/router";
import { API_BASE_URL } from "../config";
import VideoBackground from "../components/VideoBackground";
import { firebase } from "@firebase/app";
import * as cookie from "cookie";
import "@firebase/auth";

const ShuffleIcon = createIcon({
  displayName: "Shuffle",
  viewBox: "0 0 460.303 460.303",
  path: (
    <>
      <path
        fill="white"
        d="M175.008,244.596c-10.181,15.488-20.962,30.534-33.825,44.067c-30.305,31.879-69.853,40.344-112.522,38.176
			c-38.309-1.95-38.121,57.473,0,59.412c80.166,4.072,136.831-30.564,181.944-89.529c-7.429-9.684-14.294-19.438-20.576-28.838
			C184.859,260.16,179.857,252.264,175.008,244.596z"
      />
      <path
        fill="white"
        d="M252.401,197.317c4.118,6.475,8.186,12.842,12.289,19.083c7.521-10.384,15.544-20.408,24.572-29.729
			c22.79-23.524,48.754-33.19,77.262-35.925c-1.809,2.179-3.565,4.398-5.388,6.566c-10.415,12.377-12.172,29.833,0,42.01
			c10.709,10.712,31.574,12.403,42.01,0c16.071-19.093,31.423-38.791,47.494-57.884c10.466-10.519,14.473-28.013,1.519-42.046
			l-53.466-57.927c-26.035-28.203-67.943,13.909-42.011,42.01l6.941,7.519c-29.162,2.087-57.243,9.506-83.172,26.359
			c-19.372,12.594-35.662,28.779-50.195,46.512c2.919,4.093,5.834,8.252,8.703,12.594
			C243.546,183.401,248.045,190.478,252.401,197.317z"
      />
      <path
        fill="white"
        d="M403.151,260.978c-5.032-5.972-12.477-8.678-20.048-8.678c-8.135,0-16.417,3.133-21.962,8.678
			c-12.172,12.182-10.415,29.635,0,42.01c1.823,2.169,3.58,4.393,5.388,6.571c-28.508-2.731-54.477-12.405-77.262-35.927
			c-12.964-13.381-23.901-28.178-34.17-43.478c-9.952-14.825-19.266-30.128-29.147-45.095c-1.889-2.859-3.829-5.604-5.758-8.371
			c-44.32-63.579-99.747-102.961-178.907-102.961c-4.138,0-8.348,0.109-12.619,0.322c-37.501,1.906-38.288,59.455-1.823,59.455
			c0.6,0,1.204-0.018,1.823-0.048c4.118-0.208,8.196-0.317,12.248-0.317c37.958,0,72.889,9.693,100.27,38.501
			c16.834,17.715,30.118,38.006,43.127,58.514c6.17,9.725,12.284,19.489,18.687,29.066c5.504,8.236,11.212,16.417,17.179,24.395
			c17.012,22.729,36.308,43.757,60.271,59.336c25.929,16.854,54.01,24.272,83.172,26.354l-6.941,7.521
			c-19.891,21.552,0.117,51.339,22.272,51.339c6.733,0,13.67-2.758,19.738-9.328l53.471-57.925
			c12.954-14.035,8.947-31.529-1.519-42.046C434.574,299.763,419.224,280.076,403.151,260.978z"
      />
    </>
  ),
});

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" m={1}>
      <input {...input} disabled />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "linear-gradient(147deg, #000000 0%,rgb(69, 39, 160) 74%)",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          outline: "none!important",
        }}
        px={3}
        py={2}
        display="flex"
        flexGrow={1}
        fontWeight="bold"
        isReadOnly
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default function Login(props) {
  var [loading, setLoading] = useState(false);
  const toast = useToast();
  const [userState, userDispatch] = useContext(UserContext);
  const [phone, setPhone] = useState("");
  const [myEvents, setMyEvents] = useState([]);
  const [OTP, setOTP] = useState("");
  const [OTPSent, setOTPSent] = useState(false);
  const [phoneSet, setPhoneSet] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [profile, setProfile] = useState({});
  const router = useRouter();

  const departments = ["COMP", "IT", "EXTC", "MECH", "ELEC", "OTHER"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "department",
    value: profile.department,
  });

  const group = getRootProps();

  if (!firebase.apps.length) {
    firebase.initializeApp(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE));
  } else {
    firebase.app();
  }

  function login() {
    var recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: () => setOTPSent(true),
      }
    );
    firebase
      .auth()
      .signInWithPhoneNumber(phone, recaptchaVerifier)
      .then((_verify) => (window.verify = _verify))
      .catch(console.log);
  }

  function verifyOTP() {
    window.verify
      .confirm(OTP)
      .then((stuff) => {
        console.log(stuff);
        setPhoneSet(true);
        toast({
          title: "Phone verification succesful",
          position: "top-right",
          duration: 3000,
          status: "success",
        });
        setEditPhone(false);
        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then(async (user) => {
            await axios({
              url: `${API_BASE_URL}/submit_phone`,
              method: "POST",
              data: { user, token: profile.token },
            });
          });
      })
      .catch((stuff) => {
        toast({
          title: "OTP Wrong, I guess",
          position: "top-right",
          duration: 3000,
          status: "error",
        });
      });
  }

  function randomAvatar() {
    var randomAvatar = `https://avatars.dicebear.com/api/human/${Math.random()
      .toString(36)
      .substr(2, 5)}.svg`;
    setProfile({ ...profile, avatar: randomAvatar });
  }

  async function updateProfile() {
    await axios({
      url: `${API_BASE_URL}/api/u/avatar/update/`,
      method: "POST",
      data: {
        avatar: profile.avatar,
      },
      headers: {
        Authorization: "Token " + userState.userInfo.token,
      },
    }).catch(console.log);
    await axios({
      url: `${API_BASE_URL}/api/u/update/`,
      method: "POST",
      data: {
        name: profile.name,
        department: profile.department,
        semester: profile.semester,
      },
      headers: {
        Authorization: "Token " + userState.userInfo.token,
      },
    })
      .then((res) => {
        userDispatch({
          type: "ADD_USER",
          payload: profile,
        });
      })
      .catch(console.log);
    toast({
      title: "Profile updated succesfully",
      position: "top-right",
      duration: 3000,
      status: "success",
    });
  }

  function handleChange(e) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    // if (!userState.userInfo) location.href = "/";
    // if (userState.userInfo && !userState.userInfo.email) location.href = "/";
    setProfile(userState.userInfo);
    setPhone(userState.userInfo.phone_no);
  }, [userState.userInfo]);

  return (
    <>
      <Head>
        <title>Edit Profile | FACES-21</title>
      </Head>
      <VideoBackground />
      <Layout notFixed>
        <Center minH="100vh" justifyContent="center" ml={2} mr={2}>
          <Flex
            direction="column"
            bgColor="transparent"
            backgroundImage="linear-gradient(147deg, rgb(69, 39, 160) 0%, #000000 74%)"
            borderRadius={10}
            position="relative"
            p={5}
            m={2}
            mb={6}
            color="white"
            zIndex={0}
          >
            <Tabs colorScheme="whiteAlpha" variant="soft-rounded" isFitted>
              <TabList>
                <Tab color="white">Profile</Tab>
                <Tab color="white">My Events</Tab>
              </TabList>
              <TabPanels transition="0.3s all">
                <TabPanel>
                  <Flex w="100%" justifyContent="center">
                    <Avatar
                      width="170px"
                      height="170px"
                      src={profile.avatar}
                      borderWidth="3px"
                      m={3}
                      cursor="pointer"
                      objectFit="cover"
                    >
                      <Flex justifyContent="center" alignItems="center">
                        <AvatarBadge
                          boxSize="50px"
                          borderWidth="0em"
                          bgColor="red.500"
                          cursor="pointer"
                        >
                          <Icon
                            as={ShuffleIcon}
                            boxSize="25px"
                            display="inline"
                            variant="red"
                            cursor="pointer"
                            onClick={randomAvatar}
                          />
                        </AvatarBadge>
                      </Flex>
                    </Avatar>
                  </Flex>
                  <Flex direction={{ base: "column", md: "row" }}>
                    <FormControl m={1}>
                      <FormLabel>Name</FormLabel>
                      <Input
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        variant="filled"
                        bg="#000000"
                      />
                    </FormControl>
                    <FormControl m={1}>
                      <FormLabel>Semester</FormLabel>
                      <InputGroup>
                        <Input
                          bg="black"
                          variant="filled"
                          value={profile.semester}
                          textAlign="center"
                          name="semester"
                          isReadOnly
                          _focus={{
                            bg: "transparent",
                            border: "1px solid white",
                          }}
                          _hover={{
                            bg: "transparent",
                            border: "1px solid white",
                          }}
                        />
                      </InputGroup>
                    </FormControl>
                  </Flex>
                  <FormControl m={1}>
                    <FormLabel>Department</FormLabel>
                    <Flex wrap="wrap" {...group}>
                      {departments.map((value) => {
                        const radio = getRadioProps({ value });
                        return (
                          <RadioCard key={value} {...radio}>
                            {value}
                          </RadioCard>
                        );
                      })}
                    </Flex>
                  </FormControl>
                  <FormControl m={1}>
                    <FormLabel>Phone</FormLabel>
                    <InputGroup>
                      <InputLeftElement background="transparent">
                        +91
                      </InputLeftElement>
                      <Input
                        name="phone"
                        defaultValue={phone && phone.substring(3)}
                        id="phone"
                        variant="filled"
                        color="white"
                        bg="black"
                        readOnly={!editPhone}
                        maxLength={10}
                        onChange={(e) => setPhone("+91" + e.target.value)}
                      />
                      <InputRightElement>
                        {editPhone || (
                          <EditIcon
                            onClick={() => setEditPhone(true)}
                            color="white"
                            display="inline"
                            cursor="pointer"
                          />
                        )}
                      </InputRightElement>
                    </InputGroup>
                    {editPhone && (
                      <Button
                        bg="linear-gradient(147deg, #000000 0%,rgb(17, 82, 45) 74%)"
                        onClick={login}
                        m={3}
                        color="white"
                      >
                        Verify OTP
                      </Button>
                    )}
                    <Flex
                      id="recaptcha-container"
                      pl={3}
                      display={OTPSent && "none"}
                    />
                  </FormControl>
                  {!phoneSet && OTPSent && (
                    <FormControl m={1}>
                      <FormLabel>OTP</FormLabel>
                      <Input
                        id="otp"
                        onChange={(e) => setOTP(e.target.value)}
                        variant="filled"
                        color="white"
                        bg="black"
                      />
                      <Button
                        bg="linear-gradient(147deg, #000000 0%,rgb(17, 82, 45) 74%)"
                        onClick={verifyOTP}
                        m={3}
                        color="white"
                      >
                        Submit OTP
                      </Button>
                    </FormControl>
                  )}
                  {JSON.stringify(userState.userInfo) !=
                    JSON.stringify(profile) && (
                    <Alert background="transparent">
                      <AlertIcon />
                      You have Unsaved Changes, please save them
                    </Alert>
                  )}
                  <Button
                    bg="linear-gradient(147deg, #000000 0%,rgb(17, 82, 45) 74%)"
                    onClick={updateProfile}
                    m={3}
                    color="white"
                  >
                    Save Profile
                  </Button>
                </TabPanel>
                <TabPanel>
                  <Flex flexDirection="column">
                    {props.profile.teams.map((item, key) => (
                      <Flex
                        borderRadius="10px"
                        minW={{ base: "80vw", md: "50vw" }}
                        bgColor="#923cb5"
                        backgroundImage="linear-gradient(147deg, rgb(69, 39, 160) 0%, #000000 74%)"
                        boxShadow="xl"
                        _hover={{ boxShadow: "2xl", transform: "scale(1.02)" }}
                        sx={{
                          transition: "transform 0.2s, box-shadow 0.25s",
                        }}
                        minH="23vh"
                        m={2}
                        cursor="pointer"
                        flexDirection={{ base: "column-reverse", md: "row" }}
                      >
                        <Flex
                          align={{ base: "center", md: "initial" }}
                          justify={{ base: "center", md: "initial" }}
                          flexDirection="column"
                          w={{ base: "100%", md: "50%" }}
                          p={{ base: "5px", md: "15px" }}
                          gridGap="1"
                        >
                          <Text
                            fontWeight="bold"
                            fontSize={{ base: "9pt", lg: "16pt" }}
                            color="white"
                          >
                            #{item.team_code.slice(-4)}
                          </Text>
                          <Text
                            fontWeight="bold"
                            fontSize={{ base: "12pt", lg: "20pt" }}
                            color="white"
                          >
                            {item.event.title}
                          </Text>
                          <Flex>
                            <Badge
                              bg={
                                item.event.category == "S"
                                  ? "blue.700"
                                  : "red.700"
                              }
                              color="white"
                              m={1}
                              fontSize={{ base: "9pt", md: "14pt" }}
                              borderRadius="5px"
                            >
                              {item.event.category == "S"
                                ? "Sports"
                                : "Cultural"}
                            </Badge>
                            <Badge
                              bg="blue.700"
                              color="white"
                              m={1}
                              fontSize={{ base: "9pt", md: "14pt" }}
                              borderRadius="5px"
                            >
                              Day {item.event.day}
                            </Badge>
                          </Flex>
                          <Flex>
                            <Badge
                              bg={item.is_paid ? "green.500" : "red.700"}
                              m={1}
                              color="white"
                              fontSize={{ base: "9pt", md: "14pt" }}
                              borderRadius="5px"
                            >
                              {item.is_paid ? "PAID" : "NOT PAID"}
                            </Badge>
                            <Badge
                              bg={item.is_verified ? "green.500" : "red.700"}
                              m={1}
                              color="white"
                              fontSize={{ base: "9pt", md: "14pt" }}
                              borderRadius="5px"
                            >
                              {item.is_verified ? "VERIFIED" : "NOT VERIFIED"}
                            </Badge>
                          </Flex>
                          {item.members.length > 0 && (
                            <Text
                              fontSize={{ base: "12pt", lg: "14pt" }}
                              color="white"
                            >
                              <Text fontSize="16pt" fontWeight="bolder">
                                Members
                              </Text>
                              <Text pl={6}>
                                <ul>
                                  {item.members.map((item) => (
                                    <li>{item}</li>
                                  ))}
                                </ul>
                              </Text>
                            </Text>
                          )}
                        </Flex>
                        <Box
                          overflow="hidden"
                          w={{ base: "100%", md: "50%" }}
                          h={{ base: "15vh", md: "auto" }}
                          borderRadius="10px"
                        >
                          <Flex
                            background={`url(${API_BASE_URL}${item.event.image})`}
                            backgroundSize="cover"
                            backgroundPosition="center"
                            backgroundRepeat="no-repeat"
                            w="100%"
                            h="100%"
                            transition="0.2s all"
                            _hover={{ transform: "scale(1.1)" }}
                          >
                            <Box
                              h="100%"
                              w="100%"
                              bg="rgb(0,0,0,0.4)"
                              borderRadius="10px"
                            />
                          </Flex>
                        </Box>
                      </Flex>
                    ))}
                  </Flex>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Center>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  var token = cookie.parse(req.headers.cookie || "")["token"];
  if (!token) {
    res.writeHead(302, { Location: "/" });
    res.end();
    return { props: {} };
  }
  try {
    var profile = await axios({
      url: `${API_BASE_URL}/api/u/me/`,
      headers: {
        Authorization: "Token " + token,
      },
    });
    console.log(profile.data.user);
    return {
      props: {
        profile: profile.data.user,
      },
    };
  } catch (e) {
    res.writeHead(302, { Location: "/" });
    res.end();
    return { props: {} };
  }
}
