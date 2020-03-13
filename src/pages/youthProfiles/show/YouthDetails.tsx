import React from 'react';
import { useQueryWithStore, useTranslate, Loading, Error } from 'react-admin';
import { ArrowBack, CheckCircle, Cancel } from '@material-ui/icons';
import { useHistory } from 'react-router';
import { format } from 'date-fns';

import { Profile_profile as Profile } from '../../../graphql/generatedTypes';
import { getName, getSchool, getAddress } from '../helpers/utils';
import styles from './YouthDetails.module.css';

const YouthDetails: React.FC = (props: any) => {
  const { data, loading, error } = useQueryWithStore({
    type: 'getOne',
    resource: 'youthProfiles',
    payload: { id: props.id },
  });

  const t = useTranslate();
  const history = useHistory();

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

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  const profile: Profile = data?.data?.profile;
  return (
    <div className={styles.wrapper}>
      <div className={styles.goBack}>
        <button
          className={styles.labelValue}
          onClick={() => history.push('/youthProfiles')}
        >
          <ArrowBack className={styles.icon} />
          {t('youthProfiles.back')}
        </button>
      </div>

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
      </div>

      <h3>{t('youthProfiles.extraInfo')}</h3>
      <div className={styles.row}>
        <Label value={getSchool(profile)} label={t('youthProfiles.school')} />
        <Label
          value={t(`LANGUAGE_OPTIONS.${profile?.youthProfile?.languageAtHome}`)}
          label={t('youthProfiles.languageAtHome')}
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
