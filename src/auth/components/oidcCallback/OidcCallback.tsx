import React from 'react';
import { useTranslate, useNotify } from 'react-admin';
import { CallbackComponent } from 'redux-oidc';
import { User } from 'oidc-client';
import { RouteChildrenProps } from 'react-router';

import userManager from '../../userManager';
import fetchApiToken from '../../fetchApiToken';

function OidcCallBack(props: RouteChildrenProps) {
  const t = useTranslate();
  const notify = useNotify();

  const onSuccess = (user: User) => {
    // TODO add fetchApiToken
    fetchApiToken(user.access_token)
      .then(apiToken => {
        localStorage.setItem('apiToken', apiToken);
        props.history.push('/');
      })
      .catch(error => {
        notify(t('ra.message.error'), 'warning');
        // Todo add Sentry
      });
  };

  const onError = (error: Error) => {
    notify(t('ra.message.error'), 'warning');
    // Todo add Sentry
  };

  return (
    <CallbackComponent
      successCallback={onSuccess}
      errorCallback={onError}
      userManager={userManager}
    >
      <p>{t('oidc.authenticating')}</p>
    </CallbackComponent>
  );
}

export default OidcCallBack;
