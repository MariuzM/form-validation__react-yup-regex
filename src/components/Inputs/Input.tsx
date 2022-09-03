import { useEffect, useState } from 'react';

import { Input as MInput } from '@mantine/core';

import type { TypeFormFields } from '../../types/typeForm';
import { TextError } from '../Texts/TextError';

export const Input = (p: {
  id: TypeFormFields;
  isError?: string;
  label: string;
  name: string;
  type: 'text' | 'email';
  value?: string;
}) => {
  const [value, valueSet] = useState<string>('');

  useEffect(() => {
    p.value && valueSet(p.value);
  }, [p.value]);

  return (
    <>
      <MInput
        id={p.id}
        data-testid={'input__' + p.name}
        name={p.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          valueSet(e.target.value);
        }}
        placeholder={p.label}
        sx={{ width: '100%' }}
        value={value}
      />

      <TextError id={p.id} err={p.isError} />
    </>
  );
};
