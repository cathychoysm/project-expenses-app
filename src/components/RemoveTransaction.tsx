import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import useTransactions from "../contexts/TransactionsContext";
import { EditRemoveTransactionProps } from "../react-app-env";
import { DeleteIcon } from "@chakra-ui/icons";

export default function RemoveTransaction({
  type,
  id,
}: EditRemoveTransactionProps) {
  const { removeTransactions } = useTransactions();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const header = type === "expenses" ? "Expense" : "Income";

  function removeOnClick() {
    removeTransactions(type, id);
    onClose();
  }

  return (
    <>
      <Button onClick={onOpen} size={{ base: "sm", md: "md" }}>
        <DeleteIcon />
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Remove {header}</AlertDialogHeader>
          <AlertDialogBody>
            Are you sure to remove this transaction?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={removeOnClick} colorScheme="red" ml={3}>
              Remove
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
