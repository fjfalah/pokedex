import { ApolloProvider } from '@apollo/client';
import { mount } from 'enzyme';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';

import PokemonDetailPage from '../src/pages/[id]';
import { theme } from '../src/themes';
import client from '../src/utils/apolloClient';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/[id]',
      pathname: '/[id]',
      query: { id: 'pikachu' },
      asPath: '/pikachu',
    };
  },
}));

const mountWithProvider = (component: React.ReactNode) => {
  return mount(
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>{component}</ApolloProvider>
    </ThemeProvider>
  );
};

describe('Test - GraphQL', () => {
  it('Should Route to Pikachu Detail', () => {
    const wrapper = mountWithProvider(<PokemonDetailPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
