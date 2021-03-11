import React, { useState } from 'react';
import { Button } from 'baseui/button';
import { toaster } from 'baseui/toast';
import { Modal, ModalHeader, ModalBody } from 'baseui/modal';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Textarea } from 'baseui/textarea';
import { Select } from 'baseui/select';
import { UserType } from 'gql/user';
import { useApolloClient } from '@apollo/client';
import { UPDATE_USER_WALLET } from 'gql/user/user.mutation';
import Toaster from '../../components/UiElements/Toaster/Toaster';
import { isEmpty } from 'lodash';


interface Props {
  error: boolean,
  user: UserType,
  visible: boolean,
  handleOnChange: Function,
  handleOnSubmit: Function,
  handleModdalClose: Function
}
const UpdateBalanceModal = ({
  error,
  user,
  visible,
  handleOnChange,
  handleOnSubmit,
  handleModdalClose,
}: Props) => {

  let toastKey = null;
  const client = useApolloClient();

  const [balance, setBalance] = useState<number>(0);

  const handleOnChangeBalance = (e: any) => {
    setBalance(e.target.value)
  };

  const close = () => {
    setBalance(0)
    handleModdalClose()
  }

  const updateUserBalance = async () => {
    try {
      const { data }: { data?: { update: { success: boolean, message: string } } } = await client.mutate({
        mutation: UPDATE_USER_WALLET,
        variables: {
          amount: Number(balance),
          userId: user.id,
          source: 'credit'
        }
      });

      if (data) {
        if(data.update.success){
          toastKey = toaster.positive(<>{'Successfully updated user balance'}</>, {
            autoHideDuration: 2000,
          });

          handleOnSubmit(true);
          // handleModdalClose();
          return;
        }
      }

      throw new Error('please try again later')
    }
    catch (error) {
      toastKey = toaster.negative(<>{`Error updating user balance! ${error && error.message}`}</>, {
        autoHideDuration: 3000,
      });
    }
  }

  return (
    <>
      <Toaster toastKey={toastKey} />
      <Modal
        onClose={close}
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
          <p>{`Update ${user.email} `} <strong>{`$${user.balance}`}</strong></p>
        </ModalHeader>

        <ModalBody style={{ overflow: 'hidden' }}>
          <FlexGrid flexGridColumnCount={1}>

            {/* Fullname */}
            <FlexGridItem>
              <FormControl
                label="Balance"
                error={error && !user.fullname ? 'Please fill out balance' : null}
                overrides={{
                  Label: {
                    style: ({ $theme }) => {
                      return { ...$theme.typography.font200 };
                    },
                  },
                }}
              >
                <Input
                  type="number"
                  name="balance"
                  value={balance}
                  error={error && !balance}
                  onChange={handleOnChangeBalance}
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
                onClick={updateUserBalance}
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
                {'Update balance'}
              </Button>
              <Button
                kind="minimal"
                onClick={close}
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

export default UpdateBalanceModal;
