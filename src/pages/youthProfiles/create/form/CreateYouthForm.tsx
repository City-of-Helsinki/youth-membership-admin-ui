import React, { useState } from 'react';
import { FormWithRedirect, Toolbar, useTranslate } from 'react-admin';

import styles from './CreateYouthForm.module.css';
import { Language } from '../../../../graphql/generatedTypes';
import TextInput from '../inputs/TextInput';
import RadioGroupInput from '../inputs/RadioGroupInput';
import BirthDateInput from '../inputs/BirthDateInput';
import {
  ValidationOption,
  Errors,
  YouthSchema,
} from '../../types/youthProfileTypes';
import SubmitForm from '../buttons/SubmitButton';

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
    min: 1,
    max: 128,
  },
  schoolClass: {
    min: 1,
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

/* eslint-disable  @typescript-eslint/no-explicit-any */
const CreateYouthForm: React.FC = (props: any) => {
  const [errors, setErrors] = useState<Errors>();
  const t = useTranslate();

  return (
    <FormWithRedirect
      {...props}
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
        photoUsageApproved: 'false',
        approverFirstName: '',
        approverLastName: '',
        approverEmail: '',
        approverPhone: '',
      }}
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
                error={errors?.firstName}
              />
              <TextInput
                label={t('youthProfiles.lastName')}
                name="lastName"
                error={errors?.lastName}
              />
            </div>
            <div className={styles.rowContainer}>
              <TextInput
                label={t('youthProfiles.streetAddress')}
                name="address"
                className={styles.textField}
                error={errors?.address}
              />

              <TextInput
                label={t('youthProfiles.city')}
                name="city"
                className={styles.textField}
                error={errors?.city}
              />

              <TextInput
                label={t('youthProfiles.postalCode')}
                name="postalCode"
                error={errors?.postalCode}
              />
            </div>

            <div className={styles.rowContainer}>
              <TextInput
                label={t('youthProfiles.email')}
                name="email"
                className={styles.textField}
                error={errors?.email}
              />

              <TextInput
                label={t('youthProfiles.phone')}
                name="phone"
                error={errors?.phone}
              />
            </div>

            <BirthDateInput
              inputName="birthDate"
              label={t('youthProfiles.birthDate')}
              error={errors?.birthDate}
            />
          </div>

          <div className={styles.infoContainer}>
            <p className={styles.title}>{t('youthProfiles.extraInfo')}</p>
            <div className={styles.rowContainer}>
              <TextInput
                label={t('youthProfiles.schoolName')}
                name="schoolName"
                className={styles.textField}
                error={errors?.schoolName}
              />

              <TextInput
                label={t('youthProfiles.schoolClass')}
                name="schoolClass"
                error={errors?.schoolClass}
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
                error={errors?.approverFirstName}
              />

              <TextInput
                label={t('youthProfiles.lastName')}
                name="approverLastName"
                error={errors?.approverLastName}
              />
            </div>
            <div className={styles.rowContainer}>
              <TextInput
                label={t('youthProfiles.email')}
                name="approverEmail"
                className={styles.textField}
                error={errors?.approverEmail}
              />

              <TextInput
                label={t('youthProfiles.phone')}
                name="approverPhone"
                error={errors?.approverPhone}
              />
            </div>
          </div>
          <Toolbar>
            <SubmitForm
              saving={formProps.saving}
              redirect="show"
              schema={schema}
              errorCallBack={(errors: Errors) => setErrors(errors)}
            />
          </Toolbar>
        </form>
      )}
    />
  );
};

export default CreateYouthForm;
