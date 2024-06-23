import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import axios from 'axios';

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  const dispatch = useDispatch();

  const handleLoginSuccess = async (tokenResponse) => {
    try {
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      });
      const userInfo = await userInfoResponse.json();

      const response = await axios.post('http://localhost:5000/auth/google', {
        name: userInfo.name,
        email: userInfo.email,
      }, {
        withCredentials: true,
      });

      dispatch(loginSuccess(userInfo));
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

  const login = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: handleLoginFailure,
  });

  return (
    <button onClick={login}>
      Login with Google
    </button>
  );
};

export default GoogleLoginButton;
