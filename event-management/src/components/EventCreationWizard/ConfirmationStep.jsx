import React from 'react';
import { Button, Box } from '@mui/material';

const ConfirmationStep = ({ formData, prevStep, submitForm }) => {
  return (
    <Box>
      <h3>Review Event Details</h3>
      <p>Name: {formData.name}</p>
      <p>Description: {formData.description}</p>
      <p>Location: {formData.location}</p>
      <p>Date: {formData.date}</p>
      <p>Time: {formData.time}</p>
      <p>Invitees: {formData.invitees}</p>
      <Button onClick={prevStep}>Back</Button>
      <Button variant="contained" onClick={submitForm}>Submit</Button>
    </Box>
  );
};

export default ConfirmationStep;
