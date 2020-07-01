import countries from 'i18n-iso-countries';

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
  const address = profile?.primaryAddress;
  const countryCode = countries.getName(
    profile?.primaryAddress?.countryCode || 'fi',
    'fi'
  );
  return [address.address, address.postalCode, address.city, countryCode]
    .filter((addressPart) => addressPart)
    .join(', ');
};

const getSchool = (profile: Profile | undefined) => {
  const schoolName = profile?.youthProfile?.schoolName;
  const schoolClass = profile?.youthProfile?.schoolClass;
  if (!schoolClass && !schoolName) return ' - ';
  return `${schoolName || ''}${schoolName && schoolClass ? ', ' : ''}${
    schoolClass || ''
  }`;
};

export { getName, getAddress, getSchool };
