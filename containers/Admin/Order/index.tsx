
import React, { useState, useEffect } from 'react';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import Toaster from 'components/UiElements/Toaster/Toaster';
import { useApolloClient } from '@apollo/client';
import { MarketDataType } from '@stoqey/client-graphql';
import { useAppEvent } from 'hooks/useAppEvent';
import { APPEVENTS } from '@/lib/AppEvent';

const TITLE = 'Admin OrderBook';
const SUB_TITLE = 'Stoqey';

const AdminOrderBook = () => {

    let toastKey;
    const [showClose, setShowClose] = useState(false);
    const quote: MarketDataType = useAppEvent(APPEVENTS.CURRENCY);

    const client = useApolloClient();

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
                        onClick={() => {}}
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
                        Add User
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
            </Block>

        </>
    );
};

export default AdminOrderBook;
