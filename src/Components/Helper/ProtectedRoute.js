import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';

// rota protegida ja no padrao v6 do react-router-dom

const ProtectedRoute = (props) => {
  const { login } = React.useContext(UserContext);

  if (login === true) return props.children;
  else if (login === false) return <Navigate to='/login' />;
  else return null;
};

export default ProtectedRoute;
