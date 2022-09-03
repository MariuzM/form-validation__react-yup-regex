import { useState } from 'react';

import styled from '@emotion/styled';
import { Group, Loader, Text } from '@mantine/core';
import * as yup from 'yup';

import { formValidationMessages as msg } from '../../data/dataFormValidationMessages';
import type { TypeCountry } from '../../types/typeCountries';
import type { TypeFormValues } from '../../types/typeForm';
import { yupErrGenerator } from '../../utils/forms';
import { Button } from '../Button/Button';
import { Input } from '../Inputs/Input';
import { InputDropDown } from '../Inputs/InputDropDown';
import { TextError } from '../Texts/TextError';

export const Form = () => {
  const [formError, formErrorSet] = useState<TypeFormValues | null>(null);
  const [selectedCountry, selectedCountrySet] = useState<TypeCountry | null>(null);
  const [serverErr, serverErrSet] = useState<string>('');
  const [isLoading, isLoadingSet] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = document.querySelector('#form');
    const { value: name } = form?.querySelector('#name') as HTMLInputElement;
    const { value: country } = form?.querySelector('#country') as HTMLInputElement;
    const { value: taxId } = form?.querySelector('#taxid') as HTMLInputElement;

    const schema = yup.object().shape({
      name: yup.string().min(3, msg.nameMin3Chars).required(msg.nameRequired),
      country: yup.string().required(msg.countryRequired),
      taxId: yup
        .string()
        .when('country', {
          is: (country: string) => (country ? false : true),
          then: yup.string().required(msg.taxIdCountryNotSelected),
        })
        .matches(selectedCountry?.regEx as RegExp, msg.taxIdNotMatch)
        .required(msg.taxIdRequired),
    });

    schema
      .validate({ name, country, taxId }, { abortEarly: false, strict: true })
      .then(async () => {
        formErrorSet(null);
        isLoadingSet(true);

        try {
          const isServerError = true;
          const res = await fetch(`https://www.marius.dev/api/${isServerError ? 'err' : 'hello'}`);
          if (res.status !== 200) serverErrSet('Server issue');
          else serverErr && serverErrSet('');
        } catch (error) {
          serverErrSet('Server issue');
        }

        isLoadingSet(false);
      })
      .catch((err: yup.ValidationError) => {
        yupErrGenerator(err, formErrorSet);
        isLoadingSet(false);
      });
  };

  return (
    <SDiv data-testid="form-container" className="form">
      {serverErr && <TextError id="server" err="Server Issue" />}
      {isLoading && <Loader />}

      <form id="form" data-testid="form" onSubmit={onSubmit}>
        <div data-testid="form-field__name" className="form-field__name">
          <Input id="name" label="Name" name="name" type="text" isError={formError?.name} />
        </div>

        <div data-testid="form-field__country" className="form-field__country">
          <InputDropDown
            id="country"
            selectedItem={selectedCountrySet}
            isError={formError?.country}
          />
        </div>

        <div data-testid="form-field__taxid" className="form-field__taxid">
          <Input id="taxid" name="taxid" label="Tax Id" type="text" isError={formError?.taxId} />

          {selectedCountry?.format && (
            <div data-testid="pattern-container" className="pattern-container">
              <Text color="gray">{selectedCountry.format}</Text>
              <Group>
                <Text color="gray">Example:</Text>
                <Text color="green">{selectedCountry.example}</Text>
              </Group>
            </div>
          )}
        </div>

        <Button data-testid="form-field__submit" name="Submit" type="submit" />
      </form>
    </SDiv>
  );
};

const SDiv = styled.div`
  width: 500px;

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
