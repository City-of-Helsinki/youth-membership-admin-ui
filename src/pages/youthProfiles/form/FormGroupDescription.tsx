import React from 'react';
import { useField } from 'react-final-form';

type Props = {
  description: string;
  formGroup: string;
  className?: string;
};

const FormGroupDescription = ({ description, formGroup }: Props) => {
  const {
    input: { value },
  } = useField(formGroup);
  if (value?.length === 0) return null;
  return <p className="formGroupDescription">{description}</p>;
};

export default FormGroupDescription;
