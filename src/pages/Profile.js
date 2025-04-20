import React from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  Button,
  Grid,
  Divider
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const Profile = () => {
  // This would normally come from your authentication system
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            mt: 8,
            mb: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
              <PersonIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mt: 2, mb: 3 }}>
              Sign In
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mb: 2 }}
            >
              Sign In
            </Button>
            <Divider sx={{ width: '100%', my: 2 }}>OR</Divider>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
            >
              Create Account
            </Button>
          </Paper>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                alt="User Avatar"
              />
              <Typography variant="h5" gutterBottom>
                Username
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                Member since: January 2024
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Account Details
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
                <Typography>user@example.com</Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Trading Status
                </Typography>
                <Typography>Verified Trader</Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Completed Trades
                </Typography>
                <Typography>25</Typography>
              </Box>
              <Button variant="contained" color="primary">
                Edit Profile
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile; 