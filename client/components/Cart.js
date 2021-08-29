import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Flex,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  Text,
  toast,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { UserContext } from "../context/UserContext";
import Image from "next/image";
import CartEmptySvg from "../public/empty_cart.svg";

const Cart = ({ isOpen, onClose }) => {
  const [userState, userDispatch] = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [transactionId, setTransactionId] = useState("");
  const confirm = useDisclosure();
  const toast = useToast();
  const payment = useDisclosure();
  const cancelRef = useRef();

  async function refreshCart() {
    try {
      const res = await axios({
        url: `${API_BASE_URL}/api/u/me/`,
        headers: {
          Authorization: "Token " + userState.userInfo.token,
        },
      });
      if (res.status == 200) {
        userDispatch({
          type: "ADD_USER",
          payload: { ...userState.userInfo, ...res.data.user },
        });
      } else {
        throw new Error("User Not Logged In");
      }
    } catch (error) {
      toast({
        title: `${error}`,
        status: "error",
        duration: 2000,
        position: "top-right",
      });
    }
  }

  useEffect(async () => {
    if (userState.isLoggedIn) {
      await refreshCart();
    }
  }, []);

  useEffect(() => {
    if (userState.isLoggedIn) {
      setCartItems(userState.userInfo.teams.filter((t) => t && !t.is_paid));
    }
  }, [userState]);

  useEffect(() => {
    let newTotalPrice = 0;
    cartItems.map((t) => {
      newTotalPrice += t.event.entry_fee;
    });
    setTotalPrice(newTotalPrice);
  }, [cartItems]);

  const handleCheckout = () => {
    let data = {
      teams: [],
      transaction_id: transactionId,
    };
    userState.userInfo.teams
      .filter((t) => t && !t.is_paid)
      .map((t) => data.teams.push(t.team_code));

    fetch(`${API_BASE_URL}/api/u/checkout/`, {
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
        console.log(res);
        if (res.success) {
          // update local teams array
          toast({
            title: res.detail,
            status: "success",
            position: "top-right",
            duration: 3000,
          });
          userDispatch({
            type: "ADD_USER",
            payload: {
              ...userState.userInfo,
              teams: userState.userInfo.teams.map((t) => {
                t.transaction_id = transactionId;
                t.is_paid = true;
                return t;
              }),
            },
          });
        } else {
          toast({
            title: res.detail,
            status: "error",
            position: "top-right",
            duration: 3000,
          });
        }
      })
      .catch((res) => {
        console.log(res);
        toast({
          title: res.detail,
          status: "error",
          position: "top-right",
          duration: 3000,
        });
      });
    confirm.onClose();
  };

  async function handleRemove(teamCode) {
    fetch(`${API_BASE_URL}/api/e/unregister/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + userState.userInfo.token,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        team_code: teamCode,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        userDispatch({
          type: "ADD_USER",
          payload: {
            ...userState.userInfo,
            teams: userState.userInfo.teams.filter(
              (t) => t.team_code != teamCode
            ),
          },
        });
      })
      .catch((e) => {
        toast({
          title: `${e.detail}`,
          status: "error",
          duration: 2000,
          position: "top-right",
        });
      });
  }

  const PaymentAlert = () => {
    return (
      <AlertDialog
        isOpen={payment.isOpen}
        onClose={payment.onClose}
        leastDestructiveRef={cancelRef}
        isCentered
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <AlertDialogOverlay />
        <AlertDialogContent
          margin="15px"
          bg="linear-gradient(147deg, rgb(69, 39, 160) 0%, #000000 74%)"
        >
          <AlertDialogHeader color="white" fontSize="2xl" fontWeight="bold">
            Account details
          </AlertDialogHeader>
          <AlertDialogBody color="white" gridGap="3">
            <Text fontSize="lg" fontWeight="bold">
              ACCEPTED PAYMENT METHODS: NEFT
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              A/c Name- Fr.C.Rodrigues Institute of Technology
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              BANK - INDIAN OVERSEAS BANK BRANCH- VASHI (0596)
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              A/C NO- 059601000007942
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              IFSC Code - IOBA0000596
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              bg="green.700"
              color="white"
              _hover={{ opacity: 0.7 }}
              onClick={payment.onClose}
            >
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  const ConfirmAlert = () => {
    return (
      <AlertDialog
        motionPreset="slideInBottom"
        onClose={confirm.onClose}
        isOpen={confirm.isOpen}
        isCentered
        closeOnOverlayClick={false}
      >
        <AlertDialogOverlay />

        <AlertDialogContent
          backgroundImage="linear-gradient(121deg, rgb(69, 39, 160) 0%, #000000 74%)"
          color="white"
        >
          <AlertDialogHeader>Proceed with Checkout?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Text>Please Confirm the Transaction ID is Correct</Text>
            <br />
            <Text color="red">
              *Your Participantion will only be Considered when the admin
              verifies the Transaction. (you can check in{" "}
              <Box as="span" textDecor="underline">
                <Link href={"/me"}>
                  <a target="_blank">Profile</a>
                </Link>{" "}
              </Box>
              for status)
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={confirm.onClose} colorScheme="red">
              No
            </Button>
            <Button onClick={handleCheckout} colorScheme="green" ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton color="white" />

        <DrawerBody
          bg="linear-gradient(147deg, rgb(69, 39, 160) 0%, #000000 74%)"
          color="whitesmoke"
          pt={12}
        >
          {userState.isLoggedIn ? (
            <>
              {cartItems.length == 0 ? (
                <Box display="flex" flexDir="column" w="100%" h="100%">
                  <Text>
                    Cart is Empty{" "}
                    <Box as="span" textDecor="underline">
                      <Link href={"/events"}>(Browse Events here)</Link>
                    </Box>
                  </Text>
                  <Box
                    flex="1"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="80%"
                    mx="auto"
                    mb="15%"
                  >
                    <Image src={CartEmptySvg} alt="Empty Cart" />
                  </Box>
                </Box>
              ) : (
                <>
                  {cartItems.map((t, tIdx) => {
                    // console.log(t);
                    return (
                      <Box
                        bgImage="linear-gradient(147deg, rgb(0,0,0,0.9) 0%, rgb(17,82,45,0.9) 74%)"
                        py={3}
                        key={t.team_code}
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                        borderRadius="10px"
                        mb={2}
                      >
                        <Box w="100%" px={5}>
                          <Text
                            textAlign="right"
                            color="white"
                            fontSize="lg"
                            fontWeight="bold"
                          >
                            #{t.team_code.slice(-4)}
                          </Text>
                        </Box>
                        <Flex align="flex-start">
                          <Box>
                            <Text px={5} fontSize="large" fontWeight="bold">
                              {tIdx + 1}.
                            </Text>
                          </Box>
                          <Box>
                            <Text noOfLines={2}>{t.event.title}</Text>
                            <Text>Day {t.event.day}</Text>
                            {!t.event.team_size > 1 && (
                              <Text>{t.members.join()}</Text>
                            )}
                            <Text>&#8377; {t.event.entry_fee}</Text>
                          </Box>
                        </Flex>
                        <Box w="100%" p="10px">
                          <Button
                            color="red"
                            isFullWidth
                            bg="linear-gradient(147deg, rgb(17,82,45)  0%, rgb(0,0,0,0.9) 74%)"
                            onClick={() => handleRemove(t.team_code)}
                            _hover={{ opacity: 0.7 }}
                          >
                            Remove
                          </Button>
                        </Box>
                      </Box>
                    );
                  })}
                </>
              )}
            </>
          ) : (
            <Text>
              Please Login to Register for Events
              <Box as="span" textDecor="underline">
                <Link href={"/login"}>(here)</Link>
              </Box>
            </Text>
          )}
        </DrawerBody>
        <DrawerFooter bgColor="black" color="whitesmoke">
          {userState.isLoggedIn &&
            userState.userInfo.teams.filter((t) => t && !t.is_paid).length >
              0 && (
              <Box gridGap={4} w="100%" display="flex" flexDir="column">
                <Box>
                  <Button
                    variant="ghost"
                    color="white"
                    isFullWidth
                    fontWeight="bold"
                    onClick={payment.onOpen}
                    _hover={{ opacity: 0.85 }}
                  >
                    View payment details
                  </Button>
                </Box>
                <Box>
                  <Text>Total : &#8377;{totalPrice}</Text>
                </Box>

                <Box>
                  <FormControl>
                    <FormLabel>Enter Transaction ID :</FormLabel>
                    <Input
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    variant="outline"
                    colorScheme="blue"
                    mr={3}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <ConfirmAlert />
                  <PaymentAlert />
                  <Button
                    onClick={() => {
                      if (transactionId.length < 5) {
                        toast({
                          title: "Please Enter a Valid Transaction ID",
                          status: "error",
                          position: "top-right",
                          duration: 3000,
                        });
                        return;
                      }
                      confirm.onOpen();
                    }}
                    colorScheme="green"
                  >
                    Checkout
                  </Button>
                </Box>
              </Box>
            )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Cart;
