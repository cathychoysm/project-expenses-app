import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import useTransactions from "../contexts/TransactionsContext";
import RemoveTransaction from "./RemoveTransaction";
import {
  Transactions,
  Type,
  transactionCategorieGroupsObject,
} from "../react-app-env";
import EditTransactionsModal from "./EditTransactionsModal";

export default function CategoryItemList({ type }: Type) {
  const { expenses, incomes } = useTransactions();

  const transactions = type === "expenses" ? expenses : incomes;

  const transactionCategoryMap = new Map();
  for (var i = 0; i < transactions.length; i++) {
    const itemsArray = transactionCategoryMap.get(transactions[i].category);
    if (!transactionCategoryMap.has(transactions[i].category)) {
      transactionCategoryMap.set(transactions[i].category, [transactions[i]]);
    } else {
      itemsArray.push(transactions[i]);
      transactionCategoryMap.set(transactions[i].category, itemsArray);
    }
  }

  const transactionCategoriesGrouped = Array.from(transactionCategoryMap)
    .map(([category, items]) => ({ category, items }))
    .sort(
      (
        a: transactionCategorieGroupsObject,
        b: transactionCategorieGroupsObject
      ) => a.category.localeCompare(b.category)
    );

  transactionCategoriesGrouped.forEach((category) => {
    category.items.sort((a: Transactions, b: Transactions) =>
      b.date.localeCompare(a.date)
    );
  });

  return (
    <VStack
      width="full"
      bg="yellow.200"
      padding={{ base: "15px", md: "30px" }}
      borderRadius={10}
      gap={10}
      height={680}
      overflowY="scroll"
    >
      {!transactions[0] && (
        <Text>
          Add a new {type === "expenses" ? "expense" : "income"} to start!
        </Text>
      )}

      {transactionCategoriesGrouped.map((categoryGroup) => {
        return (
          <VStack width="full" key={categoryGroup.category}>
            <Heading
              as="h3"
              size={{ base: "sm", md: "md" }}
              alignSelf="flex-start"
            >
              {categoryGroup.category}
            </Heading>
            {categoryGroup.items.map((item: Transactions) => {
              return (
                <Card key={item.id} width="full" padding={2}>
                  <HStack justifyItems="flex-start">
                    <CardHeader
                      width={{ base: "130px", md: "200px" }}
                      padding={{ base: "5px", md: "20px" }}
                      overflow="hidden"
                    >
                      <VStack gap={3} alignItems="flex-start">
                        <Heading size={{ base: "xs", md: "sm" }}>
                          {item.date}
                        </Heading>
                        <Text fontSize="sm">{item.description}</Text>
                      </VStack>
                    </CardHeader>
                    <CardBody padding={{ base: 2, md: 5 }}>
                      <Text
                        fontSize={{ base: "md", md: "lg" }}
                        textAlign="left"
                      >
                        ${item.amount.toFixed(2)}
                      </Text>
                    </CardBody>
                    <CardFooter padding={{ base: 2, md: 5 }}>
                      <HStack gap={1}>
                        <EditTransactionsModal type={type} id={item.id} />
                        <RemoveTransaction type={type} id={item.id} />
                      </HStack>
                    </CardFooter>
                  </HStack>
                </Card>
              );
            })}
          </VStack>
        );
      })}
    </VStack>
  );
}
