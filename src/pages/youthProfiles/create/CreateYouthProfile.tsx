import React from 'react';
import { Create } from 'react-admin';

import CreateYouthForm from './form/CreateYouthForm';

const CreateYouthProfile: React.FC = () => {
  const fakeProps = {
    basePath: '/youthProfiles',
    resource: 'youthProfiles',
  };

  return (
    <Create {...fakeProps}>
      <CreateYouthForm />
    </Create>
  );
};

export default CreateYouthProfile;
