import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { AppLogo } from "@/components";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormTextField } from "@/components";
import { LoadingButton } from "@mui/lab";
import { loginFormStyles } from "./LoginForm.styles";
import { useEffect } from "react";

const phoneSchema = yup
  .string()
  .required("Enter phone number")
  .matches(/^\d{9,15}$/, "Enter a valid phone number");

const resolver = yupResolver(
  yup.object({
    phone: phoneSchema,
  })
);

type LoginFormData = {
  phone: string;
};

type LoginFormProps = {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isSubmitting?: boolean;
  error?: string; // Server error message
};

export const LoginForm = ({
  onSubmit,
  isSubmitting = false,
  error,
}: LoginFormProps) => {
  const { control, handleSubmit, setError, clearErrors } = useForm({
    resolver,
    defaultValues: { phone: "" },
  });

  useEffect(() => {
    if (error) {
      setError("phone", {
        type: "server",
        message: error,
      });
    } else {
      clearErrors("phone");
    }
  }, [error, setError, clearErrors]);

  const handleFormSubmit = handleSubmit(onSubmit);

  return (
    <form noValidate onSubmit={handleFormSubmit}>
      <Card
        elevation={3}
        sx={{ minWidth: 342, maxWidth: 500, height: 570, p: 1 }}
      >
        <CardHeader title={<AppLogo />} sx={loginFormStyles.cardHeader} />
        <CardContent>
          <Typography sx={loginFormStyles.loginTitle}>Log in</Typography>
          <Box mt={"48px"}>
            <FormTextField
              name="phone"
              control={control}
              type="tel"
              label={"Phone number"}
              required
              fullWidth
              autoComplete="tel"
              showErrorIcon
            />
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "center", mt: "40px" }}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={loginFormStyles.submitButton}
          >
            <Typography sx={loginFormStyles.buttonText}>Send OTP</Typography>
          </LoadingButton>
        </CardActions>
      </Card>
    </form>
  );
};
