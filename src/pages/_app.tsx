import { Fragment } from 'react';
import Global from '../styles/Global';

export default function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Global />
      <Component {...pageProps} />
    </Fragment>
  );
}
