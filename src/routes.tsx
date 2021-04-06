import React from 'react';
import { Route } from 'react-router';

import OidcCallback from './auth/components/oidcCallback/OidcCallback';
import CreateYouthProfile from './pages/youthProfiles/create/CreateYouthProfile';
import EditYouthProfile from './pages/youthProfiles/edit/EditYouthProfile';
import YouthDetails from './pages/youthProfiles/show/YouthDetails';
import Logout from './auth/Logout';
import NotAuthorized from './auth/components/notAuthorized/NotAuthorized';
import ProtectedRoute from './auth/components/protectedRoute/ProtectedRoute';
import CheckPermissions from './auth/components/checkPermissions/CheckPermissions';

const routes = [
  <Route exact path="/callback" component={OidcCallback} noLayout />,
  <ProtectedRoute
    exact
    path="/youthProfiles/create"
    component={CreateYouthProfile}
  />,
  <ProtectedRoute
    exact
    path="/youthProfiles/:id/show"
    component={YouthDetails}
  />,
  <Route exact path="/logout" component={Logout} noLayout />,
  <ProtectedRoute
    exact
    path="/youthProfiles/:id/:method"
    component={EditYouthProfile}
  />,
  <Route exact path="/not-authorized" component={NotAuthorized} noLayout />,
  <Route
    exact
    path="/check-permissions"
    component={CheckPermissions}
    noLayout
  />,
];

export default routes;
