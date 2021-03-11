import React from 'react';
import { Button } from 'baseui/button';
import { Modal, ModalHeader, ModalBody } from 'baseui/modal';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Textarea } from 'baseui/textarea';
import { Select } from 'baseui/select';
import { UserType } from 'gql/user';

interface Props {
  error: boolean,
  user: UserType,
  visible: boolean,
  editState: boolean,
  handleOnChange: Function,
  handleOnSubmit: Function,
  handleModdalClose: Function
}
const AddEditModal = ({
  error,
  user,
  visible,
  editState,
  handleOnChange,
  handleOnSubmit,
  handleModdalClose,
}: Props) => {
  return (
    <>
      <Modal
        onClose={handleModdalClose}
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
          {editState ? 'Update User' : 'Add User'}
        </ModalHeader>

        <ModalBody style={{ overflow: 'hidden' }}>
          <FlexGrid flexGridColumnCount={1}>

            {/* Fullname */}
            <FlexGridItem>
              <FormControl
                label="Title"
                error={error && !user.fullname ? 'Please fill out fullname' : null}
                overrides={{
                  Label: {
                    style: ({ $theme }) => {
                      return { ...$theme.typography.font200 };
                    },
                  },
                }}
              >
                <Input
                  name="title"
                  value={user.fullname}
                  error={error && !user.fullname}
                  onChange={handleOnChange('fullname')}
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

            {/* Balance */}
            <FlexGridItem>
              <FormControl
                label="Description"
                error={
                  error && !user.balance
                    ? 'Please fill out balance'
                    : null
                }
                overrides={{
                  Label: {
                    style: ({ $theme }) => {
                      return { ...$theme.typography.font200 };
                    },
                  },
                }}
              >
                <Input
                  value={user.balance}
                  onChange={handleOnChange('balance')}
                  error={error && !user.balance}
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
              overrides={{ Block: { style: { marginTop: '30px' } } }}
            >
              <Button
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
                {editState ? 'Update User' : 'Add User'}
              </Button>
              <Button
                kind="minimal"
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
          </FlexGrid>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddEditModal;
