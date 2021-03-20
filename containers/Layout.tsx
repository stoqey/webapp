import React from 'react';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider, LightTheme, DarkTheme } from 'baseui';
import dynamic from 'next/dynamic';
import { withApollo } from '@apollo/client/react/hoc';
import Layout from 'components/Layout/Layout';
import { styletron } from '../styletron';
import { ThemeSwitcherProvider, THEME } from '../contexts/theme/theme.provider';
import { CartProvider } from '../contexts/cart/cart.provider';
import AuthChecker from 'containers/AuthChecker';

const WebsocketSubscription = dynamic(() => import('containers/Subscription'), { ssr: false });

interface Props {
    children?: any;
    embed?: boolean;
}
function MainLayout(props: Props) {
    const { children, embed } = props;
    return (
        <>
            {/* Persistant websocket */}
            <WebsocketSubscription />
            {!embed && <AuthChecker />}
            <CartProvider>
                {!embed ? (
                    <Layout>
                        {children}
                    </Layout>
                ) : ({ children })}
            </CartProvider>
        </>
    );
}

export const WithLayout = withApollo(MainLayout);
export default WithLayout;
