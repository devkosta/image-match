import { extendTheme } from "@chakra-ui/react";

import fonts from "./foundations/fonts";
import components from "./components";

const newTheme = {
    fonts,
    components
};

export default extendTheme(newTheme);