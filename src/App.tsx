import React from 'react';
import fakeDataProvider from 'ra-data-fakerest'; // TODO replace with an actual API data provider
import { Admin, Resource } from 'react-admin';
import { createBrowserHistory as createHistory } from 'history';

import i18nProvider from './i18n/i18nProvider';
import Login from './auth/components/login/Login';
import AppRoutes from './routes';
import authProvider from './auth/authProvider';
import Dashboard from './pages/dashboard/Dashboard';
import theme from './common/materialUI/themeConfig';

const history = createHistory();

const App: React.FC = () => {
  return (
    <Admin
      dataProvider={fakeDataProvider({})}
      i18nProvider={i18nProvider}
      history={history}
      authProvider={authProvider}
      theme={theme}
      customRoutes={AppRoutes}
      dashboard={Dashboard}
      loginPage={Login}
    >
      <Resource name="users" options={{ label: 'USERS' }} />
    </Admin>
  );
};

export default App;
