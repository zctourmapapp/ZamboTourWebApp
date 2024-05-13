import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import RouterComponent from "./Router/RouterComponent";
import { ProSidebarProvider } from "react-pro-sidebar";
import "./App.css";

function App() {
  const colors = {
    primary: {
      900: "#ff9d00c2",
      800: "#f5c32c",
      700: "rgba(252, 166, 31, 0.45)",
    },
    secondary: {
      900: "#242d49",
      800: "#788097",
    },
    background: {
      900: "#ddf8fe",
      800: "rgb(238, 210, 255)",
    },
    light: {
      900: "#FFF",
    },
    dark: {
      900: "#222",
    },
  };

  const theme = extendTheme({ colors });

  return (
    <ChakraProvider theme={theme}>
      <ProSidebarProvider>
        <RouterComponent />
      </ProSidebarProvider>
    </ChakraProvider>
  );
}

export default App;
