import React, { useState } from 'react';
import {
  useDataProvider,
  useTranslate,
  Button,
  Datagrid,
  TextField as Label,
  DateField,
  useNotify,
  Loading,
} from 'react-admin';
import { TextField } from '@material-ui/core';

import { Profile_profile as Profile } from '../../../graphql/generatedTypes';

type DatagridData = {
  [key: string]: Profile;
};

const YouthList = () => {
  const [profiles, setProfiles] = useState<Array<Profile>>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    firstName: '',
    lastName: '',
  });

  const notify = useNotify();
  const t = useTranslate();

  const dataProvider = useDataProvider();

  const transformData = () => {
    const dataObject: DatagridData = {};
    profiles.forEach((profile: Profile) => {
      dataObject[profile.id] = profile;
    });
    return dataObject;
  };

  const checkSearchParams = () => {
    return searchParams.firstName || searchParams.lastName;
  };

  // At this point we dont want search to return all found profiles,
  // so to prevent that happening add dummy data to search parameters
  const getProfiles = () => {
    dataProvider
      .getList('youthProfiles', {
        firstName: checkSearchParams() ? searchParams.firstName : 'dummy',
        lastName: checkSearchParams() ? searchParams.lastName : 'data',
      })
      .then((result: { data: Array<Profile> }) => {
        setProfiles(result.data);
        setLoading(false);
      })
      .catch((error: Error) => {
        notify(t('ra.message.error'), 'warning');
      });
  };

  return (
    <div>
      <TextField
        value={searchParams.firstName}
        label={t('youthProfiles.firstName')}
        onChange={e =>
          setSearchParams({ ...searchParams, firstName: e.target.value })
        }
      />
      <TextField
        value={searchParams.lastName}
        label={t('youthProfiles.lastName')}
        onChange={e =>
          setSearchParams({ ...searchParams, lastName: e.target.value })
        }
      />
      <Button
        label={t('youthProfiles.search')}
        onClick={() => {
          setLoading(true);
          getProfiles();
        }}
      />

      {loading && <Loading />}

      {!loading && profiles.length > 0 && (
        <Datagrid
          data={transformData()}
          ids={profiles.map(({ id }) => id)}
          currentSort={{ field: 'id', order: 'ASC' }}
        >
          <Label source="firstName" label={t('youthProfiles.firstName')} />
          <Label source="lastName" label={t('youthProfiles.lastName')} />
          <DateField
            source="youthProfile.birthDate"
            label={t('youthProfiles.birthDate')}
            locales="fi-FI"
          />
          <Label
            source="youthProfile.membershipNumber"
            label={t('youthProfiles.membershipNumber')}
          />
          <Label source="primaryPhone.phone" label={t('youthProfiles.phone')} />
          <Label
            source="youthProfile.photoUsageApproved"
            label={t('youthProfiles.photoUsage')}
          />
          <Label
            source="youthProfile.languageAtHome"
            label={t('youthProfiles.language')}
          />
        </Datagrid>
      )}
    </div>
  );
};

export default YouthList;
