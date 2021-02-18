import React, { useEffect } from 'react';
import { useTranslate, useNotify } from 'react-admin';
import { RouteComponentProps } from 'react-router';
import * as Sentry from '@sentry/browser';

import authService from '../../authService';

function OidcCallBack({ history }: RouteComponentProps) {
  const t = useTranslate();
  const notify = useNotify();

  useEffect(() => {
    authService
      .endLogin()
      .then((user) => {
        history.replace(user?.state.path);
      })
      .catch((error) => {
        Sentry.captureException(error);
        notify(t('ra.message.error'), 'warning');
      });
  }, [history, notify, t]);

  return <p>{t('oidc.authenticating')}</p>;
}

export default OidcCallBack;
