import React, { useState } from 'react';
import { Button } from 'baseui/button';
import { toaster } from 'baseui/toast';
import { Modal, ModalHeader, ModalBody } from 'baseui/modal';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { useUserInfo } from 'hooks/useUserInfo';
import { H4 } from 'baseui/typography';
import { niceDec } from 'utils/number';

import { createUpdateWithdrawRequestMutation } from './WithdrawRequest.api'
import { useApolloClient } from '@apollo/react-hooks';

interface State {
    amount: number;
    status: any;
}

export const WithdrawForm = () => {
    const client = useApolloClient();
    const { user } = useUserInfo();
    const balance = user && user.balance || 0;
    const [state, setState] = useState<State>({ amount: 1, status: false });

    const { amount } = state;

    const createWithdraw = () => createUpdateWithdrawRequestMutation({
        client,
        args: { amount },
        success: async (res) => {
            setState({
                ...state,
                status: true,
            })
        }
    })


    return (<>
        <FlexGrid flexGridColumnCount={1}>
            <FlexGridItem>
                <H4>${niceDec(balance - +amount)}</H4>
            </FlexGridItem>
            <FlexGridItem>
                <FormControl
                    label="Enter amount to withdraw"
                    // error={error && 'Please fill out balance'}
                    overrides={{
                        Label: {
                            style: ({ $theme }) => {
                                return {
                                    textAlign: 'center',
                                    ...$theme.typography.font200
                                };
                            },
                        },
                    }}
                >
                    <Input
                        type="number"
                        name="amount"
                        value={amount}
                        error={+amount < 0 || balance < 0}
                        onChange={(event: any) => setState({ amount: event.target.value})}
                        overrides={{
                            InputContainer: {
                                style: () => {
                                    return { backgroundColor: 'transparent' };
                                },
                            },
                        }}
                    />
                </FormControl>
            </FlexGridItem>


            <FlexGridItem
                overrides={{ Block: { style: { marginTop: '10px', justifyContent: "center", display: "flex" } } }}
            >
                <Button
                    // onClick={updateUserBalance}
                    shape="pill"
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
                    {'Submit Withdraw request'}
                </Button>
            </FlexGridItem>
        </FlexGrid>
    </>
    )
}