export const loginFormStyles = {
  cardHeader: {
    mt: "11px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiCardHeader-content": {
      textAlign: "center",
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
  },
  loginTitle: {
    fontFamily: "Ausgen, sans-serif",
    fontWeight: 700,
    fontSize: "1.375rem",
    lineHeight: "28px",
    letterSpacing: "0px",
    textAlign: "center",
  },
  buttonText: {
    fontFamily: "Ausgen, sans-serif",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.1px",
    textAlign: "center",
    verticalAlign: "middle",
  },
  submitButton: {
    minWidth: 120,
    height: 40,
    borderRadius: "16px !important",
  },
} as const;
