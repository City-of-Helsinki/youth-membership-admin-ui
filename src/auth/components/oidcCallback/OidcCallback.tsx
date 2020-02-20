import React from 'react';
import { CallbackComponent } from 'redux-oidc';
import { User } from 'oidc-client';
import { RouteChildrenProps } from 'react-router';

import userManager from '../../userManager';
import fetchApiToken from '../../fetchApiToken';

function OidcCallBack(props: RouteChildrenProps) {
  const onSuccess = (user: User) => {
    // TODO add fetchApiToken
    fetchApiToken(user.access_token)
      .then(apiToken => {
        localStorage.setItem('apiToken', apiToken);
        props.history.push('/');
      })
      .catch(error => {
        // Todo add error handling & Sentry
      });
  };

  const onError = (error: Error) => {
    // Add error handling + Sentry
  };

  return (
    <CallbackComponent
      successCallback={onSuccess}
      errorCallback={onError}
      userManager={userManager}
    >
      <p>Tunnishayut</p>
    </CallbackComponent>
  );
}

export default OidcCallBack;
