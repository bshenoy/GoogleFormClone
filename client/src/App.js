import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Form from './pages/Form';
import NotFound from './pages/NotFound';
import GoogleLoginButton from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/check', {
          withCredentials: true
        });
        if (response.data.authenticated) {
          setUserData(response.data.userId);
          setLoggedIn(true);
        }
      } catch (error) {
        console.error('No active session', error);
      }
    };

    checkUserSession();
  }, []);

  const handleLoginSuccess = (response) => {
    setLoggedIn(true);
    setUserData(response);
    navigate('/form');
  };

  const handleLoginFailure = (error) => {
    console.error('Login failed', error);
  };

  return (
    <GoogleOAuthProvider clientId="989895428699-6t20qvg7app1vvupl16cb5do2jra92rd.apps.googleusercontent.com">
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<GoogleLoginButton onSuccess={handleLoginSuccess} onFailure={handleLoginFailure} />} />
          <Route path="/form" element={<PrivateRoute isAuthenticated={loggedIn} element={() => <Form userData={userData} />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
