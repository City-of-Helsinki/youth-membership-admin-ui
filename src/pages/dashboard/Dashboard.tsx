import React from 'react';
import { useTranslate } from 'react-admin';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

export default () => {
  const t = useTranslate();
  return (
    <Card>
      <CardHeader title={t('dashboard.title')} />
    </Card>
  );
};
