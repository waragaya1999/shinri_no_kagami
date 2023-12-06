import { SessionProvider } from 'next-auth/react';
import { initializeFirebaseApp } from '../src/lib/firebase/firebase'
import { getApp } from 'firebase/app'

initializeFirebaseApp()
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  console.log(getApp())
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;