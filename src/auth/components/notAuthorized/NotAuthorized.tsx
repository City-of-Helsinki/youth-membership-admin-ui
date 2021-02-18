import React from 'react';
import { useTranslate, useAuthProvider } from 'react-admin';
import { Button, Card, CardContent } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';

import theme from '../../../common/materialUI/themeConfig';

const useStyles = makeStyles({
  // This styling reproduces the style of the login page.
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    height: '1px',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '6em',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundImage:
      'radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%)',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  button: {
    marginTop: '1rem',
    width: '100%',
  },
  description: {
    maxWidth: '400px',
    fontWeight: 'normal',
    lineHeight: 1.4,
  },
});

const NotAuthorizedPage: React.FC = () => {
  const classes = useStyles();
  const t = useTranslate();
  const authProvider = useAuthProvider();

  const handleLogout = async () => {
    await authProvider.logout();
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.main}>
        <Card>
          <CardContent>
            <div className={classes.container}>
              <p>{t('dashboard.title')}</p>
              <p className={classes.description}>
                {t('authorization.notAuthorized')}
              </p>
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={handleLogout}
              >
                {t('ra.auth.logout')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
};

export default NotAuthorizedPage;
