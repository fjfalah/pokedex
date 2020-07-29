import React, { SelectHTMLAttributes } from 'react';

import styled from '../themes';

type OptionDataTypes = { value: string; label: string };

type SelectType = {
  optionData: Array<OptionDataTypes>;
  selectPlaceholder?: string;
};

const SelectBox = styled.select`
  outline: unset;
  padding: 16px;
  border: 0;
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.boxShadow};
  min-width: 300px;

  &:focus {
    box-shadow: ${(props) => props.theme.boxShadowHover};
  }
`;

const Option = styled.option``;

const Select: React.FC<SelectHTMLAttributes<HTMLSelectElement> & SelectType> = (
  props
) => {
  const { optionData, selectPlaceholder, ...mainProps } = props;

  return (
    <SelectBox {...mainProps}>
      <Option value="">{selectPlaceholder || 'All'}</Option>
      {(optionData || []).map((item: OptionDataTypes) => {
        return <Option value={item.value}>{item.label}</Option>;
      })}
    </SelectBox>
  );
};

export default Select;
