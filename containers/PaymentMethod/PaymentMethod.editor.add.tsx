import React, { useState } from 'react';
import { FlexGridItem } from 'baseui/flex-grid';
import { FormControl } from 'baseui/form-control';
import { Button } from 'baseui/button';
import { ButtonGroup } from "baseui/button-group";
import { Select } from "baseui/select";
import { Input } from 'baseui/input';
import { createUpdatePaymentMethodMutation } from './PaymentMethod.api';
import { useApolloClient, ApolloClient } from '@apollo/client';


interface Props {
    hide: () => void;
}
interface State {

    // Editor state for creating new
    name?: string;
    type?: string;
    info?: string;

    loading?: boolean;

}

const paymentMethods = [
    { label: "Bank account", id: "bank", hint: "Bank account, swift, country" },
    { label: "E-transfer", id: "etransfer", hint: "email or phone" },
    { label: "Mobile money", id: "mobilemoney", hint: "phone" },
    { label: "Crypto", id: "crypto", hint: "Crypto address" }
];


export const PaymentMethodEditor = (props: Props) => {
 
    const client = useApolloClient();
    const { hide } = props;
    const [state, setState] = useState<State>({
        type: "bank",
        info: "",
        name: "",
        loading: false,
    });

    const { name, type, info, loading } = state;

    const handleChange = (field: string) => {
        return (val: any) => {
            setState({
                ...state,
                [field]: val,
            })
        }
    };

    const setLoading = (val: boolean) => handleChange("loading")(val);

    const handleSubmit = () => createUpdatePaymentMethodMutation({
        args: {
            name, type, info
        },
        client,
        success: async (data) => {
            setLoading(false);
            hide();
        },
        error: async () => {
            setLoading(false);
            hide();
        }

    })

    return (<>
        <FlexGridItem>
            <FormControl
                label="Select payment method type"
                overrides={{
                    Label: {
                        style: ({ $theme }) => {
                            return {
                                width: "100%",
                                textAlign: 'center',
                                ...$theme.typography.font200
                            };
                        },
                    },
                }}
            >
                <p style={{ textAlign: "center" }}>
                    {paymentMethods.map((i) => {
                        return <Button size="compact" kind={type === i.id ? "primary" : "secondary"} key={i.id} onClick={() => handleChange("type")(i.id)}>
                            {type === i.id ? "✅" : ""} {i.label}
                        </Button>
                    })}
                </p>

            </FormControl>


            <FormControl
                label="Give it a name"
                // error={!name.length}
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
                label="Enter full details here"
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
                isLoading={loading}
                shape="pill"
                size="default"
                onClick={() => {
                    setLoading(true)
                    setState({
                        ...state,
                    })
                    handleSubmit();
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

        </FlexGridItem>

    </>)
}

export default PaymentMethodEditor;