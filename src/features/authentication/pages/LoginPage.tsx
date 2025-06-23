import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { AppLogo, FormPasswordTextField, FormTextField } from "@/components";
import { ForgotPasswordDialog } from "../components/ForgotPasswordDialog";

const defaultValues = {
  email: "",
  password: "",
};

const schema = yup.object({
  email: yup
    .string()
    .label("อีเมล")
    .email("รูปแบบอีเมลไม่ถูกต้อง")
    .required("กรุณากรอกอีเมล"),
  password: yup
    .string()
    .label("รหัสผ่าน")
    .required("กรุณากรอกรหัสผ่าน")
    .min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
});

const resolver = yupResolver(schema);

const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver,
    defaultValues,
  });

  const [isForgotPasswordDialogOpen, setIsForgotPasswordDialogOpen] =
    useState(false);

  const handleCloseForgotPasswordDialog = () =>
    setIsForgotPasswordDialogOpen(false);

  const handleOpenForgotPasswordDialog = () =>
    setIsForgotPasswordDialogOpen(true);

  // Add onSubmit handler
  const onSubmit = async (data: any) => {
    try {
      console.log("Login data:", data);
      // Add your login logic here
      // Example: await loginUser(data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Stack
      width="100vw"
      minHeight="100vh"
      sx={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg width='1440' height='1024' viewBox='0 0 1440 1024' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M111.727 88.5781L111.737 88.5721L111.747 88.5662L259.974 0H487.451L59.4565 250.151L59.4489 250.156C58.3235 250.807 57.0276 251.092 55.7374 250.974C54.4436 250.856 53.2155 250.339 52.223 249.49C51.2299 248.641 50.5206 247.502 50.1965 246.226C49.874 244.957 49.95 243.619 50.4132 242.395L50.42 242.378L109.066 91.714L109.071 91.7011C109.588 90.3894 110.525 89.292 111.727 88.5781ZM503.305 0H731.496L775.74 24.6915C777.917 25.9098 780.373 26.536 782.866 26.508C785.359 26.4801 787.801 25.7989 789.95 24.532C792.099 23.2652 793.881 21.4567 795.118 19.2862C796.354 17.1157 797.003 14.6587 797 12.159V0H1231.81L219.891 591.746C204.474 600.767 186.979 605.604 169.132 605.78C151.285 605.956 133.699 601.465 118.108 592.75L0 526.802V0H244.378L107.644 81.6987C104.904 83.325 102.783 85.8215 101.618 88.7928L42.9468 239.523C41.8887 242.292 41.7126 245.322 42.4429 248.196C43.1731 251.07 44.7737 253.647 47.0243 255.571C49.2749 257.495 52.0654 258.672 55.0109 258.941C57.9564 259.21 60.912 258.556 63.4719 257.071L503.305 0ZM789 0V12.159V12.1682C789.001 13.278 788.713 14.3664 788.167 15.3257C787.62 16.285 786.833 17.0825 785.887 17.6403C784.942 18.1975 783.87 18.4963 782.776 18.5085C781.683 18.5208 780.605 18.2463 779.647 17.7104L779.639 17.7057L747.912 0H789ZM0 1024V899.182L116.021 964.005C131.62 972.699 149.205 977.176 167.049 976.995C184.892 976.814 202.382 971.982 217.802 962.972L1372.28 272.81C1378.78 268.95 1383.81 263.025 1386.58 255.973L1440 118.65V1024H1076.69L1082.14 1020.79C1089.31 1016.58 1094.82 1010 1097.73 1002.17L1253.7 584.144C1256.33 577.084 1256.71 569.376 1254.8 562.085C1252.9 554.795 1248.79 548.283 1243.05 543.451C1237.31 538.619 1230.22 535.705 1222.77 535.112C1215.31 534.52 1207.86 536.279 1201.44 540.145L399.267 1024H0Z' fill='white'/%3E%3C/svg%3E%0A\");",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      justifyContent="center"
      alignItems="center"
    >
      <AppLogo />
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ mt: 3, minWidth: 444, maxWidth: 500 }}>
          <CardHeader
            title="เข้าสู่ระบบ"
            sx={{
              textAlign: "center",
              "& .MuiCardHeader-title": {
                fontSize: "1.5rem",
                fontWeight: 600,
              },
            }}
          />
          <Stack component={CardContent} gap={2.5} sx={{ px: 3, py: 2 }}>
            <FormTextField
              name="email"
              label="อีเมล"
              control={control}
              autoComplete="email"
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
              required
            />
            <FormPasswordTextField control={control} />
            <Button
              color="inherit"
              sx={{
                alignSelf: "flex-end",
                textTransform: "none",
              }}
              disableRipple
              onClick={handleOpenForgotPasswordDialog}
            >
              ลืมรหัสผ่าน?
            </Button>
          </Stack>
          <CardActions sx={{ justifyContent: "center", px: 3, pb: 3 }}>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              เข้าสู่ระบบ
            </LoadingButton>
          </CardActions>
        </Card>
      </form>

      <ForgotPasswordDialog
        open={isForgotPasswordDialogOpen}
        onClose={handleCloseForgotPasswordDialog}
      />
    </Stack>
  );
};

export default LoginPage;
