import { ChakraProvider, omitThemingProps } from "@chakra-ui/react";
import "../styles/globals.css";
import theme from "../theme/themes";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
