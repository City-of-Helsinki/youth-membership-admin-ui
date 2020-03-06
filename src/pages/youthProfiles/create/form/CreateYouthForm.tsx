import React from 'react';
import {
  FormWithRedirect,
  SaveButton,
  Toolbar,
  useTranslate,
} from 'react-admin';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Language } from '../../../../graphql/generatedTypes';
import TextInput from '../inputs/TextInput';
import RadioGroupInput from '../inputs/RadioGroupInput';
import BirthDateInput from '../inputs/BirthDateInput';

const useStyles = makeStyles({
  title: {
    fontSize: 'var(--hds-text-xl)',
    lineHeight: 'var(--hds-text-sm-line-height)',
    fontFamily: 'var(--hds-theme-primary-font)',
    fontWeight: 'bold',
    margin: 0,
  },
});

const CreateYouthForm: React.FC = (props: any) => {
  const t = useTranslate();

  const classes = useStyles();
  return (
    <FormWithRedirect
      {...props}
      render={(formProps: any) => (
        <form>
          <Box ml="2rem" mt="2rem">
            <p className={classes.title}>Perustiedot</p>
            <Box display="flex" mt="1rem">
              <Box mr="1rem">
                <TextInput
                  name="firstName"
                  label={t('youthProfiles.firstName')}
                />
              </Box>
              <TextInput label={t('youthProfiles.lastName')} name="lastName" />
            </Box>
            <Box display="flex" mt="1rem">
              <Box mr="1rem">
                <TextInput
                  label={t('youthProfiles.streetAddress')}
                  name="address"
                />
              </Box>
              <Box mr="1rem">
                <TextInput label={t('youthProfiles.city')} name="city" />
              </Box>
              <TextInput
                label={t('youthProfiles.postalCode')}
                name="postalCode"
              />
            </Box>

            <Box display="flex" mt="1rem">
              <Box mr="1rem">
                <TextInput label={t('youthProfiles.email')} name="email" />
              </Box>
              <TextInput label={t('youthProfiles.phone')} name="phone" />
            </Box>

            <BirthDateInput
              inputName="birthDate"
              label={t('youthProfiles.birthDate')}
            />
          </Box>

          <Box ml="2rem" mt="1rem">
            <p className={classes.title}>Lisätiedot</p>
            <Box display="flex" mt="1rem">
              <Box mr="1rem">
                <TextInput
                  label={t('youthProfiles.schoolName')}
                  name="schoolName"
                />
              </Box>
              <TextInput
                label={t('youthProfiles.schoolClass')}
                name="schoolClass"
              />
            </Box>

            <RadioGroupInput
              label={t('youthProfiles.languageAtHome')}
              name="languageAtHome"
              initialValue="FINNISH"
              choices={[
                { id: Language.FINNISH, name: t('LANGUAGE_OPTIONS.FINNISH') },
                { id: Language.ENGLISH, name: t('LANGUAGE_OPTIONS.ENGLISH') },
                { id: Language.SWEDISH, name: t('LANGUAGE_OPTIONS.SWEDISH') },
              ]}
            />
            <RadioGroupInput
              name="photoUsageApproved"
              label={t('youthProfiles.photoUsage')}
              initialValue="false"
              choices={[
                { id: 'true', name: 'Yes' },
                { id: 'false', name: 'No' },
              ]}
            />
          </Box>

          <Box ml="2rem" mt="1rem">
            <p className={classes.title}>Huoltajan tiedot</p>
            <Box display="flex" mt="1rem">
              <Box mr="1rem">
                <TextInput
                  label={t('youthProfiles.firstName')}
                  name="approverFirstName"
                />
              </Box>
              <TextInput
                label={t('youthProfiles.lastName')}
                name="approverLastName"
              />
            </Box>
            <Box display="flex" mt="1rem">
              <Box mr="1rem">
                <TextInput
                  label={t('youthProfiles.email')}
                  name="approverEmail"
                />
              </Box>
              <TextInput
                label={t('youthProfiles.phone')}
                name="approverPhone"
              />
            </Box>
          </Box>
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
