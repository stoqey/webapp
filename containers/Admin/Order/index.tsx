
import React, { useState, useEffect } from 'react';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import Toaster from 'components/UiElements/Toaster/Toaster';
import { useApolloClient } from '@apollo/client';
import { MarketDataType } from '@stoqey/client-graphql';
import { useAppEvent } from 'hooks/useAppEvent';
import { APPEVENTS } from '@/lib/AppEvent';
import { toaster } from 'baseui/toast';
import OrdersListContainer from 'containers/OrderBook/OrdersListContainer';
import TradeEditor from 'containers/Trade/TradeEditor.modal';

const TITLE = 'Admin OrderBook';
const SUB_TITLE = 'Stoqey';

const AdminOrderBook = () => {

    let toastKey;
    const [show, setShow] = useState(false);
    const quote: MarketDataType = useAppEvent(APPEVENTS.CURRENCY);
    const client = useApolloClient();

    const onSuccess = (message: string) => {
		toastKey = toaster.positive(<>{message}</>, {
			autoHideDuration: 4000
		})
	}

	const onError = (message: string) => {
		toastKey = toaster.negative(<>{message}</>, {
			autoHideDuration: 5000
		})
	}

    return (
        <>
            <Toaster toastKey={toastKey} />
            <Block
                paddingTop={['10px', '10px', 0]}
                overrides={{
                    Block: {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '40px',
                        },
                    },
                }}
            >
                <Block>
                    <Block
                        as="h3"
                        overrides={{
                            Block: {
                                style: ({ $theme }) => {
                                    return {
                                        ...$theme.typography.font450,
                                        color: $theme.colors.primaryA,
                                        marginBottom: '10px',
                                    };
                                },
                            },
                        }}
                    >
                        {TITLE}
                    </Block>
                    <Block
                        as="p"
                        overrides={{
                            Block: {
                                style: ({ $theme }) => {
                                    return {
                                        ...$theme.typography.font200,
                                        color: $theme.colors.contentSecondary,
                                    };
                                },
                            },
                        }}
                    >
                        {SUB_TITLE}
                    </Block>
                </Block>
                <Block overrides={{ Block: { style: { flexShrink: 0 } } }}>
                    <Button
                        onClick={() => setShow(true)}
                        overrides={{
                            BaseButton: {
                                style: ({ $theme }) => {
                                    return {
                                        ...$theme.typography.font250,
                                    };
                                },
                            },
                        }}
                    >
                        TRADE
                    </Button>
                </Block>
            </Block>

            <Block
                overrides={{
                    Block: {
                        style: {
                            minHeight: '150px',
                        },
                    },
                }}
            >
                {/* Table here */}
                <OrdersListContainer />
            </Block>
            <TradeEditor quote={quote} onError={onError} onSuccess={onSuccess} show={show} hide={() => setShow(false)} />
			
        </>
    );
};

export default AdminOrderBook;
