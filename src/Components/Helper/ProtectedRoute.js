import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';

const ProtectedRoute = (props) => {
  const { login } = React.useContext(UserContext);
  console.log(props.children);

  if (login === true) return props.children;
  else if (login === false) return <Navigate to='/login' />;
  else return null;
};

export default ProtectedRoute;
