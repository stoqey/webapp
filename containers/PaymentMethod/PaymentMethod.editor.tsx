import React, { useState } from 'react';
import { Button } from 'baseui/button';
import ConfirmModal, { ModalActions } from '@/components/Confirm.modal';
import { PaymentMethodType, StatusType } from '@stoqey/client-graphql';
import AddPaymentMethod from './PaymentMethod.editor.add';

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
    onChangeMethod: () => void;
}

export const PaymentMethodEditor = () => {
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

    const { dialogTitle, dialogMessage, dialogShow, dialogActions, dialogType, dialogAdd } = state;

    const handleChange = (field: string) => {
        return (val: any) => {
            setState({
                ...state,
                [field]: val,
            })
        }
    };

    const hideModal = () => handleChange("dialogShow")(false);

    return (<>
        <ConfirmModal
            hide={hideModal}
            title={dialogTitle}
            description={dialogMessage}
            show={dialogShow}
            actions={dialogActions}
            status={dialogType}
        >
            {dialogAdd && (<AddPaymentMethod />)}
        </ConfirmModal>

        <Button
            // isLoading={loading}
            shape="pill"
            size="default"
            onClick={() => {
                setState({
                    ...state,
                    dialogAdd: true,
                    dialogShow: true,
                    dialogMessage: "Add Payment method",
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

    </>)
}

export default PaymentMethodEditor;