import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import useTransactions, { Transactions } from "../contexts/TransactionsContext";

interface Tab {
  tab: "expenses" | "incomes";
}

export default function TimelineItemList({ tab }: Tab) {
  const { expenses, removeExpenses, incomes, removeIncomes } =
    useTransactions();

  const transactions = tab === "expenses" ? expenses : incomes;
  const removeTransactions =
    tab === "expenses" ? removeExpenses : removeIncomes;

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

  interface transactionDatesGroupsObject {
    date: string;
    items: Array<Object>;
  }
  const transactionDatesGrouped = Array.from(transactionDatesMap)
    .map(([date, items]) => ({ date, items }))
    .sort((a: transactionDatesGroupsObject, b: transactionDatesGroupsObject) =>
      b.date.localeCompare(a.date)
    );

  return (
    <VStack
      width="full"
      bg="yellow.200"
      padding={30}
      borderRadius={10}
      gap={10}
    >
      {!transactions[0] && (
        <Text>
          Add a new {tab === "expenses" ? "expense" : "income"} to start!
        </Text>
      )}

      {transactionDatesGrouped.map((dateGroup) => {
        return (
          <VStack width="full" key={dateGroup.date}>
            <Heading as="h3" size="md" alignSelf="flex-start">
              {dateGroup.date}
            </Heading>
            {dateGroup.items.map((item: Transactions) => {
              return (
                <Card key={item.id} width="full" padding={2}>
                  <HStack justifyItems="flex-start">
                    <CardHeader width={200}>
                      <VStack gap={3} alignItems="flex-start">
                        <Heading size="sm" overflow="hidden">
                          {item.category}
                        </Heading>
                        <Text fontSize="sm" overflow="hidden">
                          {item.description}
                        </Text>
                      </VStack>
                    </CardHeader>
                    <CardBody>
                      <Text fontSize="lg" textAlign="left">
                        ${item.amount.toFixed(2)}
                      </Text>
                    </CardBody>
                    <CardFooter>
                      <Button onClick={() => removeTransactions(item.id)}>
                        Remove
                      </Button>
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
