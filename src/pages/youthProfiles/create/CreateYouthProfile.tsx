import React from 'react';
import { useCreateController } from 'react-admin';

import YouthProfileForm from '../form/YouthProfileForm';

const CreateYouthProfile: React.FC = () => {
  const fakeProps = {
    basePath: '/youthProfiles',
    resource: 'youthProfiles',
  };

  const { save, saving } = useCreateController(fakeProps);

  return <YouthProfileForm save={save} saving={saving} />;
};

export default CreateYouthProfile;
