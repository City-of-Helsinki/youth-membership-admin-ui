import React from 'react';
import { Box, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useInput } from 'react-admin';

const useStyles = makeStyles({
  label: {
    fontSize: 'var(--hds-text-sm)',
    lineHeight: 'var(--hds-text-sm-line-height)',
    fontFamily: 'var(--hds-theme-primary-font)',
    fontWeight: 'bold',
    margin: 0,
  },
  radioLabel: {
    fontSize: 'var(--hds-text-sm)',
    fontFamily: 'var(--hds-theme-primary-font)',
  },
  control: {
    width: 305,
  },
});

type Choice = {
  id: string;
  name: string;
};

type Props = {
  name: string;
  label: string;
  choices: Choice[];
  initialValue?: string;
};

const RadioGroupInput = ({ name, label, choices, initialValue }: Props) => {
  const { input } = useInput({ name, type: 'radio' });
  console.log('INITIALVALUE', initialValue);
  const classes = useStyles();
  return (
    <Box mt="1rem">
      <p className={classes.label}>{label}</p>
      <RadioGroup
        id={name}
        className={classes.control}
        {...input}
        defaultValue={initialValue}
      >
        {choices.map((choice: Choice) => (
          <FormControlLabel
            control={<Radio value={choice.id} color="primary" />}
            label={choice.name}
            key={choice.id}
            classes={{
              label: classes.radioLabel,
            }}
          />
        ))}
      </RadioGroup>
    </Box>
  );
};

export default RadioGroupInput;
