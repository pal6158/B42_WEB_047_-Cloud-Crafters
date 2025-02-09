import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext); 

  if (!user) {
    // If the user is not logged in, redirect to login
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
