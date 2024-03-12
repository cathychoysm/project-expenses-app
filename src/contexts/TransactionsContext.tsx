import { ReactElement, createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid";

interface TransactionsFormValues {
  date: string;
  category: string;
  description: string;
  amount: number;
}

export interface Transactions extends TransactionsFormValues {
  id: string;
}

interface TransactionsContextType {
  expenses: Array<Transactions>;
  addExpenses: ({
    date,
    category,
    description,
    amount,
  }: TransactionsFormValues) => void;
  removeExpenses: (id: string) => void;
  incomes: Array<Transactions>;
  addIncomes: ({
    date,
    category,
    description,
    amount,
  }: TransactionsFormValues) => void;
  removeIncomes: (id: string) => void;
  expensesCategories: Array<string>;
  incomesCategories: Array<string>;
  addExpensesCategories: (category: string) => void;
  addIncomesCategories: (category: string) => void;
}

const TransactionsContext = createContext<TransactionsContextType>({
  expenses: [],
  addExpenses: () => {},
  removeExpenses: () => {},
  incomes: [],
  addIncomes: () => {},
  removeIncomes: () => {},
  expensesCategories: [],
  incomesCategories: [],
  addExpensesCategories: () => {},
  addIncomesCategories: () => {},
});

export default function useTransactions() {
  return useContext(TransactionsContext);
}

interface TransactionsProviderProps {
  children: ReactElement;
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

  function addExpenses({
    date,
    category,
    description,
    amount,
  }: TransactionsFormValues): void {
    setExpenses((prevExpenses: Array<Transactions>) => {
      return [
        ...prevExpenses,
        { id: uuidv4(), date, category, description, amount },
      ];
    });
  }

  function removeExpenses(id: string): void {
    setExpenses((prevExpenses: Array<Transactions>) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }

  function addIncomes({
    date,
    category,
    description,
    amount,
  }: TransactionsFormValues): void {
    setIncomes((prevIncomes: Array<Transactions>) => {
      return [
        ...prevIncomes,
        { id: uuidv4(), date, category, description, amount },
      ];
    });
  }

  function removeIncomes(id: string): void {
    setIncomes((prevIncomes: Array<Transactions>) => {
      return prevIncomes.filter((income) => income.id !== id);
    });
  }

  function addExpensesCategories(category: string): void {
    setExpensesCategories((prevCategories: Array<string>) => {
      return [...prevCategories, category];
    });
  }

  function addIncomesCategories(category: string): void {
    setIncomesCategories((prevCategories: Array<string>) => {
      return [...prevCategories, category];
    });
  }

  return (
    <TransactionsContext.Provider
      value={{
        expenses,
        addExpenses,
        removeExpenses,
        incomes,
        addIncomes,
        removeIncomes,
        expensesCategories,
        incomesCategories,
        addExpensesCategories,
        addIncomesCategories,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
