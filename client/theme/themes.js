import { extendTheme } from "@chakra-ui/react";
import "@fontsource/titillium-web/400.css";
import "@fontsource/titillium-web/600.css";
import "@fontsource/titillium-web/700.css";
import "@fontsource/titillium-web/900.css";

const theme = extendTheme({
  fonts: {
    body: "Titillium Web",
    heading: "Titillium Web",
  },
});

export default theme;
