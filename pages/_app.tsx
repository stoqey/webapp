import React from 'react';
import { AppProps } from 'next/app';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider, LightTheme, DarkTheme } from 'baseui';
import { styletron } from '@/styletron';
import Layout from 'components/Layout/Layout';
import { ThemeSwitcherProvider, THEME } from '@/contexts/theme/theme.provider';
import { CartProvider } from '@/contexts/cart/cart.provider';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@/lib/apollo.client';
// external css
import '@glidejs/glide/dist/css/glide.core.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'assets/css/reset.css';
import 'react-flexbox-grid/dist/react-flexbox-grid.css';
import 'typeface-open-sans';
export default function CustomApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = React.useState(THEME.light);
  React.useEffect(() => {
    let SAVED_THEME = localStorage.getItem('theme');
    if (SAVED_THEME === null) {
      SAVED_THEME = THEME.light;
    }
    setTheme(SAVED_THEME);
  }, []);
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeSwitcherProvider value={{ theme, setTheme }}>
        <StyletronProvider value={styletron} debugAfterHydration>
          <BaseProvider
            theme={
              theme === THEME.light
                ? { ...LightTheme, direction: 'ltr' }
                : { ...DarkTheme, direction: 'ltr' }
            }
          >
            <CartProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </CartProvider>
          </BaseProvider>
        </StyletronProvider>
      </ThemeSwitcherProvider>
    </ApolloProvider>
  );
}
