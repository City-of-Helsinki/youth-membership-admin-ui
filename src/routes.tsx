import React from 'react';
import { Route } from 'react-router';

import OidcCallback from './auth/components/oidcCallback/OidcCallback';

export default [<Route exact path="/callback" component={OidcCallback} />];
