import { Box, Button, Modal } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';

const Errors = (props) => {
  const [open, setOpen] = useState(true);

  const { error } = props;

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      {error && (
        <Modal
          hideBackdrop
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 200 }}>
            <h2 id="child-modal-title">Error</h2>
            <p id="child-modal-description">{error}</p>
            <Button onClick={handleClose}>Close Child Modal</Button>
          </Box>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default Errors;
