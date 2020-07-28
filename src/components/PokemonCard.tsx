import React from 'react';

import styled, { theme } from '../themes';

import Pill from './Pill';

type PokemonCardType = {
  image?: string;
  number: string;
  name: string;
  types: string[];
  onClick?: () => void;
};

type ImageType = {
  url?: string;
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 300px;
  border-radius: 8px;
  background: ${(props) => props.theme.color.white};
  box-shadow: ${(props) => props.theme.boxShadow};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin: 10px;
  overflow: hidden;
  cursor: pointer;
  position: relative;

  &:hover {
    box-shadow: ${(props) => props.theme.boxShadowHover};
  }
`;

const Image = styled.div<ImageType>`
  width: 100%;
  height: 200px;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-size: 75% auto;
  background-position: center;
`;

const LabelNumber = styled.label`
  position: absolute;
  right: 0;
  top: 0;
  background: ${(props) => props.theme.color.red};
  padding: 0 5px;
  border-bottom-left-radius: 8px;
  font-weight: normal;
  font-size: 15px;
  color: white;
  z-index: 1;
`;

const Name = styled.label`
  margin: 0 5px;
  font-size: 20px;
  font-weight: bold;
`;

const TypeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const PokemonCard: React.FC<PokemonCardType> = (props) => {
  const { name, number, types, image, onClick } = props;
  return (
    <Root onClick={onClick}>
      <LabelNumber>#{number}</LabelNumber>
      <Image url={image} />
      <Name>{name}</Name>
      {types.length && (
        <TypeWrapper>
          {(types || []).map((item) => (
            <Pill
              key={item}
              background={theme.color.grey}
              textColor={theme.color.black}
            >
              {item}
            </Pill>
          ))}
        </TypeWrapper>
      )}
    </Root>
  );
};

export default PokemonCard;
