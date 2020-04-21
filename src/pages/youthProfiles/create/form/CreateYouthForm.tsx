import React from 'react';
import {
  FormWithRedirect,
  SaveButton,
  Toolbar,
  useTranslate,
} from 'react-admin';

import styles from './CreateYouthForm.module.css';
import {
  CreateProfile_createProfile as CreateProfile,
  Language,
} from '../../../../graphql/generatedTypes';
import { FormValues } from '../../types/youthProfileTypes';
import TextInput from '../inputs/TextInput';
import RadioGroupInput from '../inputs/RadioGroupInput';
import BirthDateInput from '../inputs/BirthDateInput';
import SelectInput from '../inputs/SelectInput';
import {
  ValidationOption,
  Values,
  YouthSchema,
} from '../../types/youthProfileTypes';
import youthCreateFormValidator from '../../helpers/youthCreateFormValidator';

const schema: YouthSchema<ValidationOption> = {
  firstName: {
    min: 2,
    max: 255,
  },
  lastName: {
    min: 2,
    max: 255,
  },
  phone: {
    min: 2,
    max: 255,
  },
  email: {
    min: 2,
    max: 255,
    email: true,
  },
  address: {
    min: 2,
    max: 255,
  },
  city: {
    min: 2,
    max: 255,
  },
  postalCode: {
    min: 5,
    max: 5,
  },
  birthDate: {
    birthDate: true,
    required: true,
  },
  schoolName: {
    max: 128,
  },
  schoolClass: {
    max: 10,
  },
  approverFirstName: {
    min: 2,
    max: 255,
  },
  approverLastName: {
    min: 2,
    max: 255,
  },
  approverEmail: {
    min: 2,
    max: 255,
    email: true,
  },
  approverPhone: {
    min: 2,
    max: 255,
  },
};

type Props = {
  record?: FormValues;
  save: () => void;
  saving: boolean;
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
const CreateYouthForm = (props: Props) => {
  const t = useTranslate();

  const redirect = (
    basePath: string,
    id: string,
    data: { data: { createProfile: CreateProfile } }
  ) => `/youthProfiles/${data?.data?.createProfile?.profile?.id}/show`;

  return (
    <FormWithRedirect
      basePath="/youthProfiles"
      resource="youthProfiles"
      initialValues={{
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        email: '',
        phone: '',
        birthDate: '',
        schoolName: '',
        schoolClass: '',
        languageAtHome: 'FINNISH',
        profileLanguage: 'FINNISH',
        photoUsageApproved: 'false',
        approverFirstName: '',
        approverLastName: '',
        approverEmail: '',
        approverPhone: '',
      }}
      {...props}
      validate={(values: Values) => youthCreateFormValidator(values, schema)}
      /* eslint-disable  @typescript-eslint/no-explicit-any */
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

              <TextInput
                label={t('youthProfiles.phone')}
                name="phone"
                className={styles.textField}
              />

              <SelectInput
                name="profileLanguage"
                labelText={t('youthProfiles.profileLanguage')}
                options={[
                  {
                    value: Language.FINNISH,
                    label: t('LANGUAGE_OPTIONS.FINNISH'),
                  },
                  {
                    value: Language.ENGLISH,
                    label: t('LANGUAGE_OPTIONS.ENGLISH'),
                  },
                  {
                    value: Language.SWEDISH,
                    label: t('LANGUAGE_OPTIONS.SWEDISH'),
                  },
                ]}
                className={styles.select}
              />
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
              initialValue={props?.record?.languageAtHome || Language.FINNISH}
              label={t('youthProfiles.languageAtHome')}
              name="languageAtHome"
              choices={[
                { id: Language.FINNISH, name: t('LANGUAGE_OPTIONS.FINNISH') },
                { id: Language.ENGLISH, name: t('LANGUAGE_OPTIONS.ENGLISH') },
                { id: Language.SWEDISH, name: t('LANGUAGE_OPTIONS.SWEDISH') },
              ]}
            />
            <RadioGroupInput
              initialValue={props?.record?.photoUsageApproved || 'false'}
              name="photoUsageApproved"
              label={t('youthProfiles.photoUsage')}
              choices={[
                { id: 'true', name: t('youthProfiles.photoApprovedTrue') },
                { id: 'false', name: t('youthProfiles.photoApprovedFalse') },
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
              redirect={redirect}
              handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
            />
          </Toolbar>
        </form>
      )}
    />
  );
};

export default CreateYouthForm;
