import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function About() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          About Eldorado
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to Eldorado, your premier destination for gaming marketplace services.
          We provide a secure and reliable platform for gamers to buy and sell gaming
          accounts, items, and services.
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is to create a safe and efficient marketplace for the gaming
          community, ensuring smooth transactions and excellent customer service.
        </Typography>
      </Box>
    </Container>
  );
}

export default About; 