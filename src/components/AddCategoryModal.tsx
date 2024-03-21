import {
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import useTransactions from "../contexts/TransactionsContext";
import { useState } from "react";
import { AddCategoryModalProps } from "../react-app-env";

export default function AddCategoryModal({
  type,
  isOpen,
  onClose,
  setValue,
}: AddCategoryModalProps) {
  const { addTransactionsCategories } = useTransactions();

  const [newCat, setNewCat] = useState<string>("");
  function onClick() {
    addTransactionsCategories(type, newCat);
    onClose();
    setNewCat("");
    setValue("category", newCat);
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody paddingBottom={5}>
          <HStack gap={5}>
            <Input
              value={newCat}
              onChange={(e) => {
                setNewCat(e.target.value);
              }}
            />
            <Button onClick={onClick}>Add</Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
