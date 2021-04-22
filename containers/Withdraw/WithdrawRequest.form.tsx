import React from 'react';
import { Button } from 'baseui/button';
import { toaster } from 'baseui/toast';
import { Modal, ModalHeader, ModalBody } from 'baseui/modal';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';

export const WithdrawForm = () => {
    return (
        <>
            <FlexGrid flexGridColumnCount={1}>
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
                            // value={balance}
                            // error={error && !balance}
                            // onChange={handleOnChangeBalance}
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