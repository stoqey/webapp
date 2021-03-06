import React, { useEffect, useState } from 'react';
import { Button } from 'baseui/button';
import { Block } from 'baseui/block'
import ConfirmModal, { ModalActions } from '@/components/Confirm.modal';
import { PaymentMethodType, StatusType } from '@stoqey/client-graphql';
import AddPaymentMethod from './PaymentMethod.editor.add';
import { deletePaymentMethodMutation, getPaymentMethodsPaginationApi } from './PaymentMethod.api';
import { useApolloClient } from '@apollo/client';
import { PaymentMethodLists } from './PaymentMethod.editor.list';
import { PaymentMethodItem } from './PaymentMethod.editor.item';
import { isEmpty } from 'lodash';


interface State {

    // Editor state for creating new
    // name?: string;
    // type?: string;
    // info?: string;

    paymentMethod: PaymentMethodType,
    paymentMethods: PaymentMethodType[],
    dialogShow: boolean;
    dialogMessage: string;
    dialogTitle: string;
    dialogType: StatusType;
    dialogActions: ModalActions;
    dialogAdd?: boolean;
}

interface Props {
    onChangeMethod: (paymentMethod: PaymentMethodType) => void;
}

export const PaymentMethodEditor = (props: Props) => {

    const { onChangeMethod } = props;
    const client = useApolloClient();
    const [state, setState] = useState<State>({
        paymentMethod: null,
        paymentMethods: [],
        dialogShow: false,
        dialogMessage: "",
        dialogTitle: "",
        dialogType: StatusType.DRAFT,
        dialogActions: null,
        dialogAdd: false,
    });

    const { dialogTitle, dialogMessage, dialogShow, dialogActions, dialogType, dialogAdd, paymentMethods, paymentMethod = paymentMethods[0] } = state;

    const handleChange = (field: string) => {
        return (val: any) => {
            setState({
                ...state,
                [field]: val,
            })
        }
    };

    const hideModal = () => handleChange("dialogShow")(false);


    const deletePaymentMethodsApi = (id: string) => deletePaymentMethodMutation({
        client,
        args: {
            id
        },
        success: async (data: any[]) => {
            // handleChange("paymentMethods")(data);
            fetchPaymentMethods();
        },
        error: async () => {

        }
    });

    const deletePaymentMethod = (paymentMethodObj: PaymentMethodType) => {
        console.log('delete item', paymentMethodObj);
        // setState({
        //     ...state,
        //     dialogAdd: true,
        //     dialogShow: true,
        //     dialogMessage: `Are you sure you want to delete ${paymentMethodObj.name}`,
        //     dialogTitle: `Delete ${paymentMethodObj.name}`,
        //     dialogType: StatusType.DRAFT,
        //     dialogActions: {
        //         cancel: {
        //             onPress: () => hideModal(),
        //             title: "Cancel"
        //         },
        //         confirm: {
        //             title: "Delete payment method",
        //             onPress: () => deletePaymentMethodsApi(paymentMethodObj.id)
        //         }
        //     },
        // })

        setState({
            ...state,
            // dialogAdd: true,
            dialogShow: true,
            dialogMessage: "",
            dialogTitle: "Add payment method",
            dialogType: StatusType.DRAFT,
            dialogActions: null,
        })
    }

    const fetchPaymentMethods = () => getPaymentMethodsPaginationApi({
        client,
        args: {},
        success: async (data: any[]) => {
            console.log("payment methods are", data.length);
            handleChange("paymentMethods")(data);
        },
        error: async () => {

        }
    });

    useEffect(() => {
        fetchPaymentMethods();
    }, [dialogShow])

    return (<>

        {dialogShow && (
            <ConfirmModal
                hide={hideModal}
                title={dialogTitle}
                description={dialogMessage}
                show={dialogShow}
                actions={dialogActions}
                status={dialogType}
            >
                {dialogAdd && (<AddPaymentMethod hide={hideModal} />)}
            </ConfirmModal>
        )}


        {/* PaymentMethod List */}
        {/* <Block>
            <PaymentMethodLists 
            deleteItem={deletePaymentMethod} 
            items={paymentMethods}
            setSelected={(val) => handleChange("paymentMethod")(val)}
             />
        </Block> */}

        <Block>
            {!isEmpty(paymentMethods) && paymentMethods.map((i) => {
                return <PaymentMethodItem {...i} deleteItem={deletePaymentMethod} isSelected={(i && i.id) === (paymentMethod && paymentMethod.id)} setSelected={(val) => {handleChange("paymentMethod")(val); onChangeMethod(val)}} />
            })}
        </Block>

        <Block>
            <Button
                // isLoading={loading}
                shape="pill"
                size="default"
                onClick={() => {
                    setState({
                        ...state,
                        dialogAdd: true,
                        dialogShow: true,
                        dialogMessage: "",
                        dialogTitle: "Add payment method",
                        dialogType: StatusType.DRAFT,
                        dialogActions: null,
                    })
                }}
                overrides={{
                    BaseButton: {
                        style: ({ $theme }) => {
                            return {
                                width: '100%',
                                ...$theme.typography.font250,
                            };
                        },
                    },
                }}
            > Add payment method </Button>

        </Block>

        <br />

    </>)
}

export default PaymentMethodEditor;