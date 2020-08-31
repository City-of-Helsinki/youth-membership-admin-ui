import React from 'react';
import { Route, RouteProps } from 'react-router';
import { useAuthenticated } from 'react-admin';

import useAuthorized from '../../useAuthorized';

const ProtectedRoute = (props: RouteProps) => {
  useAuthenticated();
  useAuthorized();

  return <Route {...props} />;
};

export default ProtectedRoute;
