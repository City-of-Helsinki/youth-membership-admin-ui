import React, { useState } from 'react';
import {
  Datagrid,
  DateField,
  Loading,
  TextField as Label,
  useDataProvider,
  useNotify,
  useTranslate,
} from 'react-admin';
import { TextInput } from 'hds-react';
import { useHistory } from 'react-router';

import styles from './YouthList.module.css';
import { Profile_profile as Profile } from '../../../graphql/generatedTypes';

type DatagridData = {
  [key: string]: Profile;
};

type SearchParams = {
  firstName: string;
  lastName: string;
};

const YouthList = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [queryCount, setQueryCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    firstName: '',
    lastName: '',
  });

  const history = useHistory();
  const notify = useNotify();
  const t = useTranslate();

  const dataProvider = useDataProvider();

  const transformData = () => {
    const dataObject: DatagridData = {};
    profiles.forEach((profile: Profile) => {
      dataObject[profile.id] = {
        ...profile,
        youthProfile: {
          ...profile.youthProfile,
          membershipStatus:
            profile.youthProfile?.membershipStatus &&
            t(`youthProfiles.${profile.youthProfile?.membershipStatus}`),
          photoUsageApproved: profile.youthProfile?.photoUsageApproved
            ? t('youthProfiles.approved')
            : t('youthProfiles.denied'),
          languageAtHome:
            profile.youthProfile?.languageAtHome &&
            t(`LANGUAGE_OPTIONS.${profile.youthProfile?.languageAtHome}`),
        },
      } as Profile;
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
      .then((result: { data: Profile[]; total: number }) => {
        setProfiles(result.data);
        setQueryCount(prevState => prevState + 1);
        setLoading(false);
      })
      .catch((error: Error) => {
        notify(t('ra.message.error'), 'warning');
      });
  };

  const onChange = (value: string, field: string) => {
    setSearchParams(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <div>
      <div className={styles.actionRow}>
        <TextInput
          id="firstName"
          className={styles.textFieldFirstName}
          value={searchParams.firstName}
          onChange={e => {
            const value = (e as React.ChangeEvent<HTMLInputElement>).target
              .value;
            onChange(value, 'firstName');
          }}
          labelText={t('youthProfiles.firstName')}
        />

        <TextInput
          id="lastName"
          className={styles.textFieldLastName}
          value={searchParams.lastName}
          onChange={e => {
            const value = (e as React.ChangeEvent<HTMLInputElement>).target
              .value;
            onChange(value, 'lastName');
          }}
          labelText={t('youthProfiles.lastName')}
        />
        <button
          className={styles.search}
          onClick={() => {
            setLoading(true);
            getProfiles();
          }}
        >
          {t('youthProfiles.search')}
        </button>
        <button
          className={styles.create}
          onClick={() => history.push('/youthProfiles/create')}
        >
          {t('youthProfiles.create')}
        </button>
      </div>

      {loading && <Loading />}

      {!loading && profiles.length > 0 && (
        <div className={styles.dataGrid}>
          <Datagrid
            data={transformData()}
            ids={profiles.map(({ id }) => id)}
            currentSort={{ field: 'id', order: 'ASC' }}
            basePath="/youthProfiles"
            rowClick="show"
            style={{ padding: '0 20px' }}
          >
            <Label source="firstName" label={t('youthProfiles.firstName')} />
            <Label source="lastName" label={t('youthProfiles.lastName')} />
            <DateField
              source="youthProfile.birthDate"
              label={t('youthProfiles.birthDateWithoutHelp')}
              locales="fi-FI"
            />

            <Label
              source="youthProfile.membershipNumber"
              label={t('youthProfiles.membershipNumber')}
            />

            <Label
              source="youthProfile.membershipStatus"
              label={t('youthProfiles.membershipStatus')}
            />
            <Label
              source="primaryPhone.phone"
              label={t('youthProfiles.phone')}
            />
            <Label
              source="youthProfile.photoUsageApproved"
              label={t('youthProfiles.photoUsage')}
            />
            <Label
              source="youthProfile.languageAtHome"
              label={t('youthProfiles.language')}
            />
          </Datagrid>

          {queryCount > 0 && (
            <div className={styles.searchResultText}>
              {t('youthProfiles.searchResults', {
                /* eslint-disable @typescript-eslint/camelcase */
                smart_count: profiles?.length,
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default YouthList;
