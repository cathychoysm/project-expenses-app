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
  transactionDatesGroupsObject,
} from "../react-app-env";

export default function TimelineItemList({ type }: Type) {
  const { expenses, incomes } = useTransactions();

  const transactions = type === "expenses" ? expenses : incomes;

  const transactionDatesMap = new Map();
  for (var i = 0; i < transactions.length; i++) {
    const itemsArray = transactionDatesMap.get(transactions[i].date);
    if (!transactionDatesMap.has(transactions[i].date)) {
      transactionDatesMap.set(transactions[i].date, [transactions[i]]);
    } else {
      itemsArray.push(transactions[i]);
      transactionDatesMap.set(transactions[i].date, itemsArray);
    }
  }

  const transactionDatesGrouped = Array.from(transactionDatesMap)
    .map(([date, items]) => ({ date, items }))
    .sort((a: transactionDatesGroupsObject, b: transactionDatesGroupsObject) =>
      b.date.localeCompare(a.date)
    );

  return (
    <VStack
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

      {transactionDatesGrouped.map((dateGroup) => {
        return (
          <VStack width="full" key={dateGroup.date}>
            <Heading
              as="h3"
              size={{ base: "sm", md: "md" }}
              alignSelf="flex-start"
            >
              {dateGroup.date}
            </Heading>
            {dateGroup.items.map((item: Transactions) => {
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
                          {item.category}
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
                      <RemoveTransaction type={type} id={item.id} />
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
