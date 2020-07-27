import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  padding: 10px;
`;

const Text = styled.p`
  font-size: 20px;
`;

const HomePage: React.FC = () => {
  return (
    <Root>
      <Text>Welcome to Pokedex!</Text>
    </Root>
  );
};

export default HomePage;
