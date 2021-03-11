import React from 'react';
import { Button } from 'baseui/button';
import { Modal, ModalHeader, ModalBody } from 'baseui/modal';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Textarea } from 'baseui/textarea';
import { Select } from 'baseui/select';
import { UserType } from '@stoqey/client-graphql';

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
        // @ts-ignore
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

            {/* Firstname */}
            <FlexGridItem>
              <FormControl
                label="Title"
                error={error && !user.firstname ? 'Please fill out firstname' : null}
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
                  value={user.firstname}
                  error={error && !user.firstname}
                  onChange={handleOnChange('firstname')}
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

            {/* Lastname */}
            <FlexGridItem>
              <FormControl
                label="Title"
                error={error && !user.lastname ? 'Please fill out lastname' : null}
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
                  value={user.lastname}
                  error={error && !user.lastname}
                  onChange={handleOnChange('lastname')}
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
                {editState ? 'Update User' : 'Add User'}
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
          </FlexGrid>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddEditModal;
