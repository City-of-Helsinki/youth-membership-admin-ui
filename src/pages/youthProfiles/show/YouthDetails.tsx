import React, { useEffect, useState } from 'react';
import { useDataProvider, useNotify, useTranslate, Loading } from 'react-admin';
import { ArrowBack, CheckCircle, Cancel } from '@material-ui/icons';
import { format } from 'date-fns';

import { Profile_profile as Profile } from '../../../graphql/generatedTypes';
import styles from './YouthDetails.module.css';

const YouthDetails: React.FC = (props: any) => {
  const [profile, setProfile] = useState<Profile>();
  const [loading, setLoading] = useState<boolean>(true);

  const t = useTranslate();
  const notify = useNotify();
  const dataProvider = useDataProvider();

  const getName = (data: Profile | undefined, field: string) => {
    const firstName =
      field === 'youth'
        ? data?.firstName
        : data?.youthProfile?.approverFirstName;
    const lastName =
      field === 'youth' ? data?.lastName : data?.youthProfile?.approverLastName;

    if (!firstName && !lastName) return ' - ';
    return `${firstName} ${lastName}`;
  };

  const getAddress = () => {
    if (!profile?.primaryAddress) return ' - ';
    return `${profile?.primaryAddress?.address} ,  ${profile?.primaryAddress?.postalCode} ${profile?.primaryAddress?.city}`;
  };

  const getSchool = () => {
    const schoolName = profile?.youthProfile?.schoolName;
    const schoolClass = profile?.youthProfile?.schoolClass;
    if (!schoolClass && !schoolName) return ' - ';
    if (!schoolClass || !schoolName) return `${schoolName} ${schoolClass}`;
    if (schoolClass && schoolName) return `${schoolName}, ${schoolClass}`;
  };

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

  useEffect(() => {
    dataProvider
      .getOne('youthProfiles', {
        id: props.id,
      })
      .then((result: { data: { data: { profile: Profile } } }) => {
        setProfile(result.data.data.profile);
        setLoading(false);
      })
      .catch((error: Error) => {
        notify(t('ra.message.error'), 'warning');
      });
  });

  if (loading) return <Loading />;
  return (
    <div className={styles.wrapper}>
      <div className={styles.goBack}>
        <button>
          <ArrowBack />
          {t('youthProfiles.back')}
        </button>
      </div>

      <h3>{t('youthProfiles.basicInfo')}</h3>
      <div className={styles.row}>
        <Label
          value={getName(profile, 'youth')}
          label={t('youthProfiles.name')}
        />
        <Label value={getAddress()} label={t('youthProfiles.address')} />
      </div>

      <div className={styles.row}>
        <Label
          value={profile?.primaryEmail?.email}
          label={t('youthProfiles.email')}
        />
        <Label
          value={profile?.primaryPhone?.phone}
          label={t('youthProfiles.phone')}
        />
      </div>

      <div className={styles.row}>
        <Label
          value={format(
            new Date(profile?.youthProfile?.birthDate),
            'dd.MM.yyyy'
          )}
          label={t('youthProfiles.birthDate')}
        />
      </div>

      <h3>{t('youthProfiles.extraInfo')}</h3>
      <div className={styles.row}>
        <Label value={getSchool()} label={t('youthProfiles.school')} />
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
