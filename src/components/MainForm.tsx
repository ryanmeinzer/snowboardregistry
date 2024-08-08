"use client";

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Badge from '@mui/material/Badge';
import SnowboardingIcon from '@mui/icons-material/Snowboarding';

interface Snowboard {
  serial_number: number;
  make: string;
  model: string;
  size: number;
  email: string | null;
  indexed: boolean;
  found_by: string | null;
}

const MainForm = () => {
  const theme = useTheme();
  const [serial, setSerial] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [size, setSize] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [snowboard, setSnowboard] = useState<Snowboard | null>(null);
  const [showSearch, setShowSearch] = useState(true); // Track if the search button should be shown
  const [isSerialDisabled, setIsSerialDisabled] = useState(false); // Track if the serial number field should be disabled
  const [isSerialFocused, setIsSerialFocused] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snowboardHasRegisteredEmail, setSnowboardHasRegisteredEmail] = useState(false);
  const [savedCount, setSavedCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchSavedCount = async () => {
      try {
        const response = await fetch('/api/snowboard/foundCount', { method: 'POST' });
        const data = await response.json();
        setSavedCount(Number(data.count));
      } catch (error) {
        console.error('Error fetching saved count:', error);
      }
    };

    fetchSavedCount();
  }, []);

  const glowStyle = {
    animation: 'glow 1.5s ease-in-out infinite',
    '@keyframes glow': {
      '0%, 100%': {
        boxShadow: `0 0 5px ${theme.palette.primary.main}`,
      },
      '50%': {
        boxShadow: `0 0 20px ${theme.palette.primary.main}`,
      }
    },
    borderRadius: '5px',
  };
  
  useEffect(() => {
    if (snowboard) {
      setMake(snowboard.make || ''); 
      setModel(snowboard.model || '');
      if (snowboard.size != null) {
        setSize(snowboard.size.toString());
      } else {
        setSize('');
      }
    }
  }, [snowboard]);

  const handleSerialSearch = async () => {
    const response = await fetch(`/api/snowboard/${serial}`);
    if (response.status === 200) {
      const data: Snowboard = await response.json();
      setSnowboard(data);
      setIsSerialDisabled(true); // Disable the serial number field
      data.email && setSnowboardHasRegisteredEmail(true)
    } else {
      setSnowboard(null);
      setIsSerialDisabled(true); // Disable the serial number field
    }
    setShowSearch(false); // Hide the search button
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/; // Simplified regex for email validation
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailInput = e.target.value;
    setEmail(emailInput);
    if (!validateEmail(emailInput) && emailInput.length > 0) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const isButtonDisabled = !email || !!emailError; // ensures result is always boolean

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleRegister = async () => {
    await fetch('/api/snowboard/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serial_number: parseInt(serial), make, model, size: parseInt(size), email }),
    });
    snowboardHasRegisteredEmail ? setSnackbarMessage('Snowboard registry updated!') : setSnackbarMessage('Snowboard registered!');
    setOpenSnackbar(true)
  };

  const handleFound = async () => {
    const foundData = {
      serial_number: parseInt(serial), // Ensure 'serial' is a string that can be converted
      found_by: email,
      make: make || undefined, // Include 'make' only if it's truthy
      model: model || undefined, // Include 'model' only if it's truthy
      size: size ? parseInt(size) : undefined, // Convert 'size' to an integer if it exists
    };
  
    await fetch('/api/snowboard/found', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(foundData),
    });
    setSnackbarMessage("Thank you! We've sent a notification to the registered owner's email.");
    setOpenSnackbar(true)
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Snowboard Registry
        </Typography>
        <TextField
          fullWidth
          label="Serial Number"
          type="number"
          variant="outlined"
          value={serial}
          onChange={(e) => setSerial(e.target.value)}
          disabled={isSerialDisabled}
          onFocus={() => setIsSerialFocused(true)}
          sx={{
            mb: 2,
            ...(serial === '' && !isSerialDisabled && !isSerialFocused ? glowStyle : {})
          }}
        />
        {
          showSearch ? (
            <Button variant="contained" onClick={handleSerialSearch} disabled={!serial} sx={{ mb: 2 }}>
              Search
            </Button>
          ) : (
            <>
              <TextField
                fullWidth
                label="Make"
                variant="outlined"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Model"
                variant="outlined"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Size"
                type="number"
                variant="outlined"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                // label="Email"
                label={snowboardHasRegisteredEmail ? "Email (updated)" : "Email"}
                type="email"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}
                helperText={emailError}
                sx={{ mb: 2 }}
              />
              <Box>
                <Grid
                  container
                  spacing={4}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <Button variant="contained" onClick={handleRegister} disabled={isButtonDisabled}>
                      Register
                    </Button>
                    <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} >
                      <Alert onClose={handleCloseSnackbar} severity="success" variant="filled" >
                        {snackbarMessage}
                      </Alert>
                    </Snackbar>
                  </Grid>
                  <Grid item>
                    <Typography>
                      or
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" onClick={handleFound} disabled={isButtonDisabled} >
                      Found
                    </Button>
                    <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} >
                      <Alert onClose={handleCloseSnackbar} severity="success" variant="filled" >
                        {snackbarMessage}
                      </Alert>
                    </Snackbar>
                  </Grid>
                </Grid>
              </Box>
            </>
          )
        }
      </Box>
      <Box>
        <Divider />
        <Typography color="text.secondary" variant="body2" mt={2} align='center'>
          Register to guard against theft and help recover lost or found snowboards.  
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={4}>
          <Badge
            badgeContent={savedCount !== null ? savedCount + 100 : 0}
            max={999}
            color="primary"
            sx={{
              '& .MuiBadge-badge': {
                right: -15,
              },
            }}
          >
            <SnowboardingIcon />
          </Badge>
          <Typography color="text.secondary" sx={{ marginLeft: 4.5 }}>
            snowboards found
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default MainForm;
