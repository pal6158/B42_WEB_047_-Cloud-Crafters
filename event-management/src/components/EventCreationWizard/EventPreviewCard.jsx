import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const EventPreviewCard = ({ event }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{event.name}</Typography>
        <Typography>{event.description}</Typography>
        <Typography>{event.location}</Typography>
        <Typography>{event.date} at {event.time}</Typography>
      </CardContent>
    </Card>
  );
};

export default EventPreviewCard;
