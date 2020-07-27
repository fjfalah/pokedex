import { AppProps } from 'next/app';
import React from 'react';

const AppRoot: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default AppRoot;
