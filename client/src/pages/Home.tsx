import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
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
      }}
    >
      <h1>Welcome to the Home Page</h1>
      <Button onClick={handleLogout} variant='contained'>
        Logout
      </Button>
    </Box>
  );
};

export default Home;
