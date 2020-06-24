import React from 'react';
import { TextInput as TextField } from 'hds-react';
import { useField } from 'react-final-form';
import { useTranslate } from 'react-admin';
import { useParams } from 'react-router';

type Props = {
  name: string;
  label: string;
  className?: string;
  error?: string;
};

type Params = {
  id?: string;
  method?: string;
};

const TextInput = ({ name, label, className, error }: Props) => {
  const params: Params = useParams();
  const {
    input: { value, onChange },
  } = useField(name);
  const t = useTranslate();

  const isDisabled =
    name === 'email' &&
    (params.method === 'update' || params.method === 'renew');

  return (
    // invalidText={error && t(error)}
    <TextField
      id={name}
      value={value}
      onChange={onChange}
      labelText={label}
      className={className}
      invalid={Boolean(error)}
      readOnly={isDisabled}
    />
  );
};
export default TextInput;
