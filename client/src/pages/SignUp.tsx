import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { gql, useMutation } from '@apollo/client';
import Spinner from '../components/spinner'; // Import Spinner

const CREATE_USER = gql`
  mutation CreateUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      id
      firstName
      lastName
      email
    }
  }
`;

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [createUser, { loading, error }] = useMutation(CREATE_USER);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    try {
      const { data } = await createUser({ variables: { firstName, lastName, email, password } });
      if (data) {
        navigate('/auth');
      }
    } catch (error) {
      console.error('Error signing up:', error);
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
        '& .MuiTextField-root, .MuiButton-root': { m: 1, width: '28ch' },
      }}
    >
      <TextField label='First Name' variant='outlined' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <TextField label='Last Name' variant='outlined' value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <TextField label='Email' variant='outlined' value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label='Password' type='password' variant='outlined' value={password} onChange={(e) => setPassword(e.target.value)} />
      <TextField
        label='Confirm Password'
        type='password'
        variant='outlined'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button onClick={handleSignUp} variant='contained' disabled={loading}>
        Sign Up
      </Button>
      {error && <p>Error signing up: {error.message}</p>}
    </Box>
  );
};

export default SignUp;
