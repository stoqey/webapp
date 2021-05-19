import React, { useState } from 'react';
import { FlexGridItem } from 'baseui/flex-grid';
import { FormControl } from 'baseui/form-control';
import { Button } from 'baseui/button';
import { ButtonGroup } from "baseui/button-group";
import { Select } from "baseui/select";
import { Input } from 'baseui/input';

interface State {

    // Editor state for creating new
    name?: string;
    type?: string;
    info?: string;

}

export const paymentMethods = [
    { label: "Bank account", id: "bank", hint: "Bank account, swift, country" },
    { label: "E-transfer", id: "etransfer", hint: "email or phone" },
    { label: "Mobile money", id: "mobilemoney", hint: "phone" },
    { label: "Crypto", id: "crypto", hint: "Crypto address" }
];


export const PaymentMethodEditor = () => {
    const [state, setState] = useState<State>({
        type: "bank",
        info: "",
        name: ""
    });

    const { name, type, info } = state;

    const handleChange = (field: string) => {
        return (val: any) => {
            setState({
                ...state,
                [field]: val,
            })
        }
    };

    return (<>
        <FlexGridItem>



            <FormControl
                label="Select payment method type"
                // error={error && 'Please fill out balance'}
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
                <p style={{ textAlign: "center"}}>
                    {paymentMethods.map((i) => {
                        return <Button size="compact" kind={type === i.id ? "primary" : "secondary"} key={i.id} onClick={() => handleChange("type")(i.id)}>
                            {type === i.id ? "✅" : ""} {i.label}
                        </Button>
                    })}
                </p>

            </FormControl>


            <FormControl
                label="Give it a name"
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
                // isLoading={loading}
                shape="pill"
                size="default"
                onClick={() => {
                    setState({
                        ...state,
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

        </FlexGridItem>

    </>)
}

export default PaymentMethodEditor;