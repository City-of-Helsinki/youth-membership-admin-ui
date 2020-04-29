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
  error?: string;
};

type BirthDate = {
  day?: string;
  month?: string;
  year?: string;
};

const BirthDateInput = ({ inputName, label, error }: Props) => {
  const classes = useStyles();
  const [birthDate, setBirthDate] = useState<BirthDate>({
    day: '',
    month: '',
    year: '',
  });

  const {
    input: { value, onChange },
  } = useField(inputName);

  // Set initialValue
  useEffect(() => {
    if (value && !birthDate.day && !birthDate.month && !birthDate.year) {
      const dateValues = value.split('-');
      setBirthDate({
        day: dateValues[2],
        month: dateValues[1],
        year: dateValues[0],
      });
    }
  }, [value, birthDate.day, birthDate.month, birthDate.year]);

  // e type is set to any for now. Event type returned from hds
  // is set to ChangeEvent<Element> which doesn't contain
  // target.value
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  const handleChange = (e: any) => {
    e.persist();
    setBirthDate(previousBirthDate => ({
      ...previousBirthDate,
      [e.target.id]: e.target.value,
    }));
    onChange({
      target: {
        value: `${e.target.id === 'year' ? e.target.value : birthDate.year}-${
          e.target.id === 'month' ? e.target.value : birthDate.month
        }-${e.target.id === 'day' ? e.target.value : birthDate.day}`,
      },
    });
  };

  const labelClass = `${classes.label} ${Boolean(error) ? classes.error : ''}`;

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
          invalid={Boolean(error)}
        />
        <TextInput
          id="month"
          className={classes.birthDate}
          value={birthDate.month}
          onChange={handleChange}
          invalid={Boolean(error)}
        />
        <TextInput
          id="year"
          className={classes.birthDate}
          value={birthDate.year}
          onChange={handleChange}
          invalid={Boolean(error)}
        />
      </Box>
      {Boolean(error) && <p className={classes.errorHelper}>{t(error)}</p>}
    </Box>
  );
};

export default BirthDateInput;
