/// <reference types="react-scripts" />

import { UseRadioProps } from "@chakra-ui/react";

// Transaction Context
export interface TransactionsContextType {
	// data
	expenses: Array<Transactions>;
	incomes: Array<Transactions>;
	expensesCategories: Array<string>;
	incomesCategories: Array<string>;
	expensesTotal: number;
	incomesTotal: number;
	dateExpensesTotals: Array<Obect>;
	dateIncomesTotals: Array<Obect>;
	categoryExpensesTotals: Array<Obect>;
	categoryIncomesTotals: Array<Obect>;
	// functions
	addExpenses: ({
		date,
		category,
		description,
		amount,
	}: TransactionsFormValues) => void;
	addIncomes: ({
		date,
		category,
		description,
		amount,
	}: TransactionsFormValues) => void;
	removeExpenses: (id: string) => void;
	removeIncomes: (id: string) => void;
	addExpensesCategories: (category: string) => void;
	addIncomesCategories: (category: string) => void;
}

export interface TransactionsProviderProps {
  children: ReactElement;
}

// Summary Header
export interface TotalCardProps {
  heading: string;
  number: string;
  color: string;
}

export interface TransactionsFormValues {
  date: string;
  category: string;
  description: string;
  amount: number;
}

export interface Transactions extends TransactionsFormValues {
	id: string;
}

export interface AddCategoryModalProps {
  type: "expenses" | "incomes";
  isOpen: boolean;
  onClose: () => void;
  setValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) =>
    | Promise<void>
    | Promise<
        FormikErrors<{
          date: string;
          category: string;
          description: string;
          amount: number;
        }>
      >;
}

// View Navigation
export interface RadioCardProps extends UseRadioProps {
  children: string;
}

export interface ViewNavigationProps {
  setView: React.Dispatch<React.SetStateAction<string>>;
}

// Transaction Lists
export interface Type {
	type: "expenses" | "incomes";
}

export interface transactionDatesGroupsObject {
	date: string;
	items: Array<Object>;
}

export interface transactionCategorieGroupsObject {
	category: string;
	items: Array<Object>;
}

export interface RemoveTransactionProps {
  type: "expenses" | "incomes";
  id: string;
}
