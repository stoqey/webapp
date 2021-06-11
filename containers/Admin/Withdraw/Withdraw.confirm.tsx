import React from 'react';
import { Button } from 'baseui/button';
import { Modal, ModalHeader, ModalBody } from 'baseui/modal';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Textarea } from 'baseui/textarea';
import { Select } from 'baseui/select';
import { GET_PAYMENT_METHODS, PaymentMethodType, StatusType, UserType, WithdrawRequestType } from '@stoqey/client-graphql';
import { adminFetchUsers, adminFetchPaymentMethods } from '../admin.api';
import { ApolloClient, useApolloClient, useQuery } from '@apollo/react-hooks';
import { niceDec } from 'utils/number';
import { isEmpty, map } from 'lodash';

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
  methods?: PaymentMethodType[];
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
    methods: [],
    method: null,
  });
  const { owner, paymentMethod: paymentMethodId } = withdrawRequest || {};
  const { userBalance, amountRequested, user, method, methods } = state;

  const { data: allPaymentMethods }: { data: {data: PaymentMethodType[]} }  = useQuery(GET_PAYMENT_METHODS, {
    variables: {
      owner,
      filter: paymentMethodId
    },
    client
  });


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
        });
      },
      error: (error: Error) => {

      }

    })

  // const fetchPaymentMethod = () =>
  //   adminFetchPaymentMethods({
  //     args: {
  //       owner,
  //       filter: paymentMethodId
  //     },
  //     client,
  //     success: (data: PaymentMethodType[]) => {

  //       // console.log("adminFetchPaymentMethods ", data);

  //       let method = null;
  //       if(paymentMethodId){
  //         method = data.find(i => i.id === paymentMethodId);
  //       } 

        
  //       setState({
  //         ...state,
  //         method: method? method : null,
  //         methods: data,
  //       })
  //     },
  //     error: (error: Error) => {

  //     }

  //   })

  React.useEffect(() => {
    fetchUser();
  }, [visible]);


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

          {!isEmpty(allPaymentMethods.data) && (
            <ul>
              {allPaymentMethods.data.map((meth, index) => {
                return <li key={meth.id}>
                  {meth.type} ==== {meth.info}
                </li>
              })}
            </ul>
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
