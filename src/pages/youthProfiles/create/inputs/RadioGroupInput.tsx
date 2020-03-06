import React from 'react';
import { Box, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useField } from 'react-final-form';

type Choice = {
  id: string;
  name: string;
};

type Props = {
  initialValue: string;
  name: string;
  label: string;
  choices: Choice[];
};

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

const RadioGroupInput = ({ initialValue, name, label, choices }: Props) => {
  const {
    input: { onChange },
    meta: { touched, error },
  } = useField(name);

  const classes = useStyles();
  return (
    <Box mt="1rem">
      <p className={classes.label}>{label}</p>
      <RadioGroup
        defaultValue={initialValue}
        onChange={onChange}
        id={name}
        className={classes.control}
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
