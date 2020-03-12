import React from 'react';
import { Admin, Resource, useTranslate } from 'react-admin';
import { createBrowserHistory as createHistory } from 'history';

import i18nProvider from './i18n/i18nProvider';
import Login from './auth/components/login/Login';
import AppRoutes from './routes';
import authProvider from './auth/authProvider';
import Dashboard from './pages/dashboard/Dashboard';
import theme from './common/materialUI/themeConfig';
import dataProvider from './graphql/dataProvider';
import YouthList from './pages/youthProfiles/list/YouthList';
import YouthDetails from './pages/youthProfiles/show/YouthDetails';

const history = createHistory();

const App: React.FC = () => {
  const t = useTranslate();
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
      <Resource
        name="youthProfiles"
        list={YouthList}
        show={YouthDetails}
        options={{ label: t('youthProfiles.title') }}
      />
    </Admin>
  );
};

export default App;
