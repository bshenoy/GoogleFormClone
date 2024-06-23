import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Form from './pages/Form';
import NotFound from './pages/NotFound';
import GoogleLoginButton from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); // Add useNavigate hook

  const handleLoginSuccess = (response) => {
    setLoggedIn(true);
    setUserData(response);
    navigate('/home'); // Navigate to home on successful login
  };

  const handleLoginFailure = (error) => {
    console.error('Login failed', error);
  };

  return (
    <GoogleOAuthProvider clientId="989895428699-6t20qvg7app1vvupl16cb5do2jra92rd.apps.googleusercontent.com">
      <div>
        {/* Google Login Button */}
        {!loggedIn && <GoogleLoginButton onSuccess={handleLoginSuccess} onFailure={handleLoginFailure} />}

        {/* Routes */}
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<GoogleLoginButton onSuccess={handleLoginSuccess} onFailure={handleLoginFailure} />} />

          {/* Private routes */}
          <Route path="/home" element={<PrivateRoute isAuthenticated={loggedIn} element={() => <Home userData={userData} />} />} />

          <Route path="/form" element={<PrivateRoute isAuthenticated={loggedIn} element={Form} />} />

          {/* Not Found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
