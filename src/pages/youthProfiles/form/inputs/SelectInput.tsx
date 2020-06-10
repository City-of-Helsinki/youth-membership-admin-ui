import React from 'react';
import classNames from 'classnames';
import { useField } from 'react-final-form';

import styles from './SelectInput.module.css';

type Option = {
  value: string;
  label: string;
};

type Props = {
  name: string;
  id?: string;
  options: Option[];
  className?: string;
  labelText?: string;
};

function SelectInput({ name, className, id, labelText, options }: Props) {
  const {
    input: { value, onChange },
  } = useField(name);
  return (
    <div className={classNames(styles.select, className)}>
      <label htmlFor={name} className={styles.label}>
        {labelText}
      </label>
      <select onChange={onChange} id={id} name={name} value={value}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
