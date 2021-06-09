import React, { useState } from 'react';
import { Button } from 'baseui/button';
import { toaster } from 'baseui/toast';
import { Modal, ModalHeader, ModalBody } from 'baseui/modal';
import { StatusType, PaymentMethodType } from '@stoqey/client-graphql';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { useUserInfo } from 'hooks/useUserInfo';
import { H4 } from 'baseui/typography';
import { niceDec } from 'utils/number';

import { createUpdateWithdrawRequestMutation, getWithdrawRequestsPaginationApi, cancelWithdrawRequestMutation } from './WithdrawRequest.api';
import WithdrawRequestItem from './WithdrawRequests.item';

import { useApolloClient } from '@apollo/client';
import { WithdrawRequestType } from '@stoqey/client-graphql';
import ConfirmModal, { ModalActions } from '@/components/Confirm.modal';
import { isEmpty } from 'lodash';

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

interface Props {
    paymentMethod: PaymentMethodType;
}

export const WithdrawForm = (props: Props) => {
    const { paymentMethod } = props;
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
            getDataApi(); // refresh
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

    const cancelWithdraw = (id: string) => cancelWithdrawRequestMutation({
        client,
        args: { id },
        success: async (res) => {
            setState({
                ...state,
                status: true,
                dialogShow: true,
                dialogMessage: "Successfully deleted Withdraw request",
                dialogTitle: "Success",
                dialogType: StatusType.SUCCESS,
                dialogActions: null,
            })
            getDataApi(); // call api for refresh
        },
        error: async (err) => {
            console.log("error deleting withdraw", err);
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
        args: { filter: "active" },
        error: async () => {

        },
        success: async (data) => setState({ ...state, requests: data.filter(o => !isEmpty(o.status)) })
    })

    React.useEffect(() => { getDataApi() }, []);

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
                const { amount: itemAmount, id } = item;
                showModal({
                    dialogMessage: `You're about to delete your request of a withdraw of ${niceDec(+itemAmount)}`,
                    dialogTitle: `Delete request of ${niceDec(+itemAmount)}`,
                    dialogType: StatusType.FAIL,
                    dialogActions: {
                        cancel: {
                            onPress: () => hideModal(),
                            title: "Cancel"
                        },
                        confirm: {
                            title: "Delete withdraw request",
                            onPress: () => cancelWithdraw(id)
                        }
                    }
                });

            }}
            key={`${index}-${i.id}`} {...i} />)}

        <FlexGrid flexGridColumnCount={1}>
            <FlexGridItem>
                <FormControl
                    label="Payment method"
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
                        name="paymentmethod"
                        value={paymentMethod && paymentMethod.name}
                        disabled={true}
                        placeholder={paymentMethod ? paymentMethod.name : "Select/Add payment method"}
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
                        if(!paymentMethod){
                            // show payment method dialog
                            return showModal({
                                dialogMessage: `Please add a payment method and select it`,
                                dialogTitle: `Add a payment method`,
                                dialogType: StatusType.FAIL,
                                dialogActions: null,
                            });
                        }
                        
                        showModal({
                            dialogMessage: `You're about to request a withdraw of ${niceDec(+amount)}`,
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