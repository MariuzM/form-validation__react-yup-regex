import { Text } from '@mantine/core';

export const TextError = (p: { id: string; err?: string }) => {
  return (
    <Text data-testid={`error__${p.id}`} color={'red'}>
      {p.err}
    </Text>
  );
};
