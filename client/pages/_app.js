import { ChakraProvider } from "@chakra-ui/react";
import { UserContextProvider } from "../context/UserContext";
import theme from "../theme/themes";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
