import React from 'react';
import { useTranslate } from 'react-admin';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { useHistory } from 'react-router';

import useAuthorized from '../../auth/useAuthorized';

export default () => {
  useAuthorized();
  const t = useTranslate();

  const history = useHistory();

  const redirectPath = localStorage.getItem('appPath');

  if (redirectPath) {
    localStorage.removeItem('appPath');
    history.push(`/${redirectPath}`);
  }

  return (
    <Card>
      <CardHeader title={t('dashboard.title')} />
    </Card>
  );
};
