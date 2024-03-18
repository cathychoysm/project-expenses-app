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
import { RemoveTransactionProps } from "../react-app-env";

export default function RemoveTransaction({
  type,
  id,
}: RemoveTransactionProps) {
  const { removeExpenses, removeIncomes } = useTransactions();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const header = type === "expenses" ? "Expense" : "Income";

  function removeTransactions() {
    type === "expenses" ? removeExpenses(id) : removeIncomes(id);
    onClose();
  }

  return (
    <>
      <Button onClick={onOpen} size={{ base: "sm", md: "md" }}>
        Remove
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
            <Button onClick={removeTransactions} colorScheme="red" ml={3}>
              Remove
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
