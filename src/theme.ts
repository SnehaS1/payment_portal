"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});
export const fontSizes = {
  xxs: 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  "2xl": 24,
  "3xl": 32,
  "4xl": 38,
  "5xl": 40,
  "6xl": 54,
};

const breakpoints = {
  values: {
    xs: 300, // phone
    sm: 600, // tablets
    md: 900, // small laptop
    lg: 1200, // desktop
    xl: 1536, // large screens
  },
};

const theme = createTheme({
  palette: {
    primary: {
      light: "#30001a",
      main: "#0c010a",
      dark: "#e1ad12",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h2: {
      fontSize: fontSizes["4xl"],
      fontWeight: 800,
      lineHeight: 1.2,
      textShadow: "3px 3px 10px #800000",
      [`@media screen and (max-width: ${breakpoints.values.md}px)`]: {
        fontSize: fontSizes["2xl"],
      },
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
      // color: "#eef2f3",
      color:
        "linear-gradient(to right bottom, #f90c71, #cf0e66, #a71059, #80104a, #5c0e39)",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 20,
          // backgroundColor: "#30001a",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "--TextField-brandBorderColor": "#a71059",
          "--TextField-brandBorderHoverColor": "#B2BAC2",
          "--TextField-brandBorderFocusedColor": "#6F7E8C",
          "& label.Mui-focused": {
            color: "var(--TextField-brandBorderFocusedColor)",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "var(--TextField-brandBorderColor)",
        },
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--TextField-brandBorderHoverColor)",
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--TextField-brandBorderFocusedColor)",
          },
        },
      },
    },
  },
});

export default theme;
