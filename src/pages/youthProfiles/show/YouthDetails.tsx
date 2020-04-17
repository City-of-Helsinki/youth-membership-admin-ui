import React, { useCallback, useEffect, useState } from 'react';
import {
  useDataProvider,
  useMutation,
  useNotify,
  useTranslate,
  Loading,
  Error,
} from 'react-admin';
import { ReactAdminComponentPropsWithId } from 'ra-core';
import { ArrowBack, CheckCircle, Cancel } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router';
import { format } from 'date-fns';

import { Profile_profile as Profile } from '../../../graphql/generatedTypes';
import { getName, getSchool, getAddress } from '../helpers/utils';
import styles from './YouthDetails.module.css';

const YouthDetails = (props: ReactAdminComponentPropsWithId) => {
  const [profile, setProfile] = useState<Profile>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();

  const notify = useNotify();
  const t = useTranslate();
  const history = useHistory();
  const location = useLocation();
  const dataProvider = useDataProvider();

  const getProfile = useCallback(() => {
    dataProvider
      .getOne('youthProfiles', {
        id: props.id,
      })
      .then((result: { data: { data: { profile: Profile } } }) => {
        setProfile(result.data.data.profile);
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(error);
      });
  }, [dataProvider, props.id]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const [renewMembership, { loading: renewing }] = useMutation(
    {
      type: 'renew',
      resource: 'youthProfiles',
      payload: { id: props.id },
    },
    {
      onSuccess: () => {
        setLoading(true);
        getProfile();
        notify('Update successful', 'success');
      },
      onFailure: (error: Error) => {
        notify('Something went wrong', 'warning');
      },
    }
  );

  type Label = {
    label: string;
    value: string | undefined | null;
  };

  const Label = ({ value, label }: Label) => {
    return (
      <div className={styles.label}>
        <p className={styles.labelTitle}>{label}</p>
        <p className={styles.labelValue}>{value}</p>
      </div>
    );
  };

  if (loading || renewing) return <Loading />;
  if (error) return <Error error={error} />;

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
      </div>
      {profile?.youthProfile?.renewable && (
        <button onClick={renewMembership}>RENEW</button>
      )}
      <h3>{t('youthProfiles.basicInfo')}</h3>
      <div className={styles.row}>
        <Label
          value={getName(profile, 'youth')}
          label={t('youthProfiles.name')}
        />
        <Label value={getAddress(profile)} label={t('youthProfiles.address')} />
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
        <Label
          value={t(`LANGUAGE_OPTIONS.${profile?.youthProfile?.languageAtHome}`)}
          label={t('youthProfiles.languageAtHome')}
        />
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
      <div className={styles.row}>
        <Label
          value={getName(profile, 'approver')}
          label={t('youthProfiles.name')}
        />
      </div>
      <div className={styles.row}>
        <Label
          value={profile?.youthProfile?.approverEmail || ' - '}
          label={t('youthProfiles.email')}
        />
        <Label
          value={profile?.youthProfile?.approverPhone || ' - '}
          label={t('youthProfiles.phone')}
        />
      </div>
    </div>
  );
};

export default YouthDetails;
