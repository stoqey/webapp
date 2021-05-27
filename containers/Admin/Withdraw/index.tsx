import React, { useState, useEffect } from 'react';
import { toaster } from 'baseui/toast';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import Loader from 'components/UiElements/Loader/Loader';
import Toaster from 'components/UiElements/Toaster/Toaster';
import { useApolloClient } from '@apollo/client';
import { GET_ALL_USERS, ADD_USER_MUTATION, UserType, WithdrawRequestType, ADMIN_GET_ALL_WITHDRAW_REQUESTS, StatusType } from '@stoqey/client-graphql';
import { isEmpty } from 'lodash';
import UserTable from '@/components/admin/UserTable';
import AdminWithdrawTable from 'components/admin/AdminWithdrawTable';
import { adminGetWithdrawRequestsPaginationApi } from 'containers/Withdraw/WithdrawRequest.api';
import WithdrawConfirmModal from './Withdraw.confirm';

const TITLE = 'Stoqey Admin';
const SUB_TITLE = 'Stoqey';

interface State {
  withdrawRequest: WithdrawRequestType;
  withdrawRequests: WithdrawRequestType[];
  loading: boolean;
  showConfirm: boolean;
  newStatus: StatusType;
}
const AdminWithdrawRequests = () => {

  let toastKey;
  const [state, setState] = useState<State>({
    withdrawRequest: null,
    withdrawRequests: [],
    loading: false,
    showConfirm: false,
    newStatus: StatusType.PENDING
  });

  const { withdrawRequest, withdrawRequests, loading, showConfirm, newStatus } = state;

  const setWithdrawRequests = (val: WithdrawRequestType[]) => setState({ ...state, withdrawRequests: val });
  const setLoading = (val: boolean) => setState({ ...state, loading: val });
  const hideConfirm = (val: boolean) => setState({ ...state, showConfirm: val });

  const client = useApolloClient();

  const getWithdrawRequests = () => {
    setLoading(true);
    adminGetWithdrawRequestsPaginationApi({
      args: {
        filter: StatusType.PENDING,
        limit: 1000
      },
      client,
      success: async (d) => {
        setWithdrawRequests(d);
        setLoading(false);
      },
      error: async (d) => {
        toastKey = toaster.negative(<>{'Data Fetching Failed!'}</>, {
          autoHideDuration: 1000,
        });
        setLoading(false);
      }
    });
  }

  useEffect(() => {
    getWithdrawRequests();
  }, []);


  // const handleOnSubmit = async () => {
  //   // const errorStatus = checkError();
  //   const data = user;
  //   let id = null;

  //   if (user.id) {
  //     try {
  //       // TODO update user
  //       // id = await updateDocument('articles', data);
  //       toastKey = toaster.info(<>{'Update Successful!'}</>, {
  //         autoHideDuration: 2000,
  //       });
  //     } catch (error) {
  //       toastKey = toaster.negative(<>{'Update Failed!'}</>, {
  //         autoHideDuration: 2000,
  //       });
  //       console.log(error);
  //     }
  //     setVisible(false);

  //   } else if (!user.id) {
  //     try {
  //       const { data }: { data?: { data: { success: boolean, message: string } } } = await client.mutate({
  //         mutation: ADD_USER_MUTATION,
  //         variables: {
  //           user: {
  //             ...user,
  //             balance: +user.balance
  //           }
  //         },
  //         fetchPolicy: "no-cache"
  //       });

  //       if (!data.data.success) {
  //         throw new Error('Error create new user');
  //       }

  //       id = data.data;
  //       toastKey = toaster.info(<>{'Successfully created a new user!'}</>, {
  //         autoHideDuration: 2000,
  //       });
  //     } catch (error) {
  //       toastKey = toaster.negative(<>{'Failed!' + error && error.message}</>, {
  //         autoHideDuration: 2000,
  //       });
  //       console.log(error);
  //     }
  //     setVisible(false);
  //   }
  //   if (id) {
  //     // refresh data from here
  //     fetchData();
  //   }
  // };

  return (
    <>
      <Toaster toastKey={toastKey} />
      <Block
        paddingTop={['10px', '10px', 0]}
        overrides={{
          Block: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '40px',
            },
          },
        }}
      >
        <Block>
          <Block
            as="h3"
            overrides={{
              Block: {
                style: ({ $theme }) => {
                  return {
                    ...$theme.typography.font450,
                    color: $theme.colors.primaryA,
                    marginBottom: '10px',
                  };
                },
              },
            }}
          >
            {TITLE}
          </Block>
          <Block
            as="p"
            overrides={{
              Block: {
                style: ({ $theme }) => {
                  return {
                    ...$theme.typography.font200,
                    color: $theme.colors.contentSecondary,
                  };
                },
              },
            }}
          >
            {SUB_TITLE}
          </Block>
        </Block>

        <Block overrides={{ Block: { style: { flexShrink: 0 } } }}>
          <Button
            onClick={() => { }}
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
            Withdraw
          </Button>
        </Block>
      </Block>

      <Block
        overrides={{
          Block: {
            style: {
              minHeight: '150px',
            },
          },
        }}
      >
        {loading ? (
          <Loader />
        ) : (

          <AdminWithdrawTable
            data={withdrawRequests}
            confirmWithdraw={(withdrawReq: WithdrawRequestType, newAction: StatusType) => {
              setState({
                ...state,
                withdrawRequest: withdrawReq,
                newStatus: newAction,
                showConfirm: true,
              })
             }}
          />

        )}
      </Block>

      <WithdrawConfirmModal
        withdrawRequest={withdrawRequest}
        newStatus={newStatus}
        visible={showConfirm}
        handleOnSubmit={() => { }}
        hide={() => hideConfirm(!showConfirm)}
      />


    </>
  );
};

export default AdminWithdrawRequests;
