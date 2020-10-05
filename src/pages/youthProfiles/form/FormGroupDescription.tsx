import React from 'react';
import { useField } from 'react-final-form';

type Props = {
  description: string;
  name: string;
  className?: string;
};

const FormGroupDescription = ({ description, name, className }: Props) => {
  const {
    input: { value },
  } = useField(name);
  if (value?.length === 0) return null;
  return <p className={className}>{description}</p>;
};

export default FormGroupDescription;
