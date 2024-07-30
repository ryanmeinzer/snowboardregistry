"use client";

import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

interface Snowboard {
  serial_number: number;
  make: string;
  model: string;
  size: number;
  email: string | null;
  claimed: boolean;
  found: boolean;
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
  const [found, setFound] = useState<boolean | null>(null); // Track if snowboard is found
  const [showSearch, setShowSearch] = useState(true); // Track if the search button should be shown
  const [isSerialDisabled, setIsSerialDisabled] = useState(false); // Track if the serial number field should be disabled
  const [isSerialFocused, setIsSerialFocused] = useState(false);

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
    borderRadius: '5px', // Border radius to make edges rounded
  };
  
  const handleSerialSearch = async () => {
    const response = await fetch(`/api/snowboard/${serial}`);
    if (response.status === 200) {
      const data: Snowboard = await response.json();
      setSnowboard(data);
      setFound(true); // Set found state
      setIsSerialDisabled(true); // Disable the serial number field
    } else {
      setSnowboard(null);
      setFound(false); // Reset found state
      setIsSerialDisabled(true); // Disable the serial number field
    }
    setShowSearch(false); // Hide the search button
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/; // Simplified regex for demonstration
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

  const isButtonDisabled = !email || !!emailError; // This will ensure the result is always boolean

  const handleRegister = async () => {
    await fetch('/api/snowboard/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serial_number: parseInt(serial), make, model, size: parseInt(size), email }),
    });
    alert('Snowboard registered and claimed successfully');
  };

  const handleClaim = async () => {
    await fetch('/api/snowboard/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serial_number: parseInt(serial), email }),
    });
    alert('Snowboard claimed successfully');
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
  
    alert(`Notification sent to ${snowboard?.email || 'the registered owner'}`);
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
        {showSearch && (
          <Button variant="contained" onClick={handleSerialSearch} disabled={!serial} sx={{ mb: 2 }}>
            Search
          </Button>
        )}

        {found === false && (
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
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" onClick={handleRegister} disabled={isButtonDisabled} sx={{ mb: 2 }}>
              Register & Claim
            </Button>
            <Button variant="contained" onClick={handleFound} disabled={isButtonDisabled} >
              Found
            </Button>
          </>
        )}

        {found === true && snowboard && (
          <>
            <TextField
              fullWidth
              label="Make"
              variant="outlined"
              value={snowboard.make}
              disabled
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Model"
              variant="outlined"
              value={snowboard.model}
              disabled
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Size"
              type="number"
              variant="outlined"
              value={snowboard.size}
              disabled
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
              sx={{ mb: 2 }}
            />
            {snowboard.claimed ? (
              <Button variant="contained" onClick={handleFound} disabled={isButtonDisabled}>
                Found
              </Button>
            ) : (
              <>
                <Button variant="contained" onClick={handleClaim} disabled={isButtonDisabled} sx={{ mb: 2 }}>
                  Claim
                </Button>
                <Button variant="contained" onClick={handleFound} disabled={isButtonDisabled}>
                  Found
                </Button>
              </>
            )}
          </>
        )}
      </Box>
      <Box>
        <Divider />
        <Typography color="text.secondary" variant="body2" mt={2} align='center'>
          Register to guard against theft and help return lost or found snowboards.  
        </Typography>
      </Box>
    </Container>
  );
};

export default MainForm;
