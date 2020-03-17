import React from 'react';
import { useTranslate, useNotify } from 'react-admin';
import { CallbackComponent } from 'redux-oidc';
import { User } from 'oidc-client';
import { RouteChildrenProps } from 'react-router';
import * as Sentry from '@sentry/browser';

import userManager from '../../userManager';
import fetchApiToken from '../../fetchApiToken';

function OidcCallBack(props: RouteChildrenProps) {
  const t = useTranslate();
  const notify = useNotify();

  const onSuccess = (user: User) => {
    fetchApiToken(user.access_token)
      .then(apiToken => {
        localStorage.setItem('apiToken', apiToken);
        props.history.push('/');
      })
      .catch((error: Error) => {
        Sentry.captureException(error);
        notify(t('ra.message.error'), 'warning');
      });
  };

  const onError = (error: Error) => {
    Sentry.captureException(error);
    notify(t('ra.message.error'), 'warning');
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
