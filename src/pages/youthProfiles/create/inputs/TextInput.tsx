import React from 'react';
import { TextInput as TextField } from 'hds-react';
import { useField } from 'react-final-form';
import { useTranslate } from 'react-admin';

type Props = {
  name: string;
  label: string;
  className?: string;
};

const TextInput = ({ name, label, className }: Props) => {
  const {
    input: { onChange },
    meta: { touched, error },
  } = useField(name);
  const t = useTranslate();
  return (
    <TextField
      id={name}
      onChange={onChange}
      labelText={label}
      className={className}
      invalid={touched && error}
      invalidText={touched && error && t(error)}
    />
  );
};
export default TextInput;
