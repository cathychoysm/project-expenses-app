import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid";
import {
  Transactions,
  TransactionsContextType,
  TransactionsFormValues,
  TransactionsProviderProps,
  TypeString,
} from "../react-app-env";

const TransactionsContext = createContext<TransactionsContextType>({
  // data
  expenses: [],
  incomes: [],
  expensesCategories: [],
  incomesCategories: [],
  expensesTotal: 0,
  incomesTotal: 0,
  dateExpensesTotals: [],
  dateIncomesTotals: [],
  categoryExpensesTotals: [],
  categoryIncomesTotals: [],
  // functions
  addTransactions: () => {},
  removeTransactions: () => {},
  editTransactions: () => {},
  addTransactionsCategories: () => {},
});

export default function useTransactions() {
  return useContext(TransactionsContext);
}

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  const [incomes, setIncomes] = useLocalStorage("incomes", []);
  const [expensesCategories, setExpensesCategories] = useLocalStorage(
    "expenses_categories",
    []
  );
  const [incomesCategories, setIncomesCategories] = useLocalStorage(
    "incomes_categories",
    []
  );

  let expensesTotal = 0;
  expenses.forEach((expense: Transactions) => {
    expensesTotal += expense.amount;
  });

  let incomesTotal = 0;
  incomes.forEach((income: Transactions) => {
    incomesTotal += income.amount;
  });

  const dateExpensesMap = new Map();
  for (var i = 0; i < expenses.length; i++) {
    let amount = dateExpensesMap.get(expenses[i].date);
    if (!dateExpensesMap.has(expenses[i].date)) {
      dateExpensesMap.set(expenses[i].date, expenses[i].amount);
    } else {
      amount += expenses[i].amount;
      dateExpensesMap.set(expenses[i].date, amount);
    }
  }
  const dateExpensesTotals = Array.from(dateExpensesMap).map(
    ([date, total]) => ({ date, total })
  );

  const dateIncomesMap = new Map();
  for (var j = 0; j < incomes.length; j++) {
    let amount = dateIncomesMap.get(incomes[j].date);
    if (!dateIncomesMap.has(incomes[j].date)) {
      dateIncomesMap.set(incomes[j].date, incomes[j].amount);
    } else {
      amount += incomes[j].amount;
      dateIncomesMap.set(incomes[j].date, amount);
    }
  }
  const dateIncomesTotals = Array.from(dateIncomesMap).map(([date, total]) => ({
    date,
    total,
  }));

  const categoryExpensesMap = new Map();
  for (var k = 0; k < expenses.length; k++) {
    let amount = categoryExpensesMap.get(expenses[k].category);
    if (!categoryExpensesMap.has(expenses[k].category)) {
      categoryExpensesMap.set(expenses[k].category, expenses[k].amount);
    } else {
      amount += expenses[k].amount;
      categoryExpensesMap.set(expenses[k].category, amount);
    }
  }
  const categoryExpensesTotals = Array.from(categoryExpensesMap).map(
    ([category, total]) => ({ category, total })
  );

  const categoryIncomesMap = new Map();
  for (var m = 0; m < incomes.length; m++) {
    let amount = categoryIncomesMap.get(incomes[m].category);
    if (!categoryIncomesMap.has(incomes[m].category)) {
      categoryIncomesMap.set(incomes[m].category, incomes[m].amount);
    } else {
      amount += incomes[m].amount;
      categoryIncomesMap.set(incomes[m].category, amount);
    }
  }
  const categoryIncomesTotals = Array.from(categoryIncomesMap).map(
    ([category, total]) => ({
      category,
      total,
    })
  );

  const setTransactions = { expenses: setExpenses, incomes: setIncomes };

  function addTransactions(
    type: TypeString,
    { date, category, description, amount }: TransactionsFormValues
  ): void {
    setTransactions[type]((prevTransactions: Array<Transactions>) => {
      return [
        ...prevTransactions,
        { id: uuidv4(), date, category, description, amount },
      ];
    });
  }

  function removeTransactions(type: TypeString, id: string): void {
    setTransactions[type]((prevTransactions: Array<Transactions>) => {
      return prevTransactions.filter((transaction) => transaction.id !== id);
    });
  }

  function editTransactions(
    type: TypeString,
    { id, date, category, description, amount }: Transactions
  ) {
    setTransactions[type]((prevTransactions: Array<Transactions>) => {
      const index = prevTransactions.findIndex(
        (transaction) => transaction.id === id
      );
      prevTransactions[index] = {
        id: id,
        date: date,
        category: category,
        description: description,
        amount: amount,
      };
      return [...prevTransactions];
    });
  }

  const setTransactionsCategories = {
    expenses: setExpensesCategories,
    incomes: setIncomesCategories,
  };

  function addTransactionsCategories(type: TypeString, category: string): void {
    setTransactionsCategories[type]((prevCategories: Array<string>) => {
      return [...prevCategories, category];
    });
  }

  return (
    <TransactionsContext.Provider
      value={{
        // data
        expenses,
        incomes,
        expensesCategories,
        incomesCategories,
        expensesTotal,
        incomesTotal,
        dateExpensesTotals,
        dateIncomesTotals,
        categoryExpensesTotals,
        categoryIncomesTotals,
        // functions
        addTransactions,
        removeTransactions,
        editTransactions,
        addTransactionsCategories,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
