import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { gql, useMutation } from '@apollo/client';

const LOGOUT_USER = gql`
  mutation LogoutUser($token: String!) {
    logoutUser(token: $token)
  }
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser] = useMutation(LOGOUT_USER);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await logoutUser({ variables: { token } });
        localStorage.removeItem('token');
      }
      dispatch(logout());
      navigate('/auth');
    } catch (error) {
      console.error('Error during logout:', error);
    }
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
