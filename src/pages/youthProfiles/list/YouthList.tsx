import React, { useState, useRef } from 'react';
import {
  Datagrid,
  DateField,
  TextField as Label,
  useTranslate,
  ListContextProvider,
  useListController,
} from 'react-admin';
import { TextInput, IconPlus } from 'hds-react';
import { useHistory, useLocation } from 'react-router';

import styles from './YouthList.module.css';

type SearchState = {
  firstName?: string;
  lastName?: string;
};

const YouthList = (props: unknown) => {
  const isInitialSearch = useRef<boolean>(true);
  const controllerProps = useListController(props);
  const { setFilters, filterValues, loading, total } = controllerProps;
  const location = useLocation();
  const history = useHistory();
  const t = useTranslate();
  const [search, setSearch] = useState<SearchState>(filterValues);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const field = e.target.name;

    setSearch((previousSearch) => ({
      ...previousSearch,
      [field]: value,
    }));
  };

  const onSearch = ({ firstName, lastName }: SearchState) => {
    setFilters({ firstName, lastName });

    isInitialSearch.current = false;
  };

  const isSearchCountVisible =
    !isInitialSearch.current || Object.keys(filterValues).length > 0;

  const show = (id: string) => `/youthProfiles/${id}/show${location.search}`;

  return (
    <ListContextProvider value={controllerProps}>
      <div>
        <div className={styles.actionRow}>
          <TextInput
            id="firstName"
            name="firstName"
            className={styles.textFieldFirstName}
            value={search.firstName || ''}
            onChange={onChange}
            labelText={t('youthProfiles.firstName')}
          />
          <TextInput
            id="lastName"
            name="lastName"
            className={styles.textFieldLastName}
            value={search.lastName || ''}
            onChange={onChange}
            labelText={t('youthProfiles.lastName')}
          />
          <button
            className={styles.search}
            onClick={() => {
              onSearch(search);
            }}
          >
            {t('youthProfiles.search')}
          </button>
          <button
            className={styles.create}
            onClick={() =>
              history.push(`/youthProfiles/create${location.search}`)
            }
          >
            <IconPlus />
            {t('youthProfiles.create')}
          </button>
        </div>

        {!loading && isSearchCountVisible && (
          <div className={styles.searchResultText}>
            {t('youthProfiles.searchResults', {
              /* eslint-disable @typescript-eslint/camelcase */
              smart_count: total,
            })}
          </div>
        )}

        <div className={styles.dataGrid}>
          <Datagrid rowClick={show} style={{ padding: '0 20px' }}>
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
        </div>
      </div>
    </ListContextProvider>
  );
};

export default YouthList;
