import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useMutation } from '@apollo/client';
import Spinner from '../components/spinner';
import { Typography } from '@mui/material';
import { LOGOUT_USER } from '../graphql/logoutUser';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser, { loading }] = useMutation(LOGOUT_USER);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const token = localStorage.getItem('token');
      if (token) {
        await logoutUser({ variables: { token } });
        localStorage.removeItem('token');
      }
      dispatch(logout());
      navigate('/auth');
    } catch (error) {
      console.error('Error during logout:', error);
      setIsLoggingOut(false);
    }
  };

  if (isLoggingOut || loading) {
    return <Spinner />;
  }

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
      <Typography align='center' sx={{ padding: '20px' }} variant='h5' fontWeight='bold'>
        Welcome to the Home Page
      </Typography>
      <Button onClick={handleLogout} variant='contained' disabled={loading || isLoggingOut}>
        Logout
      </Button>
    </Box>
  );
};

export default Home;
