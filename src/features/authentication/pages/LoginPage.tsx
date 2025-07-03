import { Box, Stack, Typography } from "@mui/material";
import { FitUpLogo } from "@/components";
import { LoginForm, OtpForm } from "../components";
import { useState } from "react";

type LoginFormData = {
  phone: string;
};

type OtpFormData = {
  otp: string;
};

const LoginPage = () => {
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtp, setShowOtp] = useState(true);

  const handleSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);
      setError(""); // Clear previous errors

      // eslint-disable-next-line no-console
      console.log("Login data:", data);

      // Example API call
      // const response = await loginUser(data);
      // if (response.success) {
      //   setShowOtp(true);
      //   return;
      // } else if (response.error) {
      //   setError(response.error);
      //   return;
      // }

      // Simulate success:
      setShowOtp(true);
      // Simulate error:
      // setError("Please enter a valid phone number");
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error("Login error:", error);

      // Handle server error response
      if (error?.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error?.message) {
        setError(error.message);
      } else {
        setError("Please enter a valid phone number");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpSubmit = async (data: OtpFormData) => {
    // Handle OTP submit here
    // Example: await verifyOtp(data.otp)
    // Show success or error as needed
    // Reset showOtp if you want to go back
    // setShowOtp(false);
    // setError("");
    // ...
    // eslint-disable-next-line no-console
    console.log("OTP submitted:", data);
  };

  return (
    <Stack
      width="100vw"
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
    >
      {!showOtp ? (
        <LoginForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          error={error}
        />
      ) : (
        <OtpForm
          onSubmit={handleOtpSubmit}
          isSubmitting={false}
          error={error}
        />
      )}

      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ mt: "39px" }}
      >
        <FitUpLogo />
        <Typography>Powered by FitUP</Typography>
      </Box>
    </Stack>
  );
};

export default LoginPage;
