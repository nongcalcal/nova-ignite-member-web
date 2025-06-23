import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormTextField } from "@/components";

type ForgotPasswordDialogProps = {
  open: boolean;
  onClose: () => void;
};

const resolver = yupResolver(
  yup.object({
    email: yup
      .string()
      .label("อีเมล")
      .email("รูปแบบอีเมลไม่ถูกต้อง")
      .required("ระบุอีเมล"),
  })
);

export function ForgotPasswordDialog({
  open,
  onClose,
}: ForgotPasswordDialogProps) {
  const { control, reset, handleSubmit } = useForm({
    resolver: resolver,
    defaultValues: { email: "" },
  });

  const onSubmit = handleSubmit((data) => {});

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog maxWidth="sm" open={open} onClose={handleClose}>
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        ลืมรหัสผ่าน
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon color="disabled" fontSize="large" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography color="text.secondary" mb={3}>
          กรุณากรอกอีเมลของคุณเพื่อใช้ ในการรีเซตรหัสผ่าน
        </Typography>
        <FormTextField name="email" label="อีเมล" control={control} fullWidth />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <LoadingButton
          variant="contained"
          sx={{ width: 116 }}
          loading={false}
          onClick={onSubmit}
        >
          ส่ง
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
