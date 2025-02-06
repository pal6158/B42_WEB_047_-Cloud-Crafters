import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const DateTimePicker = ({ formData, setFormData, nextStep, prevStep }) => {
  return (
    <Box>
      <TextField
        label="Date"
        type="date"
        fullWidth
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        margin="normal"
      />
      <TextField
        label="Time"
        type="time"
        fullWidth
        value={formData.time}
        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
        margin="normal"
      />
      <Button onClick={prevStep}>Back</Button>
      <Button variant="contained" onClick={nextStep}>Next</Button>
    </Box>
  );
};

export default DateTimePicker;
