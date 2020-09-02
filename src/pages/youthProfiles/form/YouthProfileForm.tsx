import React, { useState } from 'react';
import {
  FormWithRedirect,
  SaveButton,
  Toolbar,
  useTranslate,
} from 'react-admin';
// eslint-disable-next-line import/named
import { useFormState, FormRenderProps } from 'react-final-form';
import { useHistory, useParams } from 'react-router';
import countries from 'i18n-iso-countries';

import styles from './YouthProfileForm.module.css';
import {
  Language,
  Profile_profile_addresses_edges_node as Address,
  Profile_profile_primaryAddress as PrimaryAddress,
} from '../../../graphql/generatedTypes';
import TextInput from './inputs/TextInput';
import RadioGroupInput from './inputs/RadioGroupInput';
import BirthDateInput from './inputs/BirthDateInput';
import SelectInput from './inputs/SelectInput';
import { FormValues } from '../types/youthProfileTypes';
import youthFormValidator, {
  ValidationErrors,
} from '../helpers/youthFormValidator';
import YouthProfileArrayField from './YouthProfileArrayField';

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
  const [errors, setErrors] = useState<ValidationErrors>(
    {} as ValidationErrors
  );
  const t = useTranslate();
  const history = useHistory();
  const params: Params = useParams();

  const onSave = (values: FormValues) => {
    const nextErrors: ValidationErrors = youthFormValidator(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
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

  const handleMakePrimary = (
    formRenderProps: FormRenderProps<FormValues>,
    index: number
  ) => {
    const { form } = formRenderProps;
    const values = form.getState().values;
    const { addresses, primaryAddress } = values;
    const address: Address = addresses[index];
    // At the moment primaryAddress and address are different types, but
    // have the same content. I'm not sure if this by design or
    // coincidence. For that reason I am adding an extra type check here
    // to pull the possible error into a place where the cause for it is
    // more obvious.
    const nextPrimaryAddress: PrimaryAddress = { ...address, primary: true };
    const nextAddresses = addresses
      .filter((_: unknown, i: number) => i !== index)
      .concat([{ ...primaryAddress, primary: false }]);

    form.batch(() => {
      form.change('primaryAddress', nextPrimaryAddress);
      form.change('addresses', nextAddresses);
    });
  };

  // TODO if possible change getNames list based on current language
  // TODO at the moment language will always default to finnish & there isn't option to change it manually
  const countryList = countries.getNames('fi');
  const countryOptions = Object.keys(countryList).map((key) => {
    return {
      value: key,
      label: countryList[key] as string,
    };
  });

  return (
    <FormWithRedirect
      basePath="/youthProfiles"
      resource="youthProfiles"
      initialValues={{
        languageAtHome: 'FINNISH',
        profileLanguage: 'FINNISH',
        photoUsageApproved: 'false',
        primaryAddress: {
          address: '',
          postalCode: '',
          city: '',
          countryCode: 'FI',
          primary: true,
        },
        addresses: [],
      }}
      record={props.record}
      render={(formRenderProps: FormRenderProps<FormValues>) => (
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
              <SelectInput
                name="primaryAddress.countryCode"
                labelText={t('youthProfiles.country')}
                options={countryOptions}
                className={styles.select}
              />
            </div>
            <div
              className={[styles.addressRowContainer, styles.rowContainer].join(
                ' '
              )}
            >
              <TextInput
                label={t('youthProfiles.streetAddress')}
                name="primaryAddress.address"
                className={styles.textField}
                error={errors.primaryAddress?.address}
              />
              <TextInput
                label={t('youthProfiles.postalCode')}
                name="primaryAddress.postalCode"
                className={styles.textField}
                error={errors.primaryAddress?.postalCode}
              />
              <TextInput
                label={t('youthProfiles.city')}
                name="primaryAddress.city"
                className={styles.textField}
                error={errors.primaryAddress?.city}
              />
            </div>

            <YouthProfileArrayField
              name="addresses"
              renderField={(name, index) => (
                <>
                  <div className={styles.rowContainer}>
                    <SelectInput
                      name={`${name}.countryCode`}
                      labelText={t('youthProfiles.country')}
                      options={countryOptions}
                      className={styles.select}
                    />
                  </div>
                  <div
                    className={[
                      styles.addressRowContainer,
                      styles.rowContainer,
                    ].join(' ')}
                  >
                    <TextInput
                      name={`${name}.address`}
                      label={t('youthProfiles.streetAddress')}
                      className={styles.textField}
                      error={errors.addresses?.[index]?.address}
                    />
                    <TextInput
                      name={`${name}.postalCode`}
                      label={t('youthProfiles.postalCode')}
                      className={styles.textField}
                      error={errors.addresses?.[index]?.postalCode}
                    />
                    <TextInput
                      name={`${name}.city`}
                      label={t('youthProfiles.city')}
                      className={styles.textField}
                      error={errors.addresses?.[index]?.city}
                    />
                  </div>
                </>
              )}
              additionalFieldControls={[
                {
                  label: t('youthProfiles.makePrimaryAddress'),
                  onClick: (index) => handleMakePrimary(formRenderProps, index),
                },
              ]}
              addItemLabel={t('youthProfiles.addAnotherAddress')}
              removeItemLabel={t('youthProfiles.removeAddress')}
              onPushItem={(push) => {
                push({
                  address: '',
                  postalCode: '',
                  city: '',
                  countryCode: 'FI',
                  primary: false,
                });
              }}
            />

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
