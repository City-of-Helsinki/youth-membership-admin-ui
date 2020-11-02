import React from 'react';
import { useTranslate, useNotify, useDataProvider } from 'react-admin';
import { CallbackComponent } from 'redux-oidc';
import { User } from 'oidc-client';
import { RouteChildrenProps } from 'react-router';
import * as Sentry from '@sentry/browser';

import userManager from '../../userManager';
import fetchApiTokens from '../../fetchApiTokens';
import { RoleResponse } from '../../api/api';

const handleRoleResponse = (roleResponse: RoleResponse) =>
  roleResponse.data.role;

function OidcCallBack(props: RouteChildrenProps) {
  const t = useTranslate();
  const notify = useNotify();
  const dataProvider = useDataProvider();

  const onSuccess = async (user: User) => {
    try {
      const apiToken = await fetchApiTokens(user.access_token);
      const stringToken = JSON.stringify(apiToken);
      const role = handleRoleResponse(await dataProvider.getRole(stringToken));

      localStorage.setItem('apiToken', JSON.stringify(apiToken));
      localStorage.setItem('permissions', role);

      // Send user to check permissions in order to allow permissions
      // checks to complete before asking for react-admin to render its
      // admin UI.
      props.history.push('/check-permissions');
    } catch (error) {
      Sentry.captureException(error);
      notify(t('ra.message.error'), 'warning');
    }
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
