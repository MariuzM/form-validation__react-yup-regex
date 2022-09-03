import { useMemo, useState } from 'react';

import styled from '@emotion/styled';
import { Input } from '@mantine/core';

import { countryList } from '../../data/dataCountryList';
import type { TypeCountry } from '../../types/typeCountries';
import type { TypeFormFields } from '../../types/typeForm';
import { TextError } from '../Texts/TextError';

export const InputDropDown = (p: {
  id: TypeFormFields;
  selectedItem: React.Dispatch<React.SetStateAction<TypeCountry | null>>;
  isError?: string;
}) => {
  const [isListOpen, isListOpenSet] = useState<boolean>(false);
  const [list, listSet] = useState<TypeCountry[]>([]);
  const [searchText, searchTextSet] = useState<string>('');

  const memoCountryList = useMemo(() => {
    return list.map((el) => {
      return (
        <option
          key={el.id}
          className="drop-down-item"
          onClick={(e) => {
            p.selectedItem(el);
            searchTextSet(el.value);
            isListOpenSet(false);
          }}
        >
          {el.value}
        </option>
      );
    });
  }, [list, p]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchTextSet(e.target.value);
    let match: TypeCountry[] = [];

    if (e.target.value.length > 0) {
      match = countryList.filter((el) => {
        const reg = new RegExp(`${e.target.value}`, 'gi');
        if (el?.value) {
          return el.value.match(reg);
        }
      });

      listSet(match);
      match.length === 0 && p.selectedItem(null);
      return;
    }

    if (e.target.value === '') {
      listSet(countryList);
      searchTextSet('');
      p.selectedItem(null);
      return;
    }
  };

  return (
    <SDiv className="input-drop-down">
      <Input
        id={p.id}
        data-testid={'input__' + p.id}
        name="searchText"
        onChange={onChange}
        onFocus={() => {
          isListOpenSet(true);
          listSet(countryList);
        }}
        placeholder={'Company'}
        sx={{ width: '100%' }}
        value={searchText}
        type="text"
      />

      {isListOpen && (
        <div data-testid={'drop-down__' + p.id} className="drop-down-list">
          {memoCountryList}
        </div>
      )}

      <TextError id="country" err={p.isError} />
    </SDiv>
  );
};

const SDiv = styled.div`
  position: relative;

  .drop-down-list {
    background-color: white;
    border-radius: 4px;
    border: 1px solid #cdcdcd;
    margin-top: 5px;
    max-height: 200px;
    overflow-y: scroll;
    position: absolute;
    width: 100%;
    z-index: 1;

    .drop-down-item {
      padding: 2px 5px;

      :hover {
        background-color: #d4d4d4;
      }
    }
  }
`;
