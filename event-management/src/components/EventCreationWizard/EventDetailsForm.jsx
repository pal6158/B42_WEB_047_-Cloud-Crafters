import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const EventDetailsForm = ({ formData, setFormData, nextStep }) => {
  return (
    <Box>
      <TextField
        label="Event Name"
        fullWidth
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        margin="normal"
      />
      <TextField
        label="Description"
        fullWidth
        multiline
        rows={4}
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        margin="normal"
      />
      <Button variant="contained" onClick={nextStep}>Next</Button>
    </Box>
  );
};

export default EventDetailsForm;
