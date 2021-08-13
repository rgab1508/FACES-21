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

export default function Login(props) {
    var [loading, setLoading] = useState(false);
    const toast = useToast();
    const [userState, userDispatch] = useContext(UserContext);
    const [OTPSent, setOTPSent] = useState(false);
    const router = useRouter();

    useEffect(() => {
        firebase.initializeApp(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE));
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "normal",
                callback: () => setOTPSent(true),
            }
        );
        window.login = () => {
            firebase
                .auth()
                .signInWithPhoneNumber(
                    window.document.querySelector("#phone").value,
                    window.recaptchaVerifier
                )
                .then((verify) => (window.verify = verify))
                .catch(console.log);
        };

        window.verifyOTP = () => {
            window.verify
                .confirm(window.document.querySelector("#otp").value)
                .then(console.log)
                .catch(console.log);
        };
    }, []);

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
                            />
                            <Button onClick={() => eval("login()")} m={3}>
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
                                <Input variant="filled" id="otp" />
                                <Button onClick={() => eval("verifyOTP()")} m={3}>
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
