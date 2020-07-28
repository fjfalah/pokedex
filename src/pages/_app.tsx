import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from '../components/GlobalStyles';
import { theme } from '../themes';
import client from '../utils/apolloClient';

const AppRoot: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
        <GlobalStyles />
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default AppRoot;
