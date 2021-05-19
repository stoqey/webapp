import React, { useState } from 'react';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { FormControl } from 'baseui/form-control';
import { Button } from 'baseui/button';
import { Select } from "baseui/select";
import { Input } from 'baseui/input';
import ConfirmModal, { ModalActions } from '@/components/Confirm.modal';
import { PaymentMethodType, StatusType } from '@stoqey/client-graphql';

interface State {

    // Editor state for creating new
    name?: string;
    type?: string;
    info?: string;

    paymentMethod: PaymentMethodType,
    paymentMethods: PaymentMethodType[],
    dialogShow: boolean;
    dialogMessage: string;
    dialogTitle: string;
    dialogType: StatusType;
    dialogActions: ModalActions;
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
    });

    const { name, type, info, dialogTitle, dialogMessage, dialogShow, dialogActions, dialogType } = state;

    const handleChange = (field: string) => {
        return (val: any) => {
            setState({
                ...state,
                [field]: val,
            })
        }
    };

    const hideModal = () => handleChange("dialogShow")(false);

    console.log("selected payment method", type);

    return (<>
        <ConfirmModal
            hide={hideModal}
            title={dialogTitle}
            description={dialogMessage}
            show={dialogShow}
            actions={dialogActions}
            status={dialogType}
        />
        <FlexGridItem>
            <FormControl
                label="Payment method type"
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
                <Select
                    options={[
                        { label: "Bank account", id: "bank" },
                        { label: "E-transfer", id: "etransfer" },
                        { label: "Mobile money", id: "mobilemoney" }
                    ]}

                    labelKey="label"
                    valueKey="id"
                    onChange={({ value }) => handleChange("type")(value)}
                    value={type as any}
                    placeholder="Payment method type"
                />
            </FormControl>

            <FormControl
                label="Payment method name"
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
                    // TODO type 
                    name="name"
                    value={name}
                    onChange={(event: any) => handleChange("name")(event.target.value)}
                    overrides={{
                        InputContainer: {
                            style: () => {
                                return { backgroundColor: 'transparent' };
                            },
                        },
                    }}
                />
            </FormControl>

            <FormControl
                label="Payment method info"
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
                    // TODO type 
                    name="info"
                    value={info}
                    onChange={(event: any) => handleChange("info")(event.target.value)}
                    overrides={{
                        InputContainer: {
                            style: () => {
                                return { backgroundColor: 'transparent' };
                            },
                        },
                    }}
                />
            </FormControl>

            <Button
                // isLoading={loading}
                shape="pill"
                size="default"
                // onClick={() => confirm.onPress()}
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

        </FlexGridItem>

    </>)
}

export default PaymentMethodEditor;