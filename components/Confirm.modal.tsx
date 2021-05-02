import React from 'react';
import { Block } from 'baseui/block';
import { Toast, KIND, toaster } from 'baseui/toast';
import { Modal, ModalBody } from 'baseui/modal';
import { Button } from 'baseui/button';
import { MdWarning } from 'react-icons/md';
import { H6, Paragraph2 } from 'baseui/typography';
import { StatusType } from '@stoqey/client-graphql';

export interface ModalActions {
    confirm: {
        onPress: () => void;
        title: string;
    },
    cancel: {
        onPress: () => void;
        title: string;
    },
}
interface Props {
    show: boolean;
    hide?: () => void;

    loading?: boolean;
    title: string;
    description: string;
    status: StatusType;
    actions: ModalActions;
    // TODO add api
};


const ConfirmModal = (props: Props) => {
    const { show, hide, title, description, status, actions, loading = false } = props;
    const { cancel, confirm } = actions;

    let toastKey = null;

    const onSuccess = (message: string) => {
        toastKey = toaster.positive(<>{message}</>, {
            autoHideDuration: 4000
        })
    }

    const onError = (message: string) => {
        toastKey = toaster.negative(<>{message}</>, {
            autoHideDuration: 5000
        })
    }

    return (
        <>
            {/* <Toaster toastKey={toastKey} /> */}
            {/* Model success */}
            <Modal
                onClose={() => hide()}
                closeable
                isOpen={show}
                animate
                size="default"
                role="dialog"
                unstable_ModalBackdropScroll={true}
                overrides={{
                    Root: {
                        style: () => {
                            return { zIndex: 9999 };
                        },
                    },
                }}
            >
                <ModalBody style={{ overflow: 'hidden' }}>
                    <Block
                        overrides={{
                            Block: {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    // padding: '30px 30px',
                                },
                            },
                        }}
                    >

                        <MdWarning
                            size="4em"
                            color="red"
                            style={{ marginBottom: '20px' }}
                        />

                        <Block
                            as="h2"
                            overrides={{
                                Block: {
                                    style: ({ $theme }) => {
                                        return {
                                            ...$theme.typography.font750,
                                            color: $theme.colors.primary,
                                            marginBottom: '30px',
                                            '@media only screen and (max-width: 480px)': {
                                                ...$theme.typography.font650,
                                                marginBottom: '20px',
                                            },
                                        };
                                    },
                                },
                            }}
                        >
                            {title}
                        </Block>

                        {/* Confirm amount for trade */}
                        <Block paddingTop={['30px', '40px', '0']}>
                            {/* Confirm  amount */}
                            {/* <H6>{title}</H6> */}
                            <Paragraph2>{description}</Paragraph2>

                            {/* Confirm */}
                            <p style={{ display: 'flex', padding: "20px" }}>
                                <Button
                                    isLoading={loading}
                                    shape="pill"
                                    size="default"
                                    onClick={() => confirm.onPress()}
                                    overrides={{
                                        BaseButton: {
                                            style: ({ $theme }) => {
                                                return {
                                                    width: '50%',
                                                    ...$theme.typography.font250,
                                                };
                                            },
                                        },
                                    }}
                                > {confirm.title} </Button>

                                <div style={{ width: '10px' }} />

                                <Button
                                    isLoading={loading}
                                    shape="pill"
                                    kind="secondary"
                                    size="default"
                                    onClick={() => hide()}
                                    overrides={{
                                        BaseButton: {
                                            style: ({ $theme }) => {
                                                return {
                                                    width: '50%',
                                                    ...$theme.typography.font250,
                                                };
                                            },
                                        },
                                    }}
                                > {cancel.title} </Button>
                            </p>
                        </Block>
                    </Block>
                </ModalBody>
            </Modal>
        </>
    );
};

export default ConfirmModal;
