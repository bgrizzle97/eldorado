import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  Button,
  Grid,
  Divider,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import ChatIcon from '@mui/icons-material/Chat';
import { auth, signInWithGoogle, signInWithFacebook, signInWithDiscord, logOut } from '../firebase';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSocialLogin = async (provider) => {
    try {
      setLoading(true);
      let result;
      switch (provider) {
        case 'google':
          result = await signInWithGoogle();
          break;
        case 'facebook':
          result = await signInWithFacebook();
          break;
        case 'discord':
          result = await signInWithDiscord();
          break;
        default:
          throw new Error('Invalid provider');
      }
      setSnackbar({
        open: true,
        message: 'Successfully signed in!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'An error occurred during sign in.';
      if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Please allow popups for this website to sign in.';
      } else if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign in was cancelled.';
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        errorMessage = 'An account already exists with this email.';
      }
      setError(errorMessage);
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logOut();
      setSnackbar({
        open: true,
        message: 'Successfully signed out!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Logout error:', error);
      setError(error.message);
      setSnackbar({
        open: true,
        message: 'Error signing out. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box 
          sx={{ 
            mt: 8, 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh'
          }}
        >
          <CircularProgress size={60} />
          <Typography sx={{ mt: 2 }}>Loading...</Typography>
        </Box>
      </Container>
    );
  }

  if (!user) {
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
              backgroundColor: 'background.paper',
              borderRadius: 2,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
              <PersonIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mt: 2, mb: 3 }}>
              Sign In
            </Typography>

            {/* Social Media Login Buttons */}
            <Box sx={{ width: '100%', mb: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={() => handleSocialLogin('google')}
                disabled={loading}
                sx={{
                  mb: 2,
                  color: '#DB4437',
                  borderColor: '#DB4437',
                  '&:hover': {
                    borderColor: '#DB4437',
                    backgroundColor: 'rgba(219, 68, 55, 0.04)',
                  },
                }}
              >
                Continue with Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FacebookIcon />}
                onClick={() => handleSocialLogin('facebook')}
                disabled={loading}
                sx={{
                  mb: 2,
                  color: '#4267B2',
                  borderColor: '#4267B2',
                  '&:hover': {
                    borderColor: '#4267B2',
                    backgroundColor: 'rgba(66, 103, 178, 0.04)',
                  },
                }}
              >
                Continue with Facebook
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<ChatIcon />}
                onClick={() => handleSocialLogin('discord')}
                disabled={loading}
                sx={{
                  color: '#7289DA',
                  borderColor: '#7289DA',
                  '&:hover': {
                    borderColor: '#7289DA',
                    backgroundColor: 'rgba(114, 137, 218, 0.04)',
                  },
                }}
              >
                Continue with Discord
              </Button>
            </Box>

            <Divider sx={{ width: '100%', my: 2 }}>
              <Typography color="text.secondary" variant="body2">
                OR
              </Typography>
            </Divider>

            {/* Email/Password Login */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mb: 2 }}
            >
              Sign In with Email
            </Button>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
            >
              Create Account
            </Button>
          </Paper>
        </Box>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
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
                src={user.photoURL}
                sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                alt={user.displayName}
              />
              <Typography variant="h5" gutterBottom>
                {user.displayName}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {user.email}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleLogout}
                sx={{ mt: 2 }}
              >
                Sign Out
              </Button>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Account Details
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
                <Typography>{user.email}</Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Account Created
                </Typography>
                <Typography>
                  {new Date(user.metadata.creationTime).toLocaleDateString()}
                </Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Last Sign In
                </Typography>
                <Typography>
                  {new Date(user.metadata.lastSignInTime).toLocaleDateString()}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Profile; 