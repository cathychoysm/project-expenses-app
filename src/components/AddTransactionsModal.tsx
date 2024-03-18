import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import useTransactions from "../contexts/TransactionsContext";
import AddCategoryModal from "./AddCategoryModal";
import * as Yup from "yup";
import { Type } from "../react-app-env";

export default function AddTransactionsModal({ type }: Type) {
  const { addExpenses, addIncomes, expensesCategories, incomesCategories } =
    useTransactions();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenCat,
    onOpen: onOpenCat,
    onClose: onCloseCat,
  } = useDisclosure();

  const today = new Date();
  const formattedToday = today.toISOString().slice(0, 10);

  const categoriesAsc =
    type === "expenses" ? expensesCategories.sort() : incomesCategories.sort();

  const formik = useFormik({
    initialValues: {
      date: formattedToday,
      category: "",
      description: "",
      amount: 0,
    },
    validationSchema: Yup.object({
      date: Yup.string().required().notOneOf([""]),
      category: Yup.string().required().notOneOf([""]),
      description: Yup.string(),
      amount: Yup.number().required(),
    }),
    onSubmit: (values) => {
      onClose();
      type === "expenses"
        ? addExpenses({
            date: values.date,
            category: values.category,
            description: values.description,
            amount: values.amount,
          })
        : addIncomes({
            date: values.date,
            category: values.category,
            description: values.description,
            amount: values.amount,
          });
      formik.resetForm();
    },
  });

  return (
    <>
      <Button onClick={onOpen}>
        {type === "expenses" ? "+ Add Expense" : "+ Add Income"}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent paddingY={3}>
          <ModalHeader>
            {type === "expenses" ? "Add an Expense" : "Add an Income"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody paddingX={10}>
            <form onSubmit={formik.handleSubmit}>
              <VStack gap={5}>
                <FormControl>
                  <FormLabel htmlFor="date">Date</FormLabel>
                  <Input
                    type="date"
                    id="date"
                    name="date"
                    max={formattedToday}
                    onChange={formik.handleChange}
                    value={formik.values.date}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="category">Category</FormLabel>
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      {formik.values.category}
                    </MenuButton>
                    <MenuList>
                      {categoriesAsc.map((category: string) => {
                        return (
                          <MenuItem
                            key={category}
                            onClick={() =>
                              formik.setFieldValue("category", category)
                            }
                          >
                            {category}
                          </MenuItem>
                        );
                      })}
                      <MenuItem onClick={onOpenCat}>
                        + Add new category
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Input
                    type="text"
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="amount">Amount</FormLabel>
                  <InputGroup>
                    <InputLeftAddon>$</InputLeftAddon>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      onChange={formik.handleChange}
                      value={formik.values.amount}
                    />
                  </InputGroup>
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="teal"
                  isDisabled={!formik.dirty || !formik.isValid}
                >
                  Save
                </Button>
              </VStack>
            </form>
            <AddCategoryModal
              type={type}
              isOpen={isOpenCat}
              onClose={onCloseCat}
              setValue={formik.setFieldValue}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
