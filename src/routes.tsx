import React from 'react';
import { Route } from 'react-router';

import OidcCallback from './auth/components/oidcCallback/OidcCallback';
import CreateYouthProfile from './pages/youthProfiles/create/CreateYouthProfile';
import EditYouthProfile from './pages/youthProfiles/edit/EditYouthProfile';

export default [
  <Route exact path="/callback" component={OidcCallback} />,
  <Route exact path="/youthProfiles/create" component={CreateYouthProfile} />,
  <Route exact path="/youthProfiles/:id" component={EditYouthProfile} />,
];
