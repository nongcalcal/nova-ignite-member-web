import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  CardHeader,
  CardActions,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { AppLogo } from "@/components";
import React from "react";
import { otpFormStyles } from "./OtpForm.styles";

const otpSchema = yup.object({
  otp: yup
    .string()
    .required("Enter OTP.")
    .matches(/^[0-9]{6}$/, "OTP must be 6 digits"),
});

type OtpFormData = {
  otp: string;
};

type OtpFormProps = {
  onSubmit: (data: OtpFormData) => Promise<void>;
  isSubmitting?: boolean;
  error?: string; // for server-side error
  onResendOtp?: () => void; // handler for resend OTP
};

export const OtpForm = ({
  onSubmit,
  isSubmitting = false,
  error,
  onResendOtp,
}: OtpFormProps) => {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    getValues,
    formState,
  } = useForm<OtpFormData>({
    resolver: yupResolver(otpSchema),
    defaultValues: { otp: "" },
    mode: "onSubmit",
  });

  // Handle server-side error
  React.useEffect(() => {
    if (error) {
      setError("otp", { type: "server", message: error });
    } else {
      clearErrors("otp");
    }
  }, [error, setError, clearErrors]);

  // Refs for each input
  const inputsRef = React.useRef<(HTMLInputElement | null)[]>([]);

  // Handle input change for each digit
  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) return;
    // Handle paste of full OTP
    if (val.length > 1) {
      const arr = val.split("").slice(0, 6);
      setValue("otp", arr.join(""), { shouldValidate: true });
      arr.forEach((digit, i) => {
        if (inputsRef.current[i]) inputsRef.current[i]!.value = digit;
      });
      if (inputsRef.current[arr.length - 1])
        inputsRef.current[arr.length - 1]!.focus();
      return;
    }
    // Replace value at idx
    const otpArr = getValues("otp").split("").concat(Array(6).fill(""));
    otpArr[idx] = val;
    const newOtp = otpArr.slice(0, 6).join("");
    setValue("otp", newOtp, { shouldValidate: true });
    // Move to next input
    if (idx < 5 && val) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  // Handle backspace/delete
  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    const otpArr = getValues("otp").split("");
    if (e.key === "Backspace" || e.key === "Delete") {
      if (otpArr[idx]) {
        // If current box has value, clear it and stay
        otpArr[idx] = "";
        setValue("otp", otpArr.join(""), { shouldValidate: true });
        e.preventDefault();
      } else if (idx > 0) {
        // If empty, move to previous and clear
        inputsRef.current[idx - 1]?.focus();
        otpArr[idx - 1] = "";
        setValue("otp", otpArr.join(""), { shouldValidate: true });
        e.preventDefault();
      }
    }
  };

  // Render OTP input boxes
  const renderOtpInputs = (field: any) => {
    const otpValue = field.value || "";
    return (
      <Stack direction="row" spacing={0.5} justifyContent="center">
        {Array.from({ length: 6 }).map((_, idx) => (
          <input
            key={idx}
            ref={(el) => {
              inputsRef.current[idx] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={otpValue[idx] || ""}
            onChange={(e) => {
              handleOtpChange(e, idx);
              field.onChange(getValues("otp"));
            }}
            onKeyDown={(e) => handleOtpKeyDown(e, idx)}
            onPaste={(e) => {
              const paste = e.clipboardData.getData("text").replace(/\D/g, "");
              if (paste.length === 6) {
                setValue("otp", paste, { shouldValidate: true });
                paste.split("").forEach((digit, i) => {
                  if (inputsRef.current[i]) inputsRef.current[i]!.value = digit;
                });
                if (inputsRef.current[5]) inputsRef.current[5]!.focus();
                e.preventDefault();
              }
            }}
            style={{
              ...otpFormStyles.otpInputBox,
              ...(formState.errors.otp ? otpFormStyles.otpInputBoxError : {}),
            }}
            aria-label={`OTP digit ${idx + 1}`}
            autoFocus={idx === 0}
          />
        ))}
      </Stack>
    );
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Card
        elevation={3}
        sx={{ minWidth: 342, maxWidth: 400, height: 570, p: 1 }}
      >
        <CardHeader title={<AppLogo />} sx={otpFormStyles.cardHeader} />
        <CardContent>
          <Typography sx={otpFormStyles.loginTitle}>Enter OTP Code</Typography>
          <Box mt={"48px"}>
            <Controller
              name="otp"
              control={control}
              render={({ field }) => renderOtpInputs(field)}
            />
            {formState.errors.otp && (
              <Typography
                color="error"
                mt={1}
                ml={"16px"}
                mr={"16px"}
                fontSize={12}
              >
                {formState.errors.otp.message}
              </Typography>
            )}
          </Box>
          <Box mt={"16px"}>
            <Typography
              ml={"16px"}
              mr={"16px"}
              sx={{
                fontSize: 12,
                fontWeight: 400,
                color: "#4E463999",
              }}
            >
              Need a new OTP? You can request in 00:50
            </Typography>
          </Box>
          <Box mt={"26px"} sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="text"
              onClick={onResendOtp}
              sx={{
                textDecoration: "underline",
                fontSize: "14px",
                fontWeight: 500,
                color: "#8C7958",
                lineHeight: "20px",
                minWidth: 0,
                padding: 0,
                "&:hover": {
                  textDecoration: "underline",
                  backgroundColor: "transparent",
                },
                "&:focus": {
                  textDecoration: "underline",
                  backgroundColor: "transparent",
                },
                "&:active": {
                  textDecoration: "underline",
                  backgroundColor: "transparent",
                },
              }}
              disableRipple
            >
              Resend new OTP
            </Button>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "center", mt: "40px" }}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={otpFormStyles.submitButton}
          >
            Verify OTP
          </LoadingButton>
        </CardActions>
      </Card>
    </form>
  );
};
