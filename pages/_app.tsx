import React from 'react';
import { AppProps } from 'next/app';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider, LightTheme, DarkTheme } from 'baseui';
import includes from 'lodash/includes';
import { ApolloProvider } from '@apollo/client';
import {
  AmplitudeProvider,
} from '@amplitude/react-amplitude';
import dynamic from 'next/dynamic';
import Layout from 'components/Layout/Layout';
import { styletron } from '../styletron';
import { ThemeSwitcherProvider, THEME } from '../contexts/theme/theme.provider';
import { CartProvider } from '../contexts/cart/cart.provider';
import { useApollo } from '@/lib/apollo.client';
// external css
import '@glidejs/glide/dist/css/glide.core.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'assets/css/reset.css';
import 'react-flexbox-grid/dist/react-flexbox-grid.css';
import 'typeface-open-sans';
import AuthChecker from 'containers/AuthChecker';
import Router, { useRouter } from 'next/router'


const WebsocketSubscription = dynamic(() => import('containers/Subscription'), { ssr: false });

export default function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [theme, setTheme] = React.useState(THEME.light);
  React.useEffect(() => {
    let SAVED_THEME = localStorage.getItem('theme');
    if (SAVED_THEME === null) {
      SAVED_THEME = THEME.light;
    }
    setTheme(SAVED_THEME);
  }, []);
  const apolloClient = useApollo(pageProps.initialApolloState);

  const removeLayout = includes(router.pathname, "embed");

  const WebApp = () => {
    return (
      <ApolloProvider client={apolloClient}>
        <WebsocketSubscription />
        <AuthChecker />
        <ThemeSwitcherProvider value={{ theme, setTheme }}>
          <StyletronProvider value={styletron} debugAfterHydration>
            <BaseProvider
              theme={
                theme === THEME.light
                  ? { ...LightTheme, direction: 'ltr' }
                  : { ...DarkTheme, direction: 'ltr' }
              }
            >
              {removeLayout ? (
                <Component {...pageProps} />
              ) : (
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              )}
            </BaseProvider>
          </StyletronProvider>
        </ThemeSwitcherProvider>
      </ApolloProvider>
    );
  }


  if (process.browser) {
    const amplitude = require('amplitude-js'); // eslint-disable-line @typescript-eslint/no-var-requires
    const amplitudeInstance = amplitude.getInstance();
    // https://help.amplitude.com/hc/en-us/articles/115001361248#settings-configuration-options
    amplitudeInstance.init(process.env.NEXT_PUBLIC_AMPLITUDE_KEY, null, {
      // userId,
      // logLevel: process.env.APP_STAGE === "production" ? "DISABLE" : "WARN",
      includeGclid: true,
      includeReferrer: true, // https://help.amplitude.com/hc/en-us/articles/215131888#track-referrers
      includeUtm: true,
      // @ts-ignore XXX onError should be allowed, see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/42005
      onError: (error) => {
        // Sentry.captureException(error);
        console.error(error); // eslint-disable-line no-console
      },
    });

    // amplitudeInstance.setVersionName(process.env.APP_VERSION); // e.g: 1.0.0

    return (
      <AmplitudeProvider
        amplitudeInstance={amplitudeInstance}
        apiKey={process.env.AMPLITUDE_API_KEY}
      // userId={userId}
      >
        <WebApp />
      </AmplitudeProvider>
    );
  }

  return <WebApp />



}
