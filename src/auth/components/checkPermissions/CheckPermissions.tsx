import React from 'react';
import { useTranslate } from 'react-admin';
import { Redirect } from 'react-router';

import useAuthorized from '../../useAuthorized';

type Props = {
  redirectTo?: string;
};

// This component is loaded after the user has been logged in. It'll
// render a placeholder graphic until authorization has been checked.
//
// react-admin renders pages optimistically when it comes to
// authorization. It uses authProvider.getPermissions to attain
// knowledge of current authorization. In brief, react-admin will render
// the admin UI before it knows what the result of getPermissions is.
//
// If we redirect the user directly into a page that hooks up into the
// react-admin layout, the admin UI will be flashed to them before the
// authorization routine is completed. By using this component in a
// noLayout route, we are able to stop the admin UI from being flashed
// to users who should not have access.
const CheckPermissions = ({ redirectTo = '/' }: Props) => {
  const checkingAuthorization = useAuthorized();
  const t = useTranslate();

  if (checkingAuthorization) {
    return <p>{t('oidc.authenticating')}</p>;
  }

  return <Redirect to={redirectTo} />;
};

export default CheckPermissions;
