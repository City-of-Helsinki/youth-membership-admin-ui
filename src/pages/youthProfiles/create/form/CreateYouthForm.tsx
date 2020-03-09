import React from 'react';
import {
  FormWithRedirect,
  SaveButton,
  Toolbar,
  useTranslate,
} from 'react-admin';

import styles from './CreateYouthForm.module.css';
import { Language } from '../../../../graphql/generatedTypes';
import TextInput from '../inputs/TextInput';
import RadioGroupInput from '../inputs/RadioGroupInput';
import BirthDateInput from '../inputs/BirthDateInput';

const CreateYouthForm: React.FC = (props: any) => {
  const t = useTranslate();

  return (
    <FormWithRedirect
      {...props}
      initialValues={{ languageAtHome: 'FINNISH', photoUsageApproved: 'false' }}
      render={(formProps: any) => (
        <form>
          <div className={styles.wrapper}>
            <p className={styles.title}>{t('youthProfiles.basicInfo')}</p>
            <div className={styles.rowContainer}>
              <TextInput
                name="firstName"
                label={t('youthProfiles.firstName')}
                className={styles.textField}
              />
              <TextInput label={t('youthProfiles.lastName')} name="lastName" />
            </div>
            <div className={styles.rowContainer}>
              <TextInput
                label={t('youthProfiles.streetAddress')}
                name="address"
                className={styles.textField}
              />

              <TextInput
                label={t('youthProfiles.city')}
                name="city"
                className={styles.textField}
              />

              <TextInput
                label={t('youthProfiles.postalCode')}
                name="postalCode"
              />
            </div>

            <div className={styles.rowContainer}>
              <TextInput
                label={t('youthProfiles.email')}
                name="email"
                className={styles.textField}
              />

              <TextInput label={t('youthProfiles.phone')} name="phone" />
            </div>

            <BirthDateInput
              inputName="birthDate"
              label={t('youthProfiles.birthDate')}
            />
          </div>

          <div className={styles.infoContainer}>
            <p className={styles.title}>{t('youthProfiles.extraInfo')}</p>
            <div className={styles.rowContainer}>
              <TextInput
                label={t('youthProfiles.schoolName')}
                name="schoolName"
                className={styles.textField}
              />

              <TextInput
                label={t('youthProfiles.schoolClass')}
                name="schoolClass"
              />
            </div>

            <RadioGroupInput
              initialValue={Language.FINNISH}
              label={t('youthProfiles.languageAtHome')}
              name="languageAtHome"
              choices={[
                { id: Language.FINNISH, name: t('LANGUAGE_OPTIONS.FINNISH') },
                { id: Language.ENGLISH, name: t('LANGUAGE_OPTIONS.ENGLISH') },
                { id: Language.SWEDISH, name: t('LANGUAGE_OPTIONS.SWEDISH') },
              ]}
            />
            <RadioGroupInput
              initialValue="false"
              name="photoUsageApproved"
              label={t('youthProfiles.photoUsage')}
              choices={[
                { id: 'true', name: 'Yes' },
                { id: 'false', name: 'No' },
              ]}
            />
          </div>

          <div className={styles.infoContainer}>
            <p className={styles.title}>{t('youthProfiles.approverInfo')}</p>
            <div className={styles.rowContainer}>
              <TextInput
                label={t('youthProfiles.firstName')}
                name="approverFirstName"
                className={styles.textField}
              />

              <TextInput
                label={t('youthProfiles.lastName')}
                name="approverLastName"
              />
            </div>
            <div className={styles.rowContainer}>
              <TextInput
                label={t('youthProfiles.email')}
                name="approverEmail"
                className={styles.textField}
              />

              <TextInput
                label={t('youthProfiles.phone')}
                name="approverPhone"
              />
            </div>
          </div>
          <Toolbar>
            <SaveButton
              saving={formProps.saving}
              handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
            />
          </Toolbar>
        </form>
      )}
    />
  );
};

export default CreateYouthForm;
