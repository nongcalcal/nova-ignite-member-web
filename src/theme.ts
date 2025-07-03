// src/theme.ts
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  // ✅ เปิด M3 mode
  unstable_sxConfig: {}, // required internally
  palette: {
    mode: "light",
    primary: {
      main: "#8C7958", // M3 default primary
    },
    secondary: {
      main: "#625B71",
    },
    background: {
      default: "#fef7ff",
      paper: "#ffffff",
    },
  },
  shape: {
    borderRadius: 12, // M3 recommends 12dp
  },
  typography: {
    button: {
      fontSize: "0.875rem", // 14px
      fontWeight: 500,
      letterSpacing: "0.1em",
      textTransform: "none", // ← ไม่ใช้ uppercase เหมือน M2
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
  },
  // ✅ Enable Material Design 3 style
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: "999px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: "24px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
  },
});
