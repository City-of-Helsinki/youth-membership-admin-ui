import React, { useEffect } from 'react';
import { useTranslate } from 'react-admin';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { useHistory } from 'react-router';

import useAuthorized from '../../auth/useAuthorized';

const JassariDashboard = () => {
  useAuthorized();
  const t = useTranslate();

  const history = useHistory();

  const redirectPath = localStorage.getItem('redirectPath');

  useEffect(() => {
    if (redirectPath) {
      localStorage.removeItem('redirectPath');
      history.push(`/${redirectPath}`);
    }
  }, [history, redirectPath]);

  return (
    <Card>
      <CardHeader title={t('dashboard.title')} />
    </Card>
  );
};

export default JassariDashboard;
