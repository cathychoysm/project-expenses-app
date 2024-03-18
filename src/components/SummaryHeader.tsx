import { Stack } from "@chakra-ui/react";
import TotalsCard from "./TotalsCard";
import AddTransactionsModal from "./AddTransactionsModal";
import useTransactions from "../contexts/TransactionsContext";

export default function SummaryHeader() {
  const { expensesTotal, incomesTotal } = useTransactions();

  return (
    <Stack
      direction={{ base: "row", md: "column" }}
      padding={{ base: 2, md: 8 }}
      justifyContent="space-evenly"
      alignItems="center"
      bg="yellow.300"
      height={300}
      width="full"
      borderRadius={10}
    >
      <Stack
        direction={{ base: "column", md: "row" }}
        justifyContent="center"
        gap={{ base: "20px", md: "50px" }}
      >
        <TotalsCard
          heading="Expenses"
          number={expensesTotal.toFixed(2)}
          color="red"
        />
        <TotalsCard
          heading="Income"
          number={incomesTotal.toFixed(2)}
          color="green"
        />
        <TotalsCard
          heading="Balance"
          number={(incomesTotal - expensesTotal).toFixed(2)}
          color="black"
        />
      </Stack>
      <Stack direction={{ base: "column", md: "row" }} gap={10}>
        <AddTransactionsModal type="expenses" />
        <AddTransactionsModal type="incomes" />
      </Stack>
    </Stack>
  );
}
