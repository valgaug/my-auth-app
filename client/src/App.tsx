import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import SignUp from './pages/SignUp';
import Home from './pages/Home';

function App() {
  const isAuthenticated = true; // Placeholder for authentication status

  return (
    <Routes>
      <Route path='/auth' element={<Auth />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/' element={isAuthenticated ? <Home /> : <Navigate to='/auth' />} />
    </Routes>
  );
}

export default App;
