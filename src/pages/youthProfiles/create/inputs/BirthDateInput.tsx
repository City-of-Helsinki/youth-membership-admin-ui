import React, { useState, useEffect } from 'react';
import { TextInput } from 'hds-react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useField } from 'react-final-form';

const useStyles = makeStyles({
  birthDate: { width: 91, marginRight: '1rem' },
  label: {
    fontSize: 'var(--hds-text-sm)',
    lineHeight: 'var(--hds-text-sm-line-height)',
    fontFamily: 'var(--hds-theme-primary-font)',
    fontWeight: 'bold',
    margin: 0,
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

  return (
    <Box className={classes.container} mt="1rem">
      <p className={classes.label}>{label}</p>
      <Box display="flex">
        <TextInput
          id="day"
          className={classes.birthDate}
          value={birthDate.day}
          onChange={handleChange}
        />
        <TextInput
          id="month"
          className={classes.birthDate}
          value={birthDate.month}
          onChange={handleChange}
        />
        <TextInput
          id="year"
          className={classes.birthDate}
          value={birthDate.year}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};

export default BirthDateInput;
