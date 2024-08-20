// PrivateRoute.tsx
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../store/authSlice';

const  PrivateRoute = () => {
  const token =  sessionStorage.getItem('token');
  const isAuthenticated = !!token;
  return isAuthenticated ? <Outlet /> : <Navigate to="login"  />;
};

export default PrivateRoute;
