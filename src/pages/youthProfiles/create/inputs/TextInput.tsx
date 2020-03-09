import React from 'react';
import { TextInput as TextField } from 'hds-react';
import { useField } from 'react-final-form';

type Props = {
  name: string;
  label: string;
  className?: string;
};

const TextInput = ({ name, label, className }: Props) => {
  const {
    input: { onChange },
  } = useField(name);

  return (
    <TextField
      id={name}
      onChange={onChange}
      labelText={label}
      className={className}
    />
  );
};
export default TextInput;
