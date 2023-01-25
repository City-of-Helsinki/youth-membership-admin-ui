import React, { useCallback, useEffect, useState } from 'react';
import { useDataProvider, useTranslate, Loading, Error } from 'react-admin';
import { ReactAdminComponentPropsWithId } from 'ra-core';
import { ArrowBack, CheckCircle, Cancel } from '@material-ui/icons';
import { useHistory, useLocation, useParams } from 'react-router';
import { format } from 'date-fns';
import countries from 'i18n-iso-countries';

import {
  Profile_profile as Profile,
  Profile_profile_addresses_edges_node as Address,
} from '../../../graphql/generatedTypes';
import { getName, getSchool, getAddress } from '../helpers/utils';
import getAdditionalContactPersons from '../helpers/getAdditionalContactPersons';
import styles from './YouthDetails.module.css';
import getAddressesFromNode from '../helpers/getAddressesFromNode';

type LabelProps = {
  label: string;
  value: string | undefined | null;
};

const Label = ({ value, label }: LabelProps) => {
  return (
    <div className={styles.label}>
      <p className={styles.labelTitle}>{label}</p>
      <p className={styles.labelValue}>{value}</p>
    </div>
  );
};

type ApproverProps = {
  name: string;
  email?: string | null;
  phone?: string | null;
  languageAtHome?: string | null;
};

const Approver = ({ name, email, phone, languageAtHome }: ApproverProps) => {
  const t = useTranslate();

  return (
    <>
      <div className={styles.row}>
        <Label value={name} label={t('youthProfiles.name')} />
        <Label value={email || ' - '} label={t('youthProfiles.email')} />
      </div>
      <div className={styles.row}>
        <Label value={phone || ' - '} label={t('youthProfiles.phone')} />
        {languageAtHome && (
          <Label
            label={t('youthProfiles.languageAtHome')}
            value={t(`LANGUAGE_OPTIONS.${languageAtHome}`)}
          />
        )}
      </div>
    </>
  );
};

type Params = {
  id?: string;
};

const YouthDetails = (props: ReactAdminComponentPropsWithId) => {
  const [profile, setProfile] = useState<Profile>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();

  const t = useTranslate();
  const history = useHistory();
  const location = useLocation();
  const params: Params = useParams();
  const dataProvider = useDataProvider();

  const getProfile = useCallback(() => {
    dataProvider
      .getOne('youthProfiles', {
        id: params.id,
      })
      .then((result: { data: { data: { profile: Profile } } }) => {
        setProfile(result.data.data.profile);
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(error);
      });
  }, [dataProvider, params.id]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const getAdditionalAddresses = (address: Address) => {
    const country = countries.getName(address.countryCode || 'FI', 'FI');
    return [address.address, address.postalCode, address.city, country]
      .filter((addressPart) => addressPart)
      .join(', ');
  };

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  const addresses = getAddressesFromNode(profile);
  const additionalContactPersons = getAdditionalContactPersons(profile);

  return (
    <div className={styles.wrapper}>
      <div className={styles.goBack}>
        <button
          className={styles.labelValue}
          onClick={() => history.push(`/youthProfiles${location.search}`)}
        >
          <ArrowBack className={styles.icon} />
          {t('youthProfiles.back')}
        </button>
        <div className={styles.editButtons}>
          <button
            className={styles.button}
            onClick={() =>
              history.push(
                `/youthProfiles/${params.id}/update${location.search}`
              )
            }
          >
            {t('youthProfiles.edit')}
          </button>
          {profile?.youthProfile?.renewable && (
            <button
              className={styles.button}
              onClick={() =>
                history.push(
                  `/youthProfiles/${params.id}/renew${location.search}`
                )
              }
            >
              {t('youthProfiles.renew')}
            </button>
          )}
        </div>
      </div>
      <h3>{t('youthProfiles.basicInfo')}</h3>
      <div className={styles.row}>
        <Label
          value={getName(profile, 'youth')}
          label={t('youthProfiles.name')}
        />
        <Label value={getAddress(profile)} label={t('youthProfiles.address')} />
        {addresses.map((address, index) => (
          <Label
            key={index}
            label={t('youthProfiles.address')}
            value={getAdditionalAddresses(address)}
          />
        ))}
      </div>

      <div className={styles.row}>
        <Label
          value={profile?.primaryEmail?.email || ' - '}
          label={t('youthProfiles.email')}
        />
        <Label
          value={profile?.primaryPhone?.phone || ' - '}
          label={t('youthProfiles.phone')}
        />
      </div>

      <div className={styles.row}>
        <Label
          value={
            profile?.youthProfile?.birthDate &&
            format(new Date(profile?.youthProfile?.birthDate), 'dd.MM.yyyy')
          }
          label={t('youthProfiles.birthDateWithoutHelp')}
        />

        <Label
          label={t('youthProfiles.profileLanguage')}
          value={t(`LANGUAGE_OPTIONS.${profile?.language}`)}
        />
      </div>

      <h3>{t('youthProfiles.extraInfo')}</h3>
      <div className={styles.row}>
        <Label value={getSchool(profile)} label={t('youthProfiles.school')} />
      </div>

      <h3>{t('youthProfiles.membershipInformation')}</h3>
      <div className={styles.row}>
        <Label
          label={t('youthProfiles.membershipNumber')}
          value={profile?.youthProfile?.membershipNumber}
        />
        <Label
          label={t('youthProfiles.membershipStatus')}
          value={t(`PROFILE_STATUS.${profile?.youthProfile?.membershipStatus}`)}
        />
      </div>

      <div className={styles.row}>
        <Label
          label={t('youthProfiles.expirationDate')}
          value={
            profile?.youthProfile?.expiration &&
            format(new Date(profile?.youthProfile?.expiration), 'dd.MM.yyyy')
          }
        />
      </div>

      <h3>{t('youthProfiles.photoUsage')}</h3>
      <p>{t('youthProfiles.photoUsageHelpText')}</p>
      <div className={styles.row}>
        <div className={styles.label}>
          <p className={styles.labelTitle}>{t('youthProfiles.photoUsage')}</p>
          <p className={styles.labelValue}>
            {profile?.youthProfile?.photoUsageApproved ? (
              <React.Fragment>
                <CheckCircle color="primary" className={styles.icon} />
                {t('youthProfiles.photoApprovedTrue')}
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Cancel color="primary" className={styles.icon} />
                {t('youthProfiles.photoApprovedFalse')}
              </React.Fragment>
            )}
          </p>
        </div>
      </div>

      <h3>{t('youthProfiles.approverInfo')}</h3>
      <p className={styles.approverDescriptions}>
        {t('youthProfiles.guardianConfirmationSent')}
      </p>
      <Approver
        name={getName(profile, 'approver')}
        email={profile?.youthProfile?.approverEmail}
        phone={profile?.youthProfile?.approverPhone}
        languageAtHome={profile?.youthProfile?.languageAtHome}
      />
      {additionalContactPersons.length > 0 && (
        <p className={styles.approverDescriptions}>
          {t('youthProfiles.addGuardiansText')}
        </p>
      )}
      {additionalContactPersons.map(({ firstName, lastName, phone, email }) => (
        <Approver
          key={[firstName, lastName, phone, email].join('')}
          name={[firstName, lastName].join(' ')}
          email={email}
          phone={phone}
        />
      ))}
    </div>
  );
};

export default YouthDetails;
