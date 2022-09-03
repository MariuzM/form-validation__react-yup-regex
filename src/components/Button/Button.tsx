import { Button as MButton } from '@mantine/core';

export const Button = (p: { 'data-testid': string; name: string; type?: 'submit' | 'button' }) => {
  return (
    <MButton data-testid={p['data-testid']} {...(p.type && { type: p.type })}>
      {p.name}
    </MButton>
  );
};
