import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/themes";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
