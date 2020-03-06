import React from 'react';
import { Route } from 'react-router';

import OidcCallback from './auth/components/oidcCallback/OidcCallback';
import CreateYouthProfile from './pages/youthProfiles/create/CreateYouthProfile';

export default [
  <Route exact path="/callback" component={OidcCallback} />,
  <Route exact path="/youthProfiles/create" component={CreateYouthProfile} />,
];
