import { extendTheme } from "@chakra-ui/react";
import "@fontsource/paytone-one/";
import "@fontsource/titillium-web/400.css";
import "@fontsource/titillium-web/600.css";
import "@fontsource/titillium-web/700.css";

const theme = extendTheme({
  fonts: {
    body: "Titillium Web",
    heading: "Paytone One",
  },
});

export default theme;
