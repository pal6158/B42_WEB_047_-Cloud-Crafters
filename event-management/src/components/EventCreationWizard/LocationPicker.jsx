import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const LocationPicker = ({ formData, setFormData, nextStep, prevStep }) => {
  return (
    <Box>
      <TextField
        label="Location"
        fullWidth
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        margin="normal"
      />
      <Button onClick={prevStep}>Back</Button>
      <Button variant="contained" onClick={nextStep}>Next</Button>
    </Box>
  );
};

export default LocationPicker;
