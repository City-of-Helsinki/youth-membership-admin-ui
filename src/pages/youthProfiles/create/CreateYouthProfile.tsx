import React from 'react';
import { useCreateController, useCreate, useNotify } from 'react-admin';
import { useHistory, useLocation } from 'react-router';

import YouthProfileForm from '../form/YouthProfileForm';
import { FormValues } from '../types/youthProfileTypes';

const CreateYouthProfile: React.FC = () => {
  const [create] = useCreate('youthProfiles');
  const notify = useNotify();
  const history = useHistory();
  const location = useLocation();
  const fakeProps = {
    basePath: '/youthProfiles',
    resource: 'youthProfiles',
  };

  const { saving } = useCreateController(fakeProps);

  const handleCreate = (values: FormValues) => {
    create(
      {
        payload: {
          data: values,
        },
      },
      {
        onSuccess: ({ data }: any) => {
          notify('ra.notification.created', 'info');
          history.push(
            `/youthProfiles/${data.newRecord.data.createProfile.profile.id}/show/${location.search}`
          );
        },
      }
    );
  };

  return <YouthProfileForm save={handleCreate} saving={saving} />;
};

export default CreateYouthProfile;
