import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../../theme";
import { Navbar } from "./Navbar";
import { Routes } from "./Routes";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Navbar />
    <Routes />
  </ChakraProvider>
);
