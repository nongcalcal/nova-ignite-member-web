import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";
import { Control, useWatch } from "react-hook-form";
import { FormTextField } from "./FormTextField";
import { IconButton, InputAdornment } from "@mui/material";

export function FormPasswordTextField({ control }: { control: Control<any> }) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const password = useWatch({ name: "password", control });
  const isShowIcon = !!password;

  useEffect(() => {
    if (!password && isShowPassword) {
      setIsShowPassword(false);
    }
  }, [isShowPassword, password]);

  function togglePasswordVisibility() {
    setIsShowPassword(!isShowPassword);
  }

  const visibilityIcon = isShowPassword ? <VisibilityOff /> : <Visibility />;
  const passwordType = isShowPassword ? "text" : "password";

  return (
    <FormTextField
      name="password"
      type={passwordType}
      label="รหัสผ่าน"
      control={control}
      autoComplete="current-password"
      InputProps={{
        endAdornment: isShowIcon ? (
          <InputAdornment position="end">
            <IconButton edge="end" onClick={togglePasswordVisibility}>
              {visibilityIcon}
            </IconButton>
          </InputAdornment>
        ) : (
          <></>
        ),
      }}
    />
  );
}
