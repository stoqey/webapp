import React from 'react';
import { Button } from 'baseui/button';
import { Modal, ModalHeader, ModalBody } from 'baseui/modal';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Textarea } from 'baseui/textarea';
import { Select } from 'baseui/select';
import { PaymentMethodType, StatusType, UserType, WithdrawRequestType } from '@stoqey/client-graphql';
import { adminFetchUsers, adminFetchPaymentMethods } from '../admin.api';
import { ApolloClient, useApolloClient } from '@apollo/react-hooks';
import { niceDec } from 'utils/number';

interface Props {
  client: ApolloClient<any>;
  withdrawRequest: WithdrawRequestType,
  newStatus: StatusType,
  visible: boolean,
  handleOnSubmit: Function,
  hide: Function,
  children: any
}

interface State {
  userBalance: number;
  amountRequested: number;
  user?: UserType;
  method?: PaymentMethodType;
};

const WithdrawConfirmModal = ({
  client,
  withdrawRequest,
  newStatus,
  visible,
  handleOnSubmit,
  hide,
  children
}: Props) => {

  const [state, setState] = React.useState<State>({
    userBalance: 0,
    amountRequested: withdrawRequest && withdrawRequest.amount || 0,
  });
  const { owner, paymentMethod: paymentMethodId } = withdrawRequest || {};
  const { userBalance, amountRequested, user, method } = state;

  console.log("payment method is", JSON.stringify(withdrawRequest))

  const fetchUser = () =>
    adminFetchUsers({
      args: {
        search: owner,
      },
      client,
      success: (data: UserType[]) => {
        const user = data.find(i => i.id === owner);
        setState({
          ...state,
          userBalance: user && user.balance || 0,
          user,
        })
      },
      error: (error: Error) => {

      }

    })

  const fetchPaymentMethod = () =>
    adminFetchPaymentMethods({
      args: {
        owner,
        filter: paymentMethodId
      },
      client,
      success: (data: PaymentMethodType[]) => {
        console.log("Payment methods are", data)
        const method = data.find(i => i.id === paymentMethodId);
        setState({
          ...state,
          method,
        })
      },
      error: (error: Error) => {

      }

    })

  React.useEffect(() => {
    fetchUser();
    fetchPaymentMethod()
  }, [visible])

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
          {`Confirm withdraw ${user && user.phone} with ${niceDec(userBalance)}`}
        </ModalHeader>

        <ModalBody style={{ overflow: 'hidden' }}>
          {children && children}

          {method && (
            <p>{method.type} === {method.info}</p>
          )}

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
                      backgroundColor: "green"
                    };
                  },
                },
              }}
            >
              {'Confirm withdraw'}
            </Button>

            <Button
              // @ts-ignore
              onClick={handleOnSubmit}
              overrides={{
                BaseButton: {
                  style: ({ $theme }) => {
                    return {
                      ...$theme.typography.font250,
                      backgroundColor: "red"
                    };
                  },
                },
              }}
            >
              {'Reject withdraw'}
            </Button>
            <Button
              kind="minimal"
              // @ts-ignore
              onClick={hide}
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
