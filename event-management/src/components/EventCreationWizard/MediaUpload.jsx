import React from 'react';
import { Button, Box } from '@mui/material';

const MediaUpload = ({ nextStep, prevStep }) => {
  return (
    <Box>
      <input type="file" accept="image/*" />
      <Button onClick={prevStep}>Back</Button>
      <Button variant="contained" onClick={nextStep}>Next</Button>
    </Box>
  );
};

export default MediaUpload;
