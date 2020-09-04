import React, { ReactNode } from 'react';
import { FieldArray } from 'react-final-form-arrays';
import { Button, IconPlusCircle } from 'hds-react';

import styles from './youthProfileArrayField.module.css';

type Props = {
  name: string;
  renderField: (name: string, index: number) => ReactNode;
  addItemLabel: string;
  removeItemLabel: string;
  onPushItem: (push: (value: unknown) => void) => unknown;
  additionalFieldControls?: Array<{
    label: string;
    onClick: (index: number) => void;
  }>;
};

function YouthProfileArrayField({
  name,
  renderField,
  addItemLabel,
  removeItemLabel,
  onPushItem,
  additionalFieldControls,
}: Props) {
  return (
    <FieldArray name={name}>
      {({ fields }) => (
        <div className={[styles.stack, styles.l].join(' ')}>
          {fields.value.length > 0 && (
            <div className={[styles.stack, styles.m].join(' ')}>
              {fields.map((name: string, index: number) => (
                <div key={name}>
                  {renderField(name, index)}
                  <div>
                    <button
                      type="button"
                      className={styles.additionalActionButton}
                      onClick={() => fields.remove(index)}
                    >
                      {removeItemLabel}
                    </button>
                    {additionalFieldControls &&
                      additionalFieldControls.map((fieldControl) => (
                        <button
                          key={fieldControl.label}
                          type="button"
                          className={styles.additionalActionButton}
                          onClick={() => fieldControl.onClick(index)}
                        >
                          {fieldControl.label}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          <Button
            type="button"
            iconLeft={<IconPlusCircle />}
            variant="supplementary"
            className={styles.addItemButton}
            onClick={() => {
              onPushItem(fields.push);
            }}
          >
            {addItemLabel}
          </Button>
        </div>
      )}
    </FieldArray>
  );
}

export default YouthProfileArrayField;
