import styled from '../themes';

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: 720px) {
    flex-direction: column;
  }
`;

export const Title = styled.h2`
  font-size: 40px;
  font-weight: bold;
  color: ${(props) => props.theme.color.green};
`;

export const Label = styled.label`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.color.black};
`;

export const CloseButton = styled.b`
  cursor: pointer;
  padding: 0 8px;
  font-size: 15px;
  background: ${(props) => props.theme.color.red};
  color: ${(props) => props.theme.color.white};
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.boxShadow};
`;
export const PokemonsWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  justify-content: center;
`;

export const PokemonItem = styled.a`
  text-decoration: none;
  color: unset;
`;

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 20px;

  > label {
    margin-right: 20px;
  }
`;
