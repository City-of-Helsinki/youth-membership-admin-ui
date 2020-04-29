import React from 'react';
import { useCreateController, useCreate, useNotify } from 'react-admin';
import { useHistory, useLocation } from 'react-router';

import YouthProfileForm from '../form/YouthProfileForm';
import { FormValues } from '../types/youthProfileTypes';
import { CreateProfile } from '../../../graphql/generatedTypes';

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

  type ProfileCreated = {
    data: {
      data: CreateProfile;
    };
  };

  const handleCreate = (values: FormValues) => {
    create(
      {
        payload: {
          data: values,
        },
      },
      {
        onSuccess: ({ data: newRecord }: ProfileCreated) => {
          notify('notifyMessages.created', 'info');
          history.push(
            `/youthProfiles/${newRecord?.data?.createProfile?.profile?.id}/show/${location.search}`
          );
        },
      }
    );
  };

  return <YouthProfileForm save={handleCreate} saving={saving} />;
};

export default CreateYouthProfile;
