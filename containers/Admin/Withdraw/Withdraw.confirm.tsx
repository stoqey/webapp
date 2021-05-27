import React from 'react';
import { Button } from 'baseui/button';
import { Modal, ModalHeader, ModalBody } from 'baseui/modal';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Textarea } from 'baseui/textarea';
import { Select } from 'baseui/select';
import { StatusType, UserType, WithdrawRequestType } from '@stoqey/client-graphql';

interface Props {
  withdrawRequest: WithdrawRequestType,
  newStatus: StatusType,
  visible: boolean,
  handleOnSubmit: Function,
  hide: Function
}
const WithdrawConfirmModal = ({
  withdrawRequest,
  newStatus,
  visible,
  handleOnSubmit,
  hide,
}: Props) => {
  return (
    <>
      <Modal
        // @ts-ignore
        onClose={hide}
        closeable
        isOpen={visible}
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
        <ModalHeader>
          {'Confirm withdraw request'}
        </ModalHeader>

        <ModalBody style={{ overflow: 'hidden' }}>
          <FlexGridItem
            overrides={{ Block: { style: { marginTop: '30px' } } }}
          >
            <Button
              // @ts-ignore
              onClick={handleOnSubmit}
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
              {'Confirm withdraw'}
            </Button>
            <Button
              kind="minimal"
              // @ts-ignore
              onClick={handleModdalClose}
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
              Cancel
              </Button>
          </FlexGridItem>
          
        </ModalBody>
    </Modal>
    </>
  );
};

export default WithdrawConfirmModal;
