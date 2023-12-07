import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useMutation } from '@apollo/client';
import Spinner from '../components/spinner';
import { isValidEmail, doPasswordsMatch } from '../helpers/validationHelpers';
import { CREATE_USER } from '../graphql/createUser';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [createUser, { loading }] = useMutation(CREATE_USER, {
    onError: (error) => {
      if (error.message.includes('duplicate')) {
        setGeneralError('User already created');
      } else {
        setGeneralError('Error creating user');
      }
    },
  });

  const handleSignUp = async () => {
    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (!doPasswordsMatch(password, confirmPassword)) {
      setPasswordError('Passwords do not match');
      return;
    }

    try {
      const { data } = await createUser({ variables: { firstName, lastName, email, password } });
      if (data) {
        navigate('/auth');
      }
    } catch (error) {
      // Additional error handling if needed
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <IconButton onClick={() => navigate('/auth')} sx={{ margin: '10px', alignSelf: 'flex-start' }}>
        <ArrowBackIcon />
      </IconButton>

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          '& .MuiTextField-root, .MuiButton-root': { m: 1, width: '28ch' },
          overflow: 'auto', // Allows scrolling for smaller screens
        }}
      >
        <TextField label='First Name' variant='outlined' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <TextField label='Last Name' variant='outlined' value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <TextField
          error={!!emailError || !!generalError}
          helperText={emailError || generalError}
          label='Email'
          variant='outlined'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField label='Password' type='password' variant='outlined' value={password} onChange={(e) => setPassword(e.target.value)} />
        <TextField
          error={!!passwordError}
          helperText={passwordError}
          label='Confirm Password'
          type='password'
          variant='outlined'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button onClick={handleSignUp} variant='contained' disabled={loading}>
          Sign Up
        </Button>
      </Box>
    </div>
  );
};

export default SignUp;
