import React, { useState } from 'react';
import { Admin, useTranslate } from 'react-admin';
import { createBrowserHistory as createHistory } from 'history';
import countries from 'i18n-iso-countries';
import fi from 'i18n-iso-countries/langs/fi.json';

import i18nProvider from './i18n/i18nProvider';
import Login from './auth/components/login/Login';
import ProtectedResource from './auth/components/protectedResource/ProtectedResource';
import AppRoutes from './routes';
import authProvider from './auth/authProvider';
import Dashboard from './pages/dashboard/Dashboard';
import theme from './common/materialUI/themeConfig';
import dataProvider from './graphql/dataProvider';
import YouthList from './pages/youthProfiles/list/YouthList';
import YouthDetails from './pages/youthProfiles/show/YouthDetails';

countries.registerLocale(fi);

const history = createHistory();

const App: React.FC = () => {
  const t = useTranslate();

  const [externalUrlBool, setExternalUrl] = useState(false);

  const url = window.location.href;
  const redirectUrlExists = url.search('login');
  const isCallback = url.search('callback');
  // Ignore /login and /callback
  // Change state so we don't access this by accident when navigating around application
  if (redirectUrlExists === -1 && isCallback === -1 && !externalUrlBool) {
    const appPath = url.replace(process.env.REACT_APP_BASE_URL || '', '');
    localStorage.setItem('appPath', appPath);
    setExternalUrl(true);
  }

  return (
    <Admin
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      history={history}
      authProvider={authProvider}
      theme={theme}
      customRoutes={AppRoutes}
      dashboard={Dashboard}
      loginPage={Login}
    >
      <ProtectedResource
        name="youthProfiles"
        list={YouthList}
        show={YouthDetails}
        options={{ label: t('youthProfiles.title') }}
      />
    </Admin>
  );
};

export default App;
