import React, { useState } from 'react';
import { ThemeProvider, Container, Grid, Typography, Box, TextField, Button, Alert } from '@mui/material';
import { useThemeMode } from '@/hooks/ThemeModeContext';
import { useNavigate } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  const { theme } = useThemeMode();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/login'); // Adjust the path to match your login route
  };

  const sendSignUpData = async (
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    email: string,
    password: string
  ) => {
    try {
      
      // TODO: send to server currectly
      const response = await fetch('BACKENDURL/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          dateOfBirth,
          email,
          password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Sign-up successful');
  
      return await response.json();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!firstName || !lastName || !dateOfBirth || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
  
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format.');
      return;
    }
  
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
  
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    sendSignUpData(
      firstName,
      lastName,
      dateOfBirth,
      email,
      password
    )
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid item xs={11} style={{ marginBottom: '16px' }}>
            <Typography component="h1" variant="h2">
              Sign Up
            </Typography>
          </Grid>
          <Box component="form" noValidate autoComplete="off" sx={{ width: '100%', maxWidth: 400 }} onSubmit={handleSignUp}>
          <Grid
              item
              xs={11}
              container
              direction="row"
              justifyContent="space-between"
            >
            <Grid item xs={5.5} style={{ marginBottom: '16px' }}>
              <TextField
                fullWidth
                id="firstName"
                label="First Name"
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={5.5} style={{ marginBottom: '16px' }}>
              <TextField
                fullWidth
                id="lastName"
                label="Last Name"
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            </Grid>
            <Grid item xs={11} style={{ marginBottom: '16px' }}>
              <TextField
                fullWidth
                id="dateOfBirth"
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </Grid>
            <Grid item xs={11} style={{ marginBottom: '16px' }}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={11} style={{ marginBottom: '16px' }}>
              <TextField
                fullWidth
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={11} style={{ marginBottom: '16px' }}>
              <TextField
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            {error && (
              <Grid item xs={11} style={{ marginBottom: '16px' }}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}
            <Grid
              item
              xs={11}
              container
              direction="row"
              justifyContent="space-between"
            >
              <Grid item xs={7}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Sign up
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="outlined" color="primary" fullWidth onClick={handleRedirect}>
                  Login
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default SignUpPage;
