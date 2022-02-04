import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ChakraProvider } from "@chakra-ui/react";
import newTheme from "./styles/theme";

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider theme={newTheme}>
            <App />
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById("root")
);