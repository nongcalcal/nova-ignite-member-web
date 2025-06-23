import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

import type { TextFieldProps } from "@mui/material";
import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

export function FormTextField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  onChange,
  ...props
}: Pick<ControllerProps<TFieldValues, TName>, "name" | "control"> &
  Omit<TextFieldProps, "name">) {
  const { field, fieldState } = useController({
    name,
    control,
  });

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
      {...props}
    />
  );
}
