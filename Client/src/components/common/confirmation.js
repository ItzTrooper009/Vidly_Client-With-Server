import React from "react";
import {
  Dialog,
  Slide,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmationDailog = ({
  title,
  children,
  open,
  onConfirmation,
  handleClose,
  confirmColor = "primary",
  cancelColor = "primary",
  cancelVariant = "text",
  confirmVariant = "contained",
  cancelText = "Cancel",
  confirmText = "Confirm",
  confirmSize = "small",
  cancelSize = "small",
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="Confirmation Dailog"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ py: 0 }}>{children}</DialogContent>
      <DialogActions sx={{ p: 2 }}>
        {handleClose && (
          <Button
            variant={cancelVariant}
            color={cancelColor}
            onClick={handleClose}
            size={cancelSize}
          >
            {cancelText}
          </Button>
        )}
        <Button
          variant={confirmVariant}
          color={confirmColor}
          onClick={onConfirmation}
          size={confirmSize}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(ConfirmationDailog);
