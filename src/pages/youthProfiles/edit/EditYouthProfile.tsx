import React from 'react';
import {
  Loading,
  Error,
  useQuery,
  useEditController,
  useUpdate,
  useNotify,
} from 'react-admin';
import { useParams, useHistory, useLocation } from 'react-router';

import YouthProfileForm from '../form/YouthProfileForm';
import { FormValues } from '../types/youthProfileTypes';
import getAddressesFromNode from '../helpers/getAddressesFromNode';
import getAdditionalContactPersons from '../helpers/getAdditionalContactPersons';

type Params = {
  id?: string;
  method?: string;
};

const EditYouthProfile: React.FC = () => {
  const params: Params = useParams();
  const history = useHistory();
  const location = useLocation();
  const notify = useNotify();

  const [update] = useUpdate('youthProfiles');
  const { data, loading, error } = useQuery({
    type: 'getOne',
    resource: 'youthProfiles',
    payload: { id: params.id },
  });

  const fakeProps = {
    basePath: '/youthProfiles',
    resource: 'youthProfiles',
    id: params.id,
  };

  const { saving } = useEditController(fakeProps);

  if (loading) return <Loading />;
  if (!loading && error) return <Error error={error} />;

  const profile = data?.data?.profile;
  const additionalContactPersons = getAdditionalContactPersons(profile);

  const handleSave = (values: FormValues) => {
    update(
      {
        payload: {
          method: params.method,
          id: params.id,
          previousData: data,
          data: { ...values },
        },
      },
      {
        onSuccess: () => {
          const message =
            params.method === 'update'
              ? 'notifyMessages.updated'
              : 'notifyMessages.renewed';
          notify(message, 'info');
          history.push(`/youthProfiles/${params.id}/show/${location.search}`);
        },
        onFailure: () => {
          notify('ra.message.error', 'warning');
        },
      }
    );
  };

  return (
    <YouthProfileForm
      save={handleSave}
      saving={saving}
      method={params.method}
      profileID={profile.id}
      record={{
        firstName: profile.firstName,
        lastName: profile.lastName,
        primaryAddress: profile.primaryAddress,
        addresses: getAddressesFromNode(profile),
        email: profile.primaryEmail.email,
        phone: profile.primaryPhone.phone,
        birthDate: profile.youthProfile.birthDate,
        schoolName: profile.youthProfile.schoolName,
        schoolClass: profile.youthProfile.schoolClass,
        languageAtHome: profile.youthProfile.languageAtHome,
        profileLanguage: profile.language,
        photoUsageApproved: profile?.youthProfile?.photoUsageApproved?.toString(),
        approverFirstName: profile.youthProfile.approverFirstName,
        approverLastName: profile.youthProfile.approverLastName,
        approverEmail: profile.youthProfile.approverEmail,
        approverPhone: profile.youthProfile.approverPhone,
        additionalContactPersons,
      }}
    />
  );
};

export default EditYouthProfile;
