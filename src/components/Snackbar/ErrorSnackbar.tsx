import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from 'react';

export function ErrorSnackbar(props: any) {
  const handleClose = () => {
    props.onClose();
  };

  return (
    <Snackbar open={true} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="error"
        variant="filled"
        sx={{ width: '100%' }}
      >
        {props.label}
      </Alert>
    </Snackbar>
  );
}
