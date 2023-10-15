import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

import App from "./App";

const colors = {
  brand: {
    900: "#151A2E",
    800: "#1C233C",
    700: "#242E55",
    600: "#2C3A6A",
    500: "#344680",
    400: "#4B6A9B",
    300: "#6684B5",
    200: "#829ECF",
    100: "#9FB8E9",
  },
};

const theme = extendTheme({ colors });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS theme={theme}>
        <App />
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </React.StrictMode>
);
