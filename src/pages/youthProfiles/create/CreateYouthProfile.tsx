import React from 'react';
import { useCreateController } from 'react-admin';

import CreateYouthForm from './form/CreateYouthForm';

const CreateYouthProfile: React.FC = () => {
  const fakeProps = {
    basePath: '/youthProfiles',
    resource: 'youthProfiles',
  };

  const { save, saving } = useCreateController(fakeProps);

  return <CreateYouthForm save={save} saving={saving} />;
};

export default CreateYouthProfile;
