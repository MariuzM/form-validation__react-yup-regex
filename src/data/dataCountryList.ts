import type { TypeCountry } from '../types/typeCountries';

export const countryList: TypeCountry[] = [
  {
    id: 1,
    value: 'Australia',
    format: 'IN-[2 Digits][2 Letters]-[5 or 7]',
    example: 'IN-12ab-12345',
    regEx: /^[IN]{2}-[\d]{2}[a-zA-Z]{2}-[\d]{5}$/g,
  },
  {
    id: 2,
    value: 'Canada',
    format: '[10 symbols digits or letters A,B or D]-[2 letters]',
    example: 'abcde@!!21-22',
    regEx: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{10}-[\d]{2}$/,
  },
  {
    id: 3,
    value: 'Germany',
    format: 'IN or NI-[2 Digits][2 Letters]-[5]',
    example: 'IN-12ab-12335',
    regEx: /^[?:IN|NI]{2}-[\d]{2}[a-zA-Z]{2}-([\d]{5})$/,
  },
  {
    id: 4,
    value: 'Japan',
    format: '[2 Letters]-[2 Digits][2 Letters]-[5 or 7 Digits]',
    example: 'ab-12ab-12345',
    regEx: /^[a-zA-Z]{2}-[\d]{2}[a-zA-Z]{2}-([\d]{5}|[\d]{7})$/,
  },
  {
    id: 5,
    value: 'Lithuania',
    format: 'LT[5 Digits]-[5 Digits]',
    example: 'LT-12345-12335',
    regEx: /^[LT]{2}-[\d]{5}-([\d]{5})$/,
  },
];
