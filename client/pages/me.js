import Head from "next/head";
import {
  Heading,
  Text,
  Box,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Flex,
  Center,
  FormControl,
  FormLabel,
  Image,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import styles from "../components/Orenda.module.css";
import { useRouter } from "next/router";
import { API_BASE_URL } from "../config";
import VideoBackground from "../components/VideoBackground";

import { firebase } from "@firebase/app";
import "@firebase/auth";

export default function Login(props) {
  var [loading, setLoading] = useState(false);
  const toast = useToast();
  const [userState, userDispatch] = useContext(UserContext);
  const [phone, setPhone] = useState("");
  const [OTP, setOTP] = useState("");
  const [OTPSent, setOTPSent] = useState(false);
  const router = useRouter();
  var verify;

  if (!firebase.apps.length) {
    firebase.initializeApp(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE));
  } else {
    firebase.app();
  }

  var recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "normal",
      callback: () => setOTPSent(true),
    }
  );

  function login() {
    firebase
      .auth()
      .signInWithPhoneNumber(phone, recaptchaVerifier)
      .then((_verify) => (verify = _verify))
      .catch(console.log);
  }

  function verifyOTP() {
    verify.confirm(OTP).then(console.log).catch(console.log);
  }

  return (
    <>
      <Head>
        <title>Edit Profile | FACES-21</title>
        <script src="https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.9.1/firebase-auth.js"></script>
      </Head>
      <VideoBackground />
      <Navbar />
      <Flex h="100vh" justifyContent="center" align="center">
        <Flex bgColor="white" position="relative" p={5}>
          <Flex direction="column">
            <Image src="/profile.svg" maxW={{ base: "250px", md: "500px" }} />
          </Flex>
          <Flex direction="column">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input variant="filled" name="name" />
            </FormControl>
            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input
                variant="filled"
                name="phone"
                defaultValue={userState.userInfo.phone}
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
              />
              <Button onClick={login} m={3}>
                Verify OTP
              </Button>
              <Flex
                id="recaptcha-container"
                p={3}
                display={OTPSent && "none"}
              />
            </FormControl>
            {OTPSent && (
              <FormControl>
                <FormLabel>OTP</FormLabel>
                <Input
                  variant="filled"
                  id="otp"
                  onChange={(e) => setOTP(e.target.value)}
                />
                <Button onClick={verifyOTP} m={3}>
                  Submit OTP
                </Button>
              </FormControl>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
