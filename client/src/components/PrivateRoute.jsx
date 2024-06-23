import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, element: Component }) => {
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
