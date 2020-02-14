import React from 'react';
import fakeDataProvider from 'ra-data-fakerest'; // TODO replace with an actual API data provider
import { Admin } from 'react-admin';

const App: React.FC = () => {
  return <Admin dataProvider={fakeDataProvider({})} />;
};

export default App;
