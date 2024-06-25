import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import axios from 'axios';
import './GoogleLoginButton.css'; // Import custom CSS file for styles
import config from "../config/envConfig";

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  const dispatch = useDispatch();

  const handleLoginSuccess = async (tokenResponse) => {
    try {
      // Fetch user info from Google API
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      });
      const userInfo = await userInfoResponse.json();

      // Send user info to backend for authentication
      const response = await axios.post(`${config.DOMAIN_URL}auth/google`, {
        name: userInfo.name,
        email: userInfo.email,
      }, {
        withCredentials: true,
      });

      // Dispatch action to store user info in Redux state
      dispatch(loginSuccess(userInfo));

      // Call onSuccess callback provided by parent component
      onSuccess(userInfo);
    } catch (error) {
      console.error('Error fetching user info', error);
      onFailure(error);
    }
  };

  const handleLoginFailure = (error) => {
    console.error('Login failed', error);
    onFailure(error);
  };

  // Use useGoogleLogin hook to initiate Google OAuth flow
  const login = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: handleLoginFailure,
  });

  return (
    <div className="login-container">
      <div className="login-content">
        <h2>Welcome to the Quick Form Portal!</h2>
        <p>Please log in using your Gmail ID to proceed with the application process.</p>
        <button onClick={login} className="login-button">
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default GoogleLoginButton;
