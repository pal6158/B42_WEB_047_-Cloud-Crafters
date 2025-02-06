import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const InviteesSelector = ({ formData, setFormData, nextStep, prevStep }) => {
  return (
    <Box>
      <TextField
        label="Invitees (comma separated emails)"
        fullWidth
        value={formData.invitees}
        onChange={(e) => setFormData({ ...formData, invitees: e.target.value })}
        margin="normal"
      />
      <Button onClick={prevStep}>Back</Button>
      <Button variant="contained" onClick={nextStep}>Next</Button>
    </Box>
  );
};

export default InviteesSelector;
