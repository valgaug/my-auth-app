import React from 'react';
import { Formik, Form, Field } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const Login: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        '& .MuiTextField-root': { margin: 1, width: '25ch' },
        '& .MuiButton-root': { margin: 1 },
      }}
    >
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values, { setSubmitting }) => {
          // Handle the form submission
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field as={TextField} name='username' label='Username' variant='outlined' />
            <Field as={TextField} name='password' label='Password' type='password' variant='outlined' />
            <Button type='submit' variant='contained' color='primary' disabled={isSubmitting}>
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
