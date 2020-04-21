import React from 'react';
import { Loading, Error, useQuery, useEditController } from 'react-admin';
import { useParams } from 'react-router';

import YouthProfileForm from '../form/YouthProfileForm';

type Params = {
  id?: string;
};

const EditYouthProfile: React.FC = () => {
  const params: Params = useParams();

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

  const { save, saving } = useEditController(fakeProps);

  if (loading) return <Loading />;
  if (!loading && error) return <Error error={error} />;
  const profile = data?.data?.profile;

  return (
    <YouthProfileForm
      save={save}
      saving={saving}
      record={{
        firstName: profile.firstName,
        lastName: profile.lastName,
        address: profile.primaryAddress.address,
        city: profile.primaryAddress.city,
        postalCode: profile.primaryAddress.postalCode,
        email: profile.primaryEmail.email,
        phone: profile.primaryPhone.phone,
        birthDate: profile.youthProfile.birthDate,
        schoolName: profile.youthProfile.schoolName,
        schoolClass: profile.youthProfile.schoolClass,
        languageAtHome: profile.youthProfile.languageAtHome,
        profileLanguage: profile.language,
        photoUsageApproved: profile.youthProfile.photoUsageApproved.toString(),
        approverFirstName: profile.youthProfile.approverFirstName,
        approverLastName: profile.youthProfile.approverLastName,
        approverEmail: profile.youthProfile.approverEmail,
        approverPhone: profile.youthProfile.approverPhone,
      }}
    />
  );
};

export default EditYouthProfile;
