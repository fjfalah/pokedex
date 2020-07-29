import styled from '../themes';

export const HeaderWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ContentWrapper = styled(HeaderWrapper)`
  align-items: flex-start;

  @media only screen and (max-width: 720px) {
    flex-direction: column;
  }
`;

export const ButonBack = styled.div`
  font-size: 25px;
  font-weight: bold;
  cursor: pointer;
  color: ${(props) => props.theme.color.green};
`;

export const Title = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: ${(props) => props.theme.color.green};
`;

export const Number = styled.label`
  color: ${(props) => props.theme.color.red};
`;

export const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  margin-right: 20px;
  @media only screen and (max-width: 720px) {
    width: unset;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 500px;
  height: 500px;
  background-color: ${(props) => props.theme.color.white};
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const NumberLabel = styled.label`
  position: absolute;
  top: 0;
  right: 0;
  background: ${(props) => props.theme.color.red};
  color: ${(props) => props.theme.color.white};
  border-bottom-left-radius: 8px;
  padding: 4px 16px;
  font-size: 20px;
`;

export const Image = styled.div<{ url?: string }>`
  width: 500px;
  height: 500px;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-size: 75% auto;
  background-position: center;
`;

export const DetailWrapper = styled.div`
  flex: 1;
  @media only screen and (max-width: 720px) {
    width: 100%;
  }
`;

export const DetailItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.boxShadow};
  background-color: ${(props) => props.theme.color.white};
  margin-bottom: 20px;
`;

export const DetailItemTitle = styled.label`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.color.green};
  margin-bottom: 10px;
`;

export const SubTitle = styled.label`
  font-size: 15px;
  font-weight: bold;
  margin-top: 5px;
`;

export const Text = styled.p`
  font-size: 15px;
  padding: 0;
  margin: 0;
`;

export const PillWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const PokemonItem = styled.a`
  text-decoration: none;
  color: unset;
`;
