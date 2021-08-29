import {
  Flex,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Button,
  Text,
  ButtonGroup,
  Icon,
} from "@chakra-ui/react";

const AlertDialogBox = ({
  open,
  setOpen,
  content,
  onClose,
  closeBtn,
  submitText,
}) => {
  return (
    <AlertDialog isOpen={open} size="sm">
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogBody mt={2} fontWeight="600">
            <Flex direction="column-reverse" align="center">
              <Flex flexGrow={1} textAlign="center" direction="column" align="center">
                  {content.map((_content) => (
                    <Text>{_content}</Text>
                  ))}
              </Flex>
            </Flex>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Flex direction="row" justifyContent="center" align="center">
              <Button
                colorScheme="purple"
                onClick={() => {
                  setOpen(false);
                  if (onClose) onClose();
                }}
                mr={2}
              >
                {submitText || "Close"}
              </Button>
              {closeBtn && (
                <Button
                  onClick={() => setOpen(false)}
                  ml={2}
                >
                  Close
                </Button>
              )}
            </Flex>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default AlertDialogBox;