import React, { useState, useEffect } from 'react';
import { TextInput } from 'hds-react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useField } from 'react-final-form';
import { useTranslate } from 'react-admin';

const useStyles = makeStyles({
  birthDate: { width: 91, marginRight: '1rem' },
  label: {
    fontSize: 'var(--hds-text-sm)',
    lineHeight: 'var(--hds-text-sm-line-height)',
    fontFamily: 'var(--hds-theme-primary-font)',
    fontWeight: 'bold',
    margin: 0,
  },
  error: { color: '#c4123e' },
  errorHelper: {
    color: '#c4123e',
    margin: '2px 0',
    fontSize: '0.875rem',
  },
  container: { minWidth: 305 },
});

type Props = {
  inputName: string;
  label: string;
};

type BirthDate = {
  day?: string;
  month?: string;
  year?: string;
};

const BirthDateInput = ({ inputName, label }: Props) => {
  const classes = useStyles();
  const [birthDate, setBirthDate] = useState<BirthDate>({
    day: '',
    month: '',
    year: '',
  });

  const {
    input: { onChange },
    meta: { touched, error },
  } = useField(inputName);

  useEffect(() => {
    onChange({
      target: {
        value: `${birthDate.year}-${birthDate.month}-${birthDate.day}`,
      },
    });
  }, [birthDate, onChange]);

  // e type is set to any for now. Event type returned from hds
  // is set to ChangeEvent<Element> which doesn't contain
  // target.value
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  const handleChange = (e: any) => {
    setBirthDate({ ...birthDate, [e.target.id]: e.target.value });
  };

  const labelClass = `${classes.label} ${
    touched && error ? classes.error : ''
  }`;

  const t = useTranslate();

  return (
    <Box className={classes.container} mt="1rem">
      <p className={labelClass}>{label}</p>
      <Box display="flex">
        <TextInput
          id="day"
          className={classes.birthDate}
          value={birthDate.day}
          onChange={handleChange}
          invalid={touched && error}
        />
        <TextInput
          id="month"
          className={classes.birthDate}
          value={birthDate.month}
          onChange={handleChange}
          invalid={touched && error}
        />
        <TextInput
          id="year"
          className={classes.birthDate}
          value={birthDate.year}
          onChange={handleChange}
          invalid={touched && error}
        />
      </Box>
      {touched && error && <p className={classes.errorHelper}>{t(error)}</p>}
    </Box>
  );
};

export default BirthDateInput;
