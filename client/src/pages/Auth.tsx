import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { gql, useMutation } from '@apollo/client';
import Spinner from '../components/spinner';
import { isValidEmail } from '../helpers/validationHelpers';

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const handleLogin = async () => {
    setErrorMessage('');
    setEmailError('');

    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    try {
      const { data } = await loginUser({ variables: { email, password } });
      if (data) {
        dispatch(login());
        localStorage.setItem('token', data.loginUser.token);
        navigate('/');
      }
    } catch (error) {
      // Error handling is done in the onError callback
    }
  };

  if (loading) {
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
        '& .MuiTextField-root, .MuiButton-root': { m: 1, width: '25ch' },
      }}
    >
      <TextField
        error={!!emailError}
        helperText={emailError}
        label='Email'
        variant='outlined'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        error={!!errorMessage}
        helperText={errorMessage}
        label='Password'
        type='password'
        variant='outlined'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin} variant='contained' disabled={loading}>
        Login
      </Button>
      <Button onClick={() => navigate('/sign-up')} variant='contained'>
        Sign Up
      </Button>
    </Box>
  );
};

export default Auth;
