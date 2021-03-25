import React from 'react';
import { AppProps } from 'next/app';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider, LightTheme, DarkTheme } from 'baseui';
import includes from 'lodash/includes';
import { ApolloProvider } from '@apollo/client';
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
