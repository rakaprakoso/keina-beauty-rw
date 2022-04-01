import React, { useState } from 'react';
import { Overlay } from 'react-portal-overlay';

const Alert1 = () => {
    const [open, setOpen] = useState(true);

  return (
    <Overlay open={open} onClose={() => setOpen(false)}>
      <h1>My overlay</h1>
    </Overlay>
  );
}

export default Alert1
