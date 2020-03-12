import { Profile_profile as Profile } from '../../../graphql/generatedTypes';

const getName = (data: Profile | undefined, field: string) => {
  const firstName =
    field === 'youth' ? data?.firstName : data?.youthProfile?.approverFirstName;
  const lastName =
    field === 'youth' ? data?.lastName : data?.youthProfile?.approverLastName;

  if (!firstName && !lastName) return ' - ';
  return `${firstName} ${lastName}`;
};

const getAddress = (profile: Profile | undefined) => {
  if (!profile?.primaryAddress) return ' - ';
  const address = profile?.primaryAddress?.address;
  const postalCode = profile?.primaryAddress?.postalCode;
  const city = profile?.primaryAddress?.city;
  return `${address}${
    address && (postalCode || city) ? ', ' : ''
  }${postalCode} ${city}`;
};

const getSchool = (profile: Profile | undefined) => {
  const schoolName = profile?.youthProfile?.schoolName;
  const schoolClass = profile?.youthProfile?.schoolClass;
  if (!schoolClass && !schoolName) return ' - ';
  return `${schoolName}${schoolClass ? ', ' : ''}${schoolClass}`;
};

export { getName, getAddress, getSchool };
