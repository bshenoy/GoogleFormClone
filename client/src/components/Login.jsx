import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  const dispatch = useDispatch();

  const handleLoginSuccess = async (tokenResponse) => {
    try {
      // Fetch user info using the token
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      });

      const userInfo = await userInfoResponse.json();
      dispatch(loginSuccess(userInfo)); // Dispatch login success action with user info
      onSuccess(userInfo); // Pass user info to parent component
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
