import React from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    // Placeholder for sign-up logic
    navigate('/auth');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        '& .MuiTextField-root, .MuiButton-root': { m: 1, width: '25ch' },
      }}
    >
      <TextField label='Username' variant='outlined' />
      <TextField label='Password' type='password' variant='outlined' />
      <TextField label='Confirm Password' type='password' variant='outlined' />
      <Button onClick={handleSignUp} variant='contained'>
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUp;
