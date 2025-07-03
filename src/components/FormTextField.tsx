import { TextField, InputAdornment, IconButton, Tooltip } from "@mui/material";
import { useController } from "react-hook-form";
import ErrorIcon from "@mui/icons-material/Error";

import type { TextFieldProps } from "@mui/material";
import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

export function FormTextField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  onChange,
  showErrorIcon,
  sx,
  ...props
}: Pick<ControllerProps<TFieldValues, TName>, "name" | "control"> &
  Omit<TextFieldProps, "name"> & {
    showErrorIcon?: boolean;
  }) {
  const { field, fieldState } = useController({
    name,
    control,
  });

  const isServerError = fieldState.error?.type === "server";

  return (
    <TextField
      inputRef={field.ref}
      value={field.value ?? ""}
      onChange={(event) => {
        field.onChange(event);
        onChange?.(event);
      }}
      onBlur={field.onBlur}
      error={fieldState.invalid}
      helperText={fieldState.error?.message}
      sx={{
        ...sx,
        "& .MuiOutlinedInput-root": {
          "&.Mui-error": {
            "& fieldset": {
              borderWidth: isServerError ? "3px" : "1px",
            },
          },
        },
      }}
      slotProps={{
        input: {
          endAdornment:
            showErrorIcon && fieldState.invalid ? (
              <InputAdornment position="end">
                <Tooltip title="Phone number is required" arrow>
                  <IconButton edge="end" disabled>
                    <ErrorIcon color="error" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ) : null,
        },
      }}
      {...props}
    />
  );
}
