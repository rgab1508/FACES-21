import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
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
import React, { useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import { UserContext } from "../context/UserContext";
import Image from "next/image";
import CartEmptySvg from "../public/empty_cart.svg";

const Cart = ({ isOpen, onClose }) => {
  const [userState, userDispatch] = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [transactionId, setTransactionId] = useState("");
  const confirm = useDisclosure();
  const toast = useToast();

  const handleCheckout = () => {
    console.log("checkout");
    let data = {
      teams: [],
      transaction_id: transactionId,
    };
    userState.userInfo.teams
      .filter((t) => !t.is_paid)
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
        }
      })
      .catch((res) => {
        toast({
          title: res.detail,
          status: "error",
          position: "top-right",
          duration: 3000,
        });
      });
    confirm.onClose();
  };

  useEffect(() => {
    if (userState.isLoggedIn) {
      setCartItems(userState.userInfo.teams.filter((t) => !t.is_paid));
    }
  }, [userState]);

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

        <AlertDialogContent bgColor="black" color="white">
          <AlertDialogHeader>Proceed with Checkout?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Text>Please Confirm the Transaction ID is Correct</Text>
            <br />
            <Text color="red">
              *Your Participantion will only be Considered when the admin
              verifies the Transaction. (you can check in{" "}
              <Box as="span" textDecor="underline">
                <Link href={"/me"}>Profile</Link>{" "}
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
                        alignItems="center"
                        borderRadius="10px"
                      >
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
          {JSON.stringify(userState.userInfo) != "{}" &&
            userState.userInfo.teams.filter((t) => !t.is_paid).length > 0 && (
              <Box gridGap={4} w="100%" display="flex" flexDir="column">
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
                  <Button
                    onClick={() => {
                      // TODO: add more validation here
                      if (transactionId == "") {
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
