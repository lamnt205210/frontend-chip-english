// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#21BDC6",
    },
    secondary: {
      main: "#e9f8f9",
    },
    third: {
      main: "#FFA800",
    },
  },
  typography: {
    fontFamily: "Cabin, sans-serif",
  },
});

export default theme;
