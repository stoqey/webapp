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

function MainWrapper(Component, embed?: boolean) {
    return class extends React.Component {
        componentDidUpdate(prevProps) {
            // console.log('Current props: ', this.props);
            // console.log('Previous props: ', prevProps);
        }
        render() {
            // Wraps the input component in a container, without mutating it. Good!
            return <>
                {/* Persistant websocket */}
                <WebsocketSubscription />
                {!embed && <AuthChecker />}
                <CartProvider>
                    {!embed ? (
                        <Layout>
                            <Component {...this.props} />
                        </Layout>
                    ) : <Component  {...this.props} />}
                </CartProvider>
            </>;
        }
    }
}
export default MainWrapper;
