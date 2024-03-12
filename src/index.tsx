import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { TransactionsProvider } from "./contexts/TransactionsContext";

const theme = extendTheme({
  colors: {
    yellow: {
      100: "#FFF7F1",
      200: "#FEECDA",
      300: "#FFE4C9",
      400: "",
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <TransactionsProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </TransactionsProvider>
  </React.StrictMode>
);
