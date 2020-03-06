import React from 'react';
import { TextInput as TextField } from 'hds-react';
import { useField } from 'react-final-form';

type Props = {
  name: string;
  label: string;
};

const TextInput = ({ name, label }: Props) => {
  const {
    input: { onChange },
    meta: { touched, error },
  } = useField(name);

  return <TextField id={name} onChange={onChange} labelText={label} />;
};
export default TextInput;
