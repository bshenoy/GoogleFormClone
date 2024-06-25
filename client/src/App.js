import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Form from './pages/Form';
import NotFound from './pages/NotFound';
import GoogleLoginButton from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './features/auth/authSlice'; // Update this path
import ThankYouPage from './pages/Thank';
import config from  "./config/envConfig.js";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
console.log("url is ",`${config.DOMAIN_URL}auth/check` )
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await axios.get(`${config.DOMAIN_URL}auth/check`, {
          withCredentials: true
        });

        if (response.data && response.data.authenticated) {
          if (response.data.responseData) {
            dispatch(loginSuccess(response.data.responseData)); // Dispatch action to store user data
          }
          if (response.data.isSumbitted){
            console.log("this is being aled- saved")
            navigate('/saved');
            setUserData(null)
            setLoggedIn(false);
          }
          else {
            setLoggedIn(true);
            setUserData(response.data.responseData);
            console.log("this is being aled- form")
            navigate('/form');
          }
   
        }
      } catch (error) {
        console.error('No active session', error);
      }
    };

    checkUserSession();
  }, [navigate, dispatch]);


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
          <Route path="/saved" element={<ThankYouPage/>}/>
          <Route path="/login" element={<GoogleLoginButton onSuccess={handleLoginSuccess} onFailure={handleLoginFailure} />} />
          <Route path="/form" element={<PrivateRoute isAuthenticated={loggedIn} element={() => <Form user={userData} />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
