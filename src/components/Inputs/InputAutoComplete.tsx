import { useState } from 'react';

import { Autocomplete } from '@mantine/core';

export const InputAutoComplete = (p: { data: any[]; label: string; name: string }) => {
  const [value, valueSet] = useState<string>('');

  return (
    <Autocomplete
      id={p.name}
      data={p.data}
      onChange={valueSet}
      placeholder={p.label}
      value={value}
    />
  );
};
