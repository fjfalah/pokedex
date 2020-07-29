import styled from 'styled-components';

const Section = styled.section`
  padding: 40px 100px;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 720px) {
    padding: 40px 20px;
  }
`;

export default Section;
