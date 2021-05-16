import React, { ReactNode } from 'react';
import { Block } from 'baseui/block';
import { Modal, ModalBody } from 'baseui/modal';
import { Button } from 'baseui/button';
import { MdWarning, MdCheck } from 'react-icons/md';
import { Paragraph2 } from 'baseui/typography';
import { StatusType } from '@stoqey/client-graphql';
import { BsArrowClockwise } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';

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
    children?: ReactNode | ReactNode[];
    loading?: boolean;
    title: string;
    description: string;
    status: StatusType;
    actions: ModalActions;
    // TODO add api
};

const statusObject = {
    [StatusType.DRAFT]: ["grey", FaEdit],
    [StatusType.PENDING]: ["orange", BsArrowClockwise],
    [StatusType.PROCESSING]: ["orange", MdWarning],
    [StatusType.SUCCESS]: ["green", MdCheck],
    [StatusType.FAIL]: ["red", MdWarning],
    [StatusType.REJECTED]: ["red", MdWarning],
};


const ConfirmModal = (props: Props) => {
    const { show, hide, title, description, status, actions, loading = false, children } = props;

    const { cancel, confirm } = actions || { cancel: null, confirm: null };

    const [statusColor, StatusIcon] = statusObject[status || "draft"]

    return (
        <>
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

                        <StatusIcon
                            size="4em"
                            color={statusColor as any}
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
                            {children && children}
                            {/* Confirm */}
                            {actions && (
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
                            )}


                        </Block>
                    </Block>
                </ModalBody>
            </Modal>
        </>
    );
};

export default ConfirmModal;
