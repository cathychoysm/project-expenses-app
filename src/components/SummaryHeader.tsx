import { HStack, Select, VStack } from "@chakra-ui/react";
import TotalsCard from "./TotalsCard";
import { ReactElement } from "react";
import AddTransactionsModal from "./AddTransactionsModal";
import useTransactions from "../contexts/TransactionsContext";

export default function SummaryHeader(): ReactElement {
  const { expenses, incomes } = useTransactions();

  let totalExpenses = 0;
  expenses.forEach((expense) => {
    totalExpenses += expense.amount;
  });
  let totalIncomes = 0;
  incomes.forEach((income) => {
    totalIncomes += income.amount;
  });

  return (
    <VStack
      justifyContent="space-evenly"
      bg="yellow.300"
      height={300}
      width="full"
      borderRadius={10}
    >
      <HStack justifyContent="center" gap="50px">
        <TotalsCard
          heading="Expenses"
          number={totalExpenses.toFixed(2)}
          color="red"
        />
        <TotalsCard
          heading="Income"
          number={totalIncomes.toFixed(2)}
          color="green"
        />
        <TotalsCard
          heading="Balance"
          number={(totalIncomes - totalExpenses).toFixed(2)}
          color="black"
        />
      </HStack>
      <HStack gap={10}>
        <AddTransactionsModal type="expenses" />
        <AddTransactionsModal type="incomes" />
      </HStack>
    </VStack>
  );
}
