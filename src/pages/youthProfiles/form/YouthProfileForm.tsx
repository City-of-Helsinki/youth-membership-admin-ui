import React, { useState } from 'react';
import {
  FormWithRedirect,
  SaveButton,
  Toolbar,
  useTranslate,
} from 'react-admin';
import { useFormState } from 'react-final-form';
import { useHistory, useParams } from 'react-router';

import styles from './YouthProfileForm.module.css';
import { Language } from '../../../graphql/generatedTypes';
import TextInput from './inputs/TextInput';
import RadioGroupInput from './inputs/RadioGroupInput';
import BirthDateInput from './inputs/BirthDateInput';
import SelectInput from './inputs/SelectInput';
import {
  ValidationOption,
  FormValues,
  YouthSchema,
  Errors,
} from '../types/youthProfileTypes';
import youthCreateFormValidator from '../helpers/youthCreateFormValidator';

const schema: YouthSchema<ValidationOption> = {
  firstName: {
    min: 2,
    max: 255,
    required: true,
  },
  lastName: {
    min: 2,
    max: 255,
    required: true,
  },
  phone: {
    min: 2,
    max: 255,
    required: true,
  },
  email: {
    min: 2,
    max: 255,
    email: true,
    required: true,
  },
  address: {
    min: 2,
    max: 255,
    required: true,
  },
  city: {
    min: 2,
    max: 255,
    required: true,
  },
  postalCode: {
    min: 5,
    max: 5,
    required: true,
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
    required: true,
  },
  approverLastName: {
    min: 2,
    max: 255,
    required: true,
  },
  approverEmail: {
    min: 2,
    max: 255,
    email: true,
    required: true,
  },
  approverPhone: {
    min: 2,
    max: 255,
    required: true,
  },
};

type Props = {
  record?: FormValues;
  method?: string;
  save: (values: FormValues) => void;
  saving: boolean;
  profileID?: string;
};

type Params = {
  id?: string;
  method?: string;
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
const YouthProfileForm = (props: Props) => {
  const [errors, setErrors] = useState<Errors>({});
  const t = useTranslate();
  const history = useHistory();
  const params: Params = useParams();

  const onSave = (values: FormValues) => {
    const errors: Errors = youthCreateFormValidator(values, schema);

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      props.save(values);
    }
  };

  // This component is used to access form data so it can be passed to validator
  const CustomButton = () => {
    const form = useFormState();

    return (
      <SaveButton
        label={
          props.method === 'renew'
            ? 'youthProfiles.renew'
            : 'youthProfiles.save'
        }
        handleSubmitWithRedirect={() => onSave(form.values as FormValues)}
      />
    );
  };

  const CancelButton = () => {
    const path =
      params.method === 'update' || params.method === 'renew'
        ? `/youthProfiles/${props.profileID}/show/${history.location.search}`
        : `/youthProfiles${history.location.search}`;
    return (
      <button
        className={styles.cancelButton}
        onClick={() => history.push(path)}
      >
        {t('youthProfiles.cancel')}
      </button>
    );
  };

  return (
    <FormWithRedirect
      basePath="/youthProfiles"
      resource="youthProfiles"
      initialValues={{
        languageAtHome: 'FINNISH',
        profileLanguage: 'FINNISH',
        countryCode: 'FI',
        photoUsageApproved: 'false',
      }}
      record={props.record}
      render={() => (
        <form>
          <div className={styles.wrapper}>
            <p className={styles.title}>{t('youthProfiles.basicInfo')}</p>
            <div className={styles.rowContainer}>
              <TextInput
                name="firstName"
                label={t('youthProfiles.firstName')}
                className={styles.textField}
                error={errors.firstName}
              />
              <TextInput
                label={t('youthProfiles.lastName')}
                name="lastName"
                className={styles.textField}
                error={errors.lastName}
              />
            </div>
            <div className={styles.rowContainer}>
              <TextInput
                label={t('youthProfiles.streetAddress')}
                name="address"
                className={styles.textField}
                error={errors.address}
              />

              <TextInput
                label={t('youthProfiles.city')}
                name="city"
                className={styles.textField}
                error={errors.city}
              />
            </div>
            <div className={styles.rowContainer}>
              <TextInput
                label={t('youthProfiles.postalCode')}
                name="postalCode"
                className={styles.textField}
                error={errors.postalCode}
              />

              <SelectInput
                name="countryCode"
                labelText={t('youthProfiles.country')}
                options={[
                  {
                    value: 'FI',
                    label: t('LANGUAGE_OPTIONS.FINNISH'),
                  },
                  {
                    value: 'SV',
                    label: t('LANGUAGE_OPTIONS.SWEDISH'),
                  },
                ]}
                className={styles.select}
              />
            </div>

            <div className={styles.rowContainer}>
              <TextInput
                label={t('youthProfiles.email')}
                name="email"
                className={styles.textField}
                error={errors.email}
              />

              <TextInput
                label={t('youthProfiles.phone')}
                name="phone"
                className={styles.textField}
                error={errors.phone}
              />
            </div>

            <div className={styles.rowContainer}>
              <BirthDateInput
                inputName="birthDate"
                label={t('youthProfiles.birthDate')}
                error={errors.birthDate}
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
          </div>

          <div className={styles.infoContainer}>
            <p className={styles.title}>{t('youthProfiles.extraInfo')}</p>
            <div className={styles.rowContainer}>
              <TextInput
                label={t('youthProfiles.schoolName')}
                name="schoolName"
                className={styles.textField}
                error={errors.schoolName}
              />

              <TextInput
                label={t('youthProfiles.schoolClass')}
                name="schoolClass"
                className={styles.textField}
                error={errors.schoolClass}
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
                error={errors.approverFirstName}
              />

              <TextInput
                label={t('youthProfiles.lastName')}
                name="approverLastName"
                className={styles.textField}
                error={errors.approverLastName}
              />
            </div>
            <div className={styles.rowContainer}>
              <TextInput
                label={t('youthProfiles.email')}
                name="approverEmail"
                className={styles.textField}
                error={errors.approverEmail}
              />

              <TextInput
                label={t('youthProfiles.phone')}
                name="approverPhone"
                className={styles.textField}
                error={errors.approverPhone}
              />
            </div>
            <Toolbar>
              <CustomButton />
              <CancelButton />
            </Toolbar>
          </div>
        </form>
      )}
    />
  );
};

export default YouthProfileForm;
