import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ThankYouPage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Thank You!
        </Typography>
        <Typography variant="h6" component="p">
          Your response has been saved successfully.
        </Typography>
      </Paper>
    </Container>
  );
};

export default ThankYouPage;
