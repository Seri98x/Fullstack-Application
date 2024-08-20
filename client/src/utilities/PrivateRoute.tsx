// PrivateRoute.tsx
import { Outlet, Navigate } from 'react-router-dom';
const  PrivateRoute = () => {
  const token =  sessionStorage.getItem('token');
  const isAuthenticated = !!token;
  return isAuthenticated ? <Outlet /> : <Navigate to="login"  />;
};

export default PrivateRoute;
