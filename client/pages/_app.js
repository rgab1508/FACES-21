import { ChakraProvider } from "@chakra-ui/react";
import { UserContextProvider } from "../context/UserContext";
import { CartContextProvider } from "../context/CartContext";
import theme from "../theme/themes";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <UserContextProvider>
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </UserContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
