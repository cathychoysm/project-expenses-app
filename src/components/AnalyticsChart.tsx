import { VStack } from "@chakra-ui/react";
import useTransactions from "../contexts/TransactionsContext";
import { Type } from "../react-app-env";
import { PieChart } from "@mui/x-charts/PieChart";
import { ThemeProvider, createTheme } from "@mui/material";

export default function AnalyticsChart({ type }: Type) {
  const muiTheme = createTheme();

  const {
    expensesTotal,
    incomesTotal,
    categoryExpensesTotals,
    categoryIncomesTotals,
  } = useTransactions();

  const total = type === "expenses" ? expensesTotal : incomesTotal;

  const categoryTotals =
    type === "expenses" ? categoryExpensesTotals : categoryIncomesTotals;

  const data = categoryTotals.map((category) => {
    return {
      id: category.category,
      value: category.total,
      label: category.category,
    };
  });

  return (
    <VStack
      width="full"
      bg="yellow.200"
      padding={{ base: "15px", md: "30px" }}
      borderRadius={10}
      gap={10}
      height={{ base: 420, md: 680 }}
    >
      <ThemeProvider theme={muiTheme}>
        <PieChart
          series={[
            {
              data: data,
              outerRadius: "65%",
              innerRadius: "20%",
              cornerRadius: 10,
              sortingValues: "asc",
              highlightScope: { faded: "global", highlighted: "item" },
              valueFormatter: (item) => `$${item.value.toFixed(2)}`,
              arcLabel: (item) => `${((item.value / total) * 100).toFixed(0)}%`,
              cy: "40%",
            },
          ]}
          slotProps={{
            legend: {
              position: { horizontal: "middle", vertical: "bottom" },
              direction: "row",
            },
          }}
          margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
        />
      </ThemeProvider>
    </VStack>
  );
}
