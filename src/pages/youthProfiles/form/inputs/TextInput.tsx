import React from 'react';
import { TextInput as TextField } from 'hds-react';
import { useField } from 'react-final-form';
import { useTranslate } from 'react-admin';

type Props = {
  name: string;
  label: string;
  className?: string;
  error?: string;
};

const TextInput = ({ name, label, className, error }: Props) => {
  const {
    input: { value, onChange },
  } = useField(name);
  const t = useTranslate();

  return (
    <TextField
      id={name}
      value={value}
      onChange={onChange}
      labelText={label}
      className={className}
      invalid={Boolean(error)}
      invalidText={error && t(error)}
    />
  );
};
export default TextInput;
