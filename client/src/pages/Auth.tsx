import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login());
    navigate('/');
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
      <Button onClick={handleLogin} variant='contained'>
        Login
      </Button>
      <Button onClick={() => navigate('/sign-up')} variant='contained'>
        Sign Up
      </Button>
    </Box>
  );
};

export default Auth;
