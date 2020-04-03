import React, { useCallback } from 'react';
import { useDataProvider, SaveButton } from 'react-admin';
import { useFormState } from 'react-final-form';
import { useHistory } from 'react-router';

import { CreateProfile_createProfile as CreateProfile } from '../../../../graphql/generatedTypes';
import { Values } from '../../types/youthProfileTypes';
import youthCreateFormValidator from '../../helpers/youthCreateFormValidator';

/* eslint-disable  @typescript-eslint/no-explicit-any */
const SubmitForm = (props: any) => {
  const formState = useFormState();
  const dataProvider = useDataProvider();

  const history = useHistory();

  const handleClick = useCallback(() => {
    const errors = youthCreateFormValidator(
      formState.values as Values,
      props.schema
    );
    props.errorCallBack(errors);
    if (Object.keys(errors).length === 0) {
      dataProvider
        .create('youthProfiles', { data: { ...formState.values } })
        .then(
          (result: { data: { data: { createProfile: CreateProfile } } }) => {
            const id = result?.data?.data?.createProfile?.profile?.id;
            if (id) history.push(`/youthProfiles/${id}/show`);
          }
        );
    }
  }, [dataProvider, history, formState, props]);

  // Delete errorCallBack to prevent DOM error
  const saveProps = { ...props };
  delete saveProps.errorCallBack;

  return <SaveButton {...saveProps} handleSubmitWithRedirect={handleClick} />;
};

export default SubmitForm;
