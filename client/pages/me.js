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
  const [avatar, setAvatar] = useState(null);
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
              url: "http://206.189.142.182/submit_phone",
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

  async function updateAvatar() {
    var formData = new FormData();
    formData.append("file", avatar);
    await axios
      .post("https://vgy.me/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(console.log)
      .catch(console.log);
  }

  async function updateProfile() {
    if (avatar) {
      await updateAvatar();
    }
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
        <Center w="100%" minH="100vh" justifyContent="center">
          <Flex
            direction="column"
            bgColor="transparent"
            backgroundImage="linear-gradient(147deg, rgb(69, 39, 160) 0%, #000000 74%)"
            borderRadius={10}
            position="relative"
            p={5}
            ml={2}
            mr={2}
            color="white"
            zIndex={0}
          >
            <Tabs colorScheme="whiteAlpha" variant="soft-rounded" isFitted>
              <TabList>
                <Tab color="white">Profile</Tab>
                <Tab color="white">My Events</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Flex w="100%" justifyContent="center">
                    <Avatar
                      width="170px"
                      height="170px"
                      src={
                        avatar ? URL.createObjectURL(avatar) : profile.avatar
                      }
                      borderWidth="3px"
                      m={3}
                      cursor="pointer"
                    >
                      <Flex justifyContent="center" alignItems="center">
                        <Input
                          variant="filled"
                          style={{ display: "none" }}
                          id="avatar-file-input"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setAvatar(e.target.files[0])}
                          name="avatar"
                          p="0"
                          m="0"
                        />
                        <label
                          htmlFor="avatar-file-input"
                          style={{
                            margin: 0,
                            padding: 0,
                            display: "inline",
                          }}
                        >
                          <AvatarBadge
                            boxSize="50px"
                            borderWidth="0em"
                            bgColor="red.500"
                            cursor="pointer"
                          >
                            <EditIcon
                              boxSize="25px"
                              display="inline"
                              variant="red"
                            />
                          </AvatarBadge>
                        </label>
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
                        _hover={{ boxShadow: "2xl", transform: "scale(1.1)" }}
                        sx={{
                          transition: "transform 0.2s, box-shadow 0.25s",
                        }}
                        minH="23vh"
                        mb={2}
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
                            fontSize={{ base: "12pt", lg: "20pt" }}
                            color="white"
                          >
                            {item.event.title}
                          </Text>
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
                              bg={item.is_paid ? "green.500" : "red.700"}
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
                              fontSize={{ base: "12pt", lg: "20pt" }}
                              color="white"
                            >
                              <ul>{item.members}</ul>
                            </Text>
                          )}
                        </Flex>
                        <Flex
                          w={{ base: "100%", md: "50%" }}
                          background={`url(${API_BASE_URL}${item.event.image})`}
                          backgroundSize="cover"
                          backgroundPosition="center"
                          backgroundRepeat="no-repeat"
                          borderRadius="10px"
                          h={{ base: "15vh", md: "auto" }}
                        >
                          <Box
                            h="100%"
                            w="100%"
                            bg="rgb(0,0,0,0.4)"
                            borderRadius="10px"
                          />
                        </Flex>
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
  var token = cookie.parse(req.headers.cookie)["token"];
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
