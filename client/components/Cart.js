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
import React, { useState } from "react";

const Cart = ({ isOpen, onClose, loggedIn, userState }) => {
  const [transactionId, setTransactionId] = useState("");
  const confirm = useDisclosure();
  const toast = useToast();

  const handleCheckout = () => {
    console.log("checkout");
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
          pt={10}
        >
          {loggedIn ? (
            <>
              {userState.userInfo.teams.length == 0 && (
                <Text>
                  Cart is Empty{" "}
                  <Box as="span" textDecor="underline">
                    <Link href={"/events"}>(Browse Events here)</Link>
                  </Box>
                </Text>
              )}
              {userState.userInfo.teams
                .filter((t) => !t.is_paid)
                .map((t, tIdx) => {
                  // console.log(t);
                  return (
                    <Box
                      bgImage="linear-gradient(147deg, rgb(0,0,0,0.9) 0%, rgb(17,82,45,0.9) 74%)"
                      py={3}
                      key={t.team_code}
                      display="flex"
                      alignItems="center"
                    >
                      <Box>
                        <Text px={5} fontSize="large" fontWeight="bold">
                          {tIdx + 1}.
                        </Text>
                      </Box>
                      <Box>
                        <Text>{t.event.title}</Text>
                        <Text>Day {t.event.day}</Text>
                        <Text></Text>
                      </Box>
                    </Box>
                  );
                })}
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
          {loggedIn && userState.userInfo.teams.length > 0 && (
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
