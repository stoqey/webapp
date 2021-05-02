import React, { useState } from 'react';
import { Button } from 'baseui/button';
import { toaster } from 'baseui/toast';
import { Modal, ModalHeader, ModalBody } from 'baseui/modal';
import { StatusType } from '@stoqey/client-graphql';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { useUserInfo } from 'hooks/useUserInfo';
import { H4 } from 'baseui/typography';
import { niceDec } from 'utils/number';

import { createUpdateWithdrawRequestMutation, getWithdrawRequestsPaginationApi } from './WithdrawRequest.api';
import WithdrawRequestItem from './WithdrawRequests.item';

import { useApolloClient } from '@apollo/client';
import { WithdrawRequestType } from '@stoqey/client-graphql';
import ConfirmModal, { ModalActions } from '@/components/Confirm.modal';

interface State {
    amount: number;
    status: any;
    requests: WithdrawRequestType[],

    dialogShow: boolean;
    dialogMessage: string;
    dialogTitle: string;
    dialogType: StatusType;
    dialogActions: ModalActions;
}

export const WithdrawForm = () => {
    const client = useApolloClient();
    const { user } = useUserInfo();
    const balance = user && user.balance || 0;
    const [state, setState] = useState<State>({
        amount: 1,
        status: false,
        requests: [],
        dialogShow: false,
        dialogMessage: "",
        dialogTitle: "",
        dialogType: StatusType.DRAFT,
        dialogActions: null,
    });


    const { amount, requests, dialogShow, dialogTitle, dialogMessage, dialogType, dialogActions } = state;

    const hideModal = () => {
        setState({
            ...state,
            dialogShow: false,
        })
    };

    const showModal = (newState: Partial<State>) => {
        setState({
            ...state,
            ...newState,
            dialogShow: true,
        })
    };


    const createWithdraw = () => createUpdateWithdrawRequestMutation({
        client,
        args: { amount },
        success: async (res) => {
            setState({
                ...state,
                status: true,
                dialogShow: true,
                dialogMessage: "Withdraw request submited",
                dialogTitle: "Success",
                dialogType: StatusType.SUCCESS,
                dialogActions: null,
            })
        },
        error: async (err) => {
            console.log("error creating withdraw", err);
            setState({
                ...state,
                status: true,
                dialogShow: true,
                dialogMessage: err && err.message,
                dialogTitle: "Error",
                dialogType: StatusType.FAIL,
                dialogActions: null,
            })
        }
    });

    const getDataApi = () => getWithdrawRequestsPaginationApi({
        client,
        // args: {},
        error: async () => {

        },
        success: async (data) => setState({ ...state, requests: data })
    })

    React.useEffect(() => { getDataApi() }, [dialogShow]);

    return (<>

        <ConfirmModal
            hide={hideModal}
            title={dialogTitle}
            description={dialogMessage}
            show={dialogShow}
            actions={dialogActions}
            status={dialogType}
        />

        {/* Pending requests here */}
        {(requests || []).map((i, index) => <WithdrawRequestItem
            deleteItem={(item) => {
                const { amount: itemAmount } = item;
                showModal({
                    dialogMessage: `You're about to delete your request of a withdraw of $${niceDec(+itemAmount)}`,
                    dialogTitle: `Delete request fro ${niceDec(+itemAmount)}`,
                    dialogType: StatusType.FAIL,
                    dialogActions: {
                        cancel: {
                            onPress: () => hideModal(),
                            title: "Cancel"
                        },
                        confirm: {
                            title: "Delete request",
                            onPress: () => {
                                console.log("can we delete this item")
                            }
                        }
                    }
                });

            }}
            key={`${index}-${i.id}`} {...i} />)}

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
                        onChange={(event: any) => setState({ ...state, amount: event.target.value })}
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
                    onClick={() => {
                        showModal({
                            dialogMessage: `You're about to request a withdraw of $${niceDec(+amount)}`,
                            dialogTitle: `Withdraw ${niceDec(+amount)}`,
                            dialogType: StatusType.PROCESSING,
                            dialogActions: {
                                confirm: {
                                    onPress: () => {
                                        createWithdraw();
                                        // TODO hide modal with status
                                    },
                                    title: "Submit"
                                },
                                cancel: {
                                    onPress: () => hideModal(),
                                    title: "Cancel"
                                }
                            }
                        });

                    }}
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